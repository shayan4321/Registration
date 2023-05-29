const userModel = require('../models/userModel');
const { hashpassowrd } = require('../helpers/authHelper');
const validator = require('validator');
var passwordValidator = require('password-validator');

const register = async (req, res) => {
    
    try {
        const {username, email, password} = req.body
        // validations
        var schema = new passwordValidator();
        schema
        .is().min(8)
        .has().uppercase()
        .has().lowercase();
        

        if(!username){
            return res.send(404).send({message: 'Username is Required'})
        }
        if(!email){
            return res.send({message: 'Email is Required'})
        }
        if(!validator.isEmail(email)){
            return res.send({message: 'Email is InValid'})
        }
        if(!schema.validate(password)){
            return res.send({message: 'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.'})
        }
        // Check User
        const existingUser = await userModel.findOne({email:email})
        // Existing User
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register',
            })
        }
        // Register User
        const hashedPassword = await hashpassowrd(password)
        //Save User
        const user = await new userModel({
            username, 
            email,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error
        })
    }
}

module.exports={
    register
};