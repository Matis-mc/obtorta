const jwt = require('jsonwebtoken')

function auth( req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).json({ message: "Header authorization manquant" });
    }
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token : ' + token)
        jwt.verify(token, 'My_secret_string', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Non autorisé" });
        }
        req.params._idUser = decoded.userId;
        next();
    });

}

module.exports = auth;