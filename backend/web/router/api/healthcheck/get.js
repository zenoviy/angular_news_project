const Scheme  = require('../../../../models/user.model');


/* Get all user data */
module.exports = async (request, h)=>{
        try{
            let response = await Scheme.loginUserSchema.find().exec();
            return h.response(response)
        } catch (error){
            return h.response(error).code(422);
        }

}

