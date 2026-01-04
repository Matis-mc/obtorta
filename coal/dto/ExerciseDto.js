class ExerciseDto{
    constructor(_id, name, categories, series){
        this._id = _id;
        this.name = name;
        this.categories = categories;
        this.series = series | [];
    }

}

module.exports = ExerciseDto; 