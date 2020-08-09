const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret, cryptoMethod, expireTimeLong, expireTimeShort } = require('../config');

const url = 'mongodb://localhost:27017/NewsService';
const db = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useFindAndModify: false
});

const UserScheme = new mongoose.Schema({        // input
    name: {
        type : String,
        minlength: [4, 'too Short name']
    },
    email: String,
    password: String,
})
const UserToken = new mongoose.Schema({     // Old output
    token:{
        id: String,
        logIn: Boolean,
    },
    user:{
        name: String,
        email: String,
        password: String,
    }
})
const GetNewsSchema = new mongoose.Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
    social: {
        likes: Number,
        comments: {
            authors: Array,
            comments: Array
        }
    },
    src: String,
    articleUrl: String,
})
const NewsApiData = new mongoose.Schema({
    updateTime: Number,
})
/*=======================================================================*/  // New user login schema
const LoginUserSchema = new mongoose.Schema({      // New user login schema
    user: {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            unique: true,
            required: true,
            minlength: [4, 'too Short name']
        },
        image: String,
        authorization: Boolean,
    },
    token: {
        hash: String,
        salt: String,
        id_token: String,
    }

})
LoginUserSchema.methods.setPassword = function (password){         // Crypto password NodeJs/crypto schema
    this.token.salt = crypto.randomBytes(16).toString('hex');
    this.token.hash = crypto.pbkdf2Sync(password, this.token.salt, 1000, 64, cryptoMethod).toString('hex');
}
LoginUserSchema.methods.validPassword = function (password){        // check password
    let hash = crypto.pbkdf2Sync(password, this.token.salt, 1000, 64, cryptoMethod).toString('hex');
    return this.token.hash === hash;
}
LoginUserSchema.methods.generateJwtExpireTokenData = function (){
    var expire = new Date();
    expire.setDate(expire.getDate());
    return jwt.sign({
        _id: this.user._id,
        email: this.user.email,
        name: this.user.name,
        expireData: parseInt((expire.getTime()+expireTimeLong) / 1000)  /* expireTimeShort for test */
    }, secret)/**/
}

module.exports = {
   lognModel: db.model('user', UserScheme),
   logTokenModel: db.model('userToken', UserToken),
   loginUserSchema: db.model('UserLogin', LoginUserSchema),
   //userViewSchema: db.model('UserLogin', userViewSchema),
   newsScheme: db.model('NewsBase', GetNewsSchema),
   newsApiData: db.model('ApiData', NewsApiData)
}
