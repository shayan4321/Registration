// Helper Use For Password incrypt
const bcrypt = require("bcrypt")
const validator = require("validator")
var passwordValidator = require("password-validator")
var schema = new passwordValidator();

const hashpassowrd = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
function isPasswordValid(password) {
  schema.is().min(8).has().uppercase().has().lowercase()
  return schema.validate(password)
}

function isValidEmail(email) {
  return validator.isEmail(email)
}

module.exports = {
  hashpassowrd,
  isPasswordValid,
  isValidEmail
};
