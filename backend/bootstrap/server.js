const Hapi = require('@hapi/hapi');
const glob = require('glob');
const path = require('path');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { host, port, secret, cryptoMethod } = require('../config');
const { healthCheck } = require('../web/router/api');
const Bcrypt = require('bcrypt');
const Hoek = require('hoek');
const Boom = require('boom');
const UserModel = require('../models/user.model').loginUserSchema;
const {verifyUniqueUser, verifyCredentials, facebookVerifyCredentials} = require('../utils/userFunctions');
//const hapiAuthFb = require('hapi-auth-fb')

const { registrationUserSchema, loginUserSchema } = require('../schemas/user.schemas');


exports.init = async () => { 
/*      Init server using port & host      */
    const server = Hapi.Server({ port, host,routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['x-token-token']
      }
    }});
/*      Mongo Database */
    const url = 'mongodb://localhost:27017/NewsService';

/*      fix of Deprecation Warnings        */
    mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
    }, err => {
        if(err) throw err; 
    });
    /* Information about success Mongo DB call */
    mongoose.connection.on('connected', () => {
        console.log(`Hapi server is connected to DBS => ${url}`);
    });
    mongoose.connection.on('error', err => {
        console.log('error while connecting to mongodb', err);
    });

/*      JWT strategy check function  ( compare dekoded token password to exist token.hash )     */
    const validate = async function (decoded, request, h){
       /* console.log(" - - - - - - - decoded token:");
        console.log(decoded);*/

        var state = false;
       await UserModel.findOne({
            $or: [ { 'user.email': decoded.email }, { 'user.name': decoded.name }]
          }, (err, user) => {
              //console.log(Math.floor(Date.now()/1000), "|||",decoded.expireData,'< dec|')
              if(user){      //Date.now() <= decoded.expireData*1000
                if(Math.floor(Date.now()/1000) <= decoded.expireData){
                    state = true;
                }else {
                    status = false;
                }
                return {
                    isValid: state,
                    credentials : decoded,
                };
              }else{
                state= false;
                return {
                    isValid: state,
                    credentials : decoded,
                  };
              }
          })
        return {
            isValid: state,
            credentials : decoded,
        };
    }

/*      Create method customstrategy            */
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate,
        verifyOptions: { ignoreExpiration: true }  // Importent
    });

    /*  Method GET to retract all users open information */
    server.route({
        method: "GET",
        path: "/api/users",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: healthCheck.get
    })

/*      Method to change existed user by id        */
/*
    server.route({
        method: "PUT",
        path: "/api/users/{id}",
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
                },
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },
        handler: healthCheck.put
    })
*/
/*      Delate by id method        */
    server.route({
        method: "DELETE",
        path: "/api/users/{id}",
        handler: healthCheck.del
    })
/*      Register/logIn/logOut     */
    server.route({
        method: ['POST'],
        path: '/api/register',
        options: {
            validate: {
                payload: registrationUserSchema,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            },
            auth: false,
            pre: [{ method: await verifyUniqueUser, assign: 'validResult' }],
            handler: healthCheck.registration
        }
    })
/*      Method to initialize login by user JWT */
   server.route({
        method: ['POST'],
        path: '/api/login',
        options: {
            validate: {
                payload: loginUserSchema,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            },
            pre:[
                { method: await verifyCredentials, assign: 'user'}
            ],
            handler: healthCheck.logIn
        },
    })
/*      Method return only one user by facebook         */
    server.route({
        method: ['POST'],
        path: "/api/loginfb",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            },
            pre: [
              { method: await facebookVerifyCredentials, assign: 'user'}
          ],
            handler: healthCheck.logIn
        },
    })/**/
    server.route({
      method: "GET",
      path: "/api/userInfo",
      config: {
          cors: {
              origin: ['*'],
              additionalHeaders: ['cache-control', 'x-requested-with']
          },
          auth: 'jwt',
          handler: healthCheck.getCheckSingleUser
      },
  })
  server.route({
    method: "GET",
    path: "/api/newsInfo",
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },
        handler: healthCheck.getNewsData
    },
})
/*      Start server    */
    await server.start( err => {
        if(err) throw err;
    });
/*      Server URI display    */
    console.log('Server up and running on %s', server.info.uri);
};

