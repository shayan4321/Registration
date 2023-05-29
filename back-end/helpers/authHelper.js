// Helper Use For Password incrypt
const bcrypt = require("bcrypt");

const hashpassowrd = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashpassowrd,
};
