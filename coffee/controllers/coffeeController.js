const Coffee = require('../models/coffee');
const Tasting = require('../models/tasting');
const Pot = require('../models/pot');
const constantes = require('../constantes');
const TastingDto = require('../models/TastingDto');
const CoffeeDto = require('../models/CoffeeDto');


exports.createTasting = async (req, res, next) => {
    try{
        const coffee = await new Coffee({
            name:req.body.coffee.name,
            brand:req.body.coffee.brand,
            power:req.body.coffee.power,
            package:req.body.coffee.package,
            plant:req.body.coffee.plant
        }).save();
        console.log(JSON.stringify(coffee));
        const tasting = await new Tasting({
                        idUser:req.params._idUser,
                        idCoffee:coffee._id,
                        idPot:req.body.idPot,
                        globalRate:req.body.globalRate,
                        milk:req.body.milk,
                        sugar:req.body.sugar,
                        power:req.body.power,
                        taste:req.body.taste,
                        view:req.body.view
        }).save();
        res.status(201).send(tasting);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de la degustation : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de la degustation"});
    }
}

exports.getTastings = async (req, res, next) => {
    try {
        let tastings = await Tasting.find({idUser: req.params._idUser});
        tastings = await Promise.all(
            tastings.map(async t => {
                let coffee = await Coffee.findOne({idCoffe:t.idCoffe});
                let pot = await Pot.findOne({idPot:t.pot});
                let plant = constantes.plants.filter(p => coffee.plant == p.id)[0];
                let package = constantes.packages.filter(p => coffee.package == p.id)[0];
                console.log(JSON.stringify(package))
                return new TastingDto(t, new CoffeeDto(coffee, plant, package), pot);
        }));
        res.status(200).send(tastings);
    } catch(error){
        console.error("Erreur lors de la recuperation des dégustation : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des dégustation"});
    }
}

exports.createPot = async (req, res, next) => {
    try {
        pot = await new Pot({
            idUser:req.params._idUser,
            asset:req.body.asset,
            label:req.body.label,
            type:req.body.type
        }).save();
        res.status(201).send(pot);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de la cafetières : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de la cafetières"});
    }
}

exports.getPots = async (req, res, next) => {
    try {
        pots = await Pot.find({idUser: req.params._idUser});
        res.status(200).send(pots);
    } catch(error){
        console.error("Erreur lors de la recuperation des cafetières : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des cafetières"});
    }
}
