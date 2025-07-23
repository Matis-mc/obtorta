class CoffeeDto{
    constructor(coffee, plant, packageType){
        this.id = coffee._id;
        this.name = coffee.name;
        this.brand = coffee.brand;
        this.power = coffee.power;
        this.package = packageType;
        this.plant = plant;
    }

}

module.exports = CoffeeDto; 