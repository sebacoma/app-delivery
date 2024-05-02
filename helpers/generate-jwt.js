const jwt = require('jsonwebtoken');

const generateToken = (id = '') => {
    return new Promise (( resolve, reject ) => {
        const payload = {id};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{expiresIn: '10h'}, (error, token) => {
            if (error) {
                reject('No se pudo generar el token: ', error);
            }
            else resolve(token);
        });
    });
}

module.exports = {
    generateToken,
}