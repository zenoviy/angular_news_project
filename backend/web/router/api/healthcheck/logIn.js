const Scheme  = require('../../../../models/user.model');
const Boom = require('boom');

/* Generate and Return JWT back to user */
module.exports = async (request, reply) => {
    try{
        //console.log(request.auth.credentials)
       if(request.payload.user.email){
            let person = new Scheme.loginUserSchema(request.payload);
            let token = { token: {id_token: person.generateJwtExpireTokenData() } }
            return reply.response(JSON.stringify(token)).code(201)

         }else {
            return reply.response(request.payload).code(401)
         }
    } catch (error) {
        throw reply.response(error).code(422);
    }
}