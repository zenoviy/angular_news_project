const Scheme  = require('../../../../models/user.model');


/* Delate user by id */
module.exports = async (request, h)=>{
    try{
        let response = await Scheme.loginUserSchema.findByIdAndDelete(request.params.id);
        return h.response(response)
    } catch (error){
        return h.response(error).code(422);
    }

}