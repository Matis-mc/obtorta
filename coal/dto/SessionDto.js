class TemplateDto {
    constructor(name, date, categories, exercises, description, duration) {
        this.name = name;
        this.date = date;
        this.categories = categories;
        this.exercises = exercises;
        this.description = description;
        this.duration = duration;
    }
}

module.exports = TemplateDto; 