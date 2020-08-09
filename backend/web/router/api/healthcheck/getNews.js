const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("540277723c9a44e79db445a48a88846d");
const Scheme = require("../../../../models/user.model");

/* Get all news data */
module.exports = async (request, h) => {
  try {
    let allDBnews = await Scheme.newsScheme.find().exec();
    let sourceName = [
      "bbc-news",
      "cnn",
      "the-washington-post",
      "the-new-york-times",
      "the-verge",
      "abc-news",
      "daily-mail",
      "new-scientist",
      "national-geographic",
      "ign",
      "polygon"
    ];
    let sourceLink = [
      "bbc.co.uk",
      "edition.cnn.com",
      "washingtonpost.com",
      "nytimes.com",
      "techcrunch.com",
      "abcnews.go.com",
      "dailymail.co.uk",
      "newscientist.com",
      "nationalgeographic.com.au",
      "ign.com",
      "polygon.com"
    ];

    let newsResult = {};
    function currentTime() {
      let time = new Date();
      return {
        currentTime: `${time.getFullYear()}-${time.getUTCMonth() +
          1}-${time.getUTCDay()}`,
        pastTime: `${
          time.getUTCMonth() + 1 == 1 ? time.getFullYear() : time.getFullYear()
        }-${time.getUTCMonth() + 1 == 1 ? 12 : time.getUTCMonth() - 1}-${1}`
      };
    }
    function writeNewsData(data) {
      let allNews = new Scheme.newsScheme(data);
      allNews.save();
    }
    /* 6 hrs = 21600000*/
    let getApiDate = await Scheme.newsApiData.find().exec();
    async function newsApiRequestTimer() {
      /* make news update 4/2 times per day   newsApiData*/
      let currentDate = new Date().getTime();
      let newsUpdate = false;
      let myTime = {
        updateTime: new Date(currentDate + 10800000).getTime()
      };
      if (Object.keys(getApiDate).length > 0) {
        if (currentDate > getApiDate[0].updateTime) {
          console.log(
            `Timer updated! from ${getApiDate[0].updateTime} to ${
              myTime.updateTime
            }`
          );
          newsUpdate = true;
          await Scheme.newsApiData.findByIdAndUpdate(
            getApiDate[0]._id,
            myTime,
            { new: true }
          );
        }
        parseNewsSource(newsUpdate);
      } else {
        let dateSave = new Scheme.newsApiData(myTime);
        dateSave.save();
      }
    }
    await newsApiRequestTimer();
    function parseNewsSource(updateState) {
      //  my-header-items-number
      if (
        request.headers["my-heaer-source"] &&
        !request.headers["my-head-article-name"]
      ) {
        if (request.headers["my-heaer-source"] == "all") {
          checkAllNews(sourceName, updateState);
        } else {
          /*  filter by news source */
          newsResult.news = allDBnews
            .filter((obj, i) => {
              return obj.src == request.headers["my-heaer-source"];
            })
            .sort((a, b) => {
              /*sort by date*/
              return (
                new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime()
              );
            })
            .reverse()
            .slice(0, request.headers["my-header-items-number"]);
        }
      }
      if (request.headers["my-head-article-name"]) {
        /*  find single source  */
        newsResult.news = allDBnews.find((obj, i) => {
          return obj.articleUrl == request.headers["my-head-article-name"];
        });
      }
    }
    function sortByDate(objectArr) {
      /* place news feature picture*/
      let newestObject = {};
      let resultDateArr = objectArr.map(x => {
        return new Date(x.publishedAt).getTime();
      });
      newestObject = resultDateArr
        .sort((a, b) => {
          return a - b;
        })
        .reverse();
      newestObject = objectArr.find(x => {
        return (
          new Date(x.publishedAt).getTime() ==
          new Date(resultDateArr[0]).getTime()
        );
      });
      return newestObject;
    }
    function checkAllNews(newsSource, updateState) {
      newsResult = {
        newsInfo: []
        /*news: allDBnews*/
      };
      newsSource.forEach((name, i) => {
        if (updateState) {
          console.log("Run news update");
          loadNewsScript(name, sourceLink[i]);
        }
        let objArr = allDBnews.filter((obj, i) => {
          return obj.src === name;
        });
        let res = {
          sourceName: name,
          numberOfNews: objArr.length,
          backgroundImage: sortByDate(objArr)
        };
        //  (objArr[0])? objArr.find((n) => { return n.urlToImage})  : false
        newsResult.newsInfo.push(res);
      });
    }
    function loadNewsScript(sources, sourcesDomain) {
      newsapi.v2
        .everything({
          q:
            "+space OR +science OR +technology OR +nature OR +business OR +politics OR +money OR +films OR +games",
          sources: sources /*solidSource*/,
          domains: sourcesDomain /*solidLink, techcrunch.com*/,
          from: currentTime().currentTime,
          to: currentTime().pastTime,
          language: "en",
          sortBy: "relevancy",
          page: 2
        })
        .then(response => {
          response.articles.forEach((sourceNews, i) => {
            sourceNews.src = sources;
            sourceNews.articleUrl = sourceNews.title
              .split(/[\s,:,',’]+/)
              .splice(0, 6)
              .join("-")
              .toLowerCase();
            if (Object.keys(allDBnews).length > 0) {
              let alloveWrite = false;
              allDBnews.find((dbNews, i) => {
                if (
                  JSON.stringify(dbNews.title) ===
                    JSON.stringify(sourceNews.title) &&
                  JSON.stringify(dbNews.author) ===
                    JSON.stringify(sourceNews.author) &&
                  JSON.stringify(dbNews.title) ===
                    JSON.stringify(sourceNews.title)
                ) {
                  alloveWrite = !alloveWrite;
                }
              });
              if (alloveWrite == false) {
                writeNewsData(sourceNews);
              } else {
              }
            } else {
              writeNewsData(sourceNews);
            }
          });
        });
    }
    //parseNewsSource();
    return h.response(JSON.stringify(newsResult)).code(200);
  } catch (error) {
    return h.response(error).code(422);
  }
};
