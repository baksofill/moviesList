var Backbone = require("backbone");


var ToDo = Backbone.Model.extend({
    defaults: {
        id: "",
        author: "",
        movieName: "",
        releaseDate: "",
        typeOfFilm: "",
        duration: {
            type: "",
            value: ""
        }
    }
});

module.exports = ToDo;
