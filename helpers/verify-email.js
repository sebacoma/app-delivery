const User = require("../models/user");

const verifyEmailLogin = async (email) => {
    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
        throw new Error(`el email ${email} no existe`);
    }
}


module.exports = { 
    verifyEmailLogin,
}