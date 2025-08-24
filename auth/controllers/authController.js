const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    const user = new User({username: req.body.username, password: req.body.password});
    user.save()
    .then(u => res.status(201).send(user))
    .catch(e => {
        console.log(e);
        res.status(400).json({message: "Impossible d'enregistrer l'utilisateur"})
    })
};

exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
    .then( user => {
        if(!user){
            console.log("Username incorrect");
            res.status(401).json({message:"L'utilisateur n'est pas trouvé"});
        }else {
            console.log("Utilisateur trouvé " + user);
            if(req.body.password = user.password){
                console.log("Acces autorisé");
                res.status(200).json({
                    userID: user._id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    token: jwt.sign({userId: user._id}, "My_secret_string",{expiresIn:'72h'})
                })

            } else {
                console.log("Username ou mot de passe incorrect");
                res.status(403).json({message:"Accès refusé"}) 
            }
        }
    })
};