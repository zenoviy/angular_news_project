const Scheme  = require('../../../../models/user.model');
module.exports = async (request, h) =>{
    try {
        let userObject ={ user: request.payload }
        let result = await Scheme.loginUserSchema.findByIdAndUpdate(request.params.id, userObject, { new: true});
        return h.response(result)
    } catch (error){
        return h.response(error).code(422);
    }
}