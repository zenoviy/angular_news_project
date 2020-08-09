const Scheme  = require('../../../../models/user.model');
const Boom = require('boom');

/* Check if user is logged in (by JWT strategy check) */
module.exports = async (request, h)=>{
        try{
            let personObject;
             await Scheme.loginUserSchema.findOne({
                $or: [  { 'user.email': request.auth.credentials.email  }, { 'user.email': request.auth.credentials.name }]
            }, (err, user) => {
                if(user){
                    user.user.authorization = true;
                    personObject = new Scheme.loginUserSchema(user);
                    personObject.token.id_token = personObject.generateJwtExpireTokenData()
                    return user;
                }
            })
            return h.response(JSON.stringify(personObject)).code(201)
        } catch (error){
            return h.response(error).code(440);
        }

}