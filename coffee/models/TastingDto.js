class TastingDto {
    constructor(tasting, coffeeDto, pot){
        this.idUser = tasting.idUser;
        this.idCoffee = tasting.idCoffee;
        this.coffee = coffeeDto;
        this.pot = pot;
        this.globalRate = tasting.globalRate; 
        this.milk = tasting.milk,  
        this.sugar = tasting.sugar,
        this.power = tasting.power,  
        this.taste = tasting.taste,  
        this.view = tasting.view        
    } 
};


module.exports = TastingDto; 