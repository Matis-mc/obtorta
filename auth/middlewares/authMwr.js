const jwt = require('jsonwebtoken')

module.exports = ( req, res, newt) => {

    try {

        const token = req.header.authorization.split(' ')[1];
        console.log('Token : ' + token)
        const decodedToken = jwt.verify(token, 'My_secret_string');
        next();
    } catch(error) {
        console.log("Erreur lors de la verification du token : " + error);
        res.status(401).json({message: "Token invalide"});
    }

}