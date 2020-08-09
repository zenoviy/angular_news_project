
 module.exports = async (request, h) =>{
    try {

        let userObject ={ user: request.payload }
        let person = await new Scheme.LoginUserSchema(userObject);
         person.token = { id:person._id, logIn: true}
        let result = await person.save();
        return h.response(result);
    } catch (error){
        return h.response(error).code(422);
    }
}