const Scheme  = require('../../../../models/user.model');
const Boom = require('boom');

/* Register a new user  (by userFunction check) */
module.exports = async (request, reply)=>{          // change status login/logout
        console.log(request.payload)    
        try{

            if(request.payload.email&&request.payload.name){
                let person = new Scheme.loginUserSchema();
                person.user.email = request.payload.email;
                person.user.name = request.payload.name;
                person.user.authorization = false;
                person.setPassword(request.payload.password)   /*crypto*/
                person.save();
                let token = { token: { id_token: person.generateJwtExpireTokenData() } }  /*token with expire data*/

                return reply.response(JSON.stringify(token)).code(201)
            }else {
                return reply.response(request.payload).code(409)
            }
        } catch (error){
            return reply.response(error).code(422);
        }

}

