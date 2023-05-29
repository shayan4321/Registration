const userModel = require("../models/userModel");
const authHelper = require("../helpers/AuthHelper")

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (username == null || username == "" || username == undefined) {
    return res.status(404).send({ message: "Username is Required" })
  } else if (email == null || email == "" || email == undefined) {
    return res.status(404).send({ message: "Email is Required" })
  } else if (!authHelper.isValidEmail(email)) {
    return res.status(404).send({ message: "Please enter a valid email" })
  } else if (password == null || password == "" || password == undefined) {
    return res.status(404).send({ message: "Password can't be empty" })
  } else if (!authHelper.isPasswordValid(password)) {
    return res.status(404).send({ message: "Password must contain atleast one uppercase, one lowercase and atleast 8 characters long" })
  } else {
    if (!isUserAlreadyExists(email)) {
      return res.status(400).send({
        success: false,
        message: "User already exists!"
      })
    } else {
      const user = addUser(username, email, password)
      if (user == null) {
        res.status(500).send({
          success: false,
          message: "Something wen't wrong while adding user",
          error,
        })
      } else {
        res.status(201).send({
          success: true,
          message: "User Registered Successfully",
          user,
        })
      }
    }
  }
};

async function addUser(username, email, password) {
  try {
    const encryptedPassword = authHelper.hashpassowrd(password)
    const user = await new userModel({
      username: username,
      email: email,
      password: encryptedPassword,
    })
    user.save()
    return user
  } catch (error) {
    console.log(error)
    return user
  }
}

async function isUserAlreadyExists(userEmail) {
  try {
    const user = await userModel.findOne({ email: userEmail })
    console.log(user)
    if (user == null) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return true
  }
}

module.exports = {
  register
};
