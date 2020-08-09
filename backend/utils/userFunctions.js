const Boom = require('boom');
const loginUserSchema = require('../models/user.model').loginUserSchema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Scheme = require('../models/user.model');

 function verifyUniqueUser(request, reply){
    return loginUserSchema.findOne({
        $or: [  { 'user.email': request.payload.email  }, { 'user.name': request.payload.name }]
      }, (err, user) => {
        if (user) {
            //console.log(user.user.name)
            if (user.user.name === request.payload.name) {
                console.log('Username taken')
                //throw new Error()
                //return Boom.badRequest('Username taken')
                return request.payload = 'Username taken'
            }
            if (user.user.email === request.payload.email) {
               // throw new Error()
                console.log('Email taken')
                //return Boom.badRequest('Email taken')
                return request.payload = 'Email taken'
            }
        }
        return request.payload
      })
};
function verifyCredentials(request, reply){
    //const password = request.payload.password;
    return loginUserSchema.findOne({
        'user.email':  request.payload.email
    }, (err, user) => {
        if(user){
            let obj = new Scheme.loginUserSchema(user);
            if(obj.validPassword(request.payload.password)||request.payload.facebook){
                console.log(user)
                return request.payload = user
            }else if(!request.payload.facebook.name&&!request.payload.facebook.id&&!request.payload.facebook.email){
                console.log('Incorrect facebook!')
                return request.payload = 'Incorrect facebook!';
            } else {
                console.log('Incorrect password!')
                return request.payload = 'Incorrect password!';
            }
        } else {
            console.log('Incorrect email!')
            return request.payload = 'Incorrect email!'
        }
    });
}/**/

function facebookVerifyCredentials(request, reply){
    return loginUserSchema.findOne({
        'user.email':  request.payload.email
    }, (err, user) => {
        if(user){
            if(request.payload.facebook){
                console.log(user)
                return request.payload = user
            } else {
                return request.payload = 'no user profile!';
            }
        } else {
            return request.payload = 'Incorrect email!'
        }
    });
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials,
    facebookVerifyCredentials: facebookVerifyCredentials
}