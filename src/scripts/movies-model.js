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
    },

    validate: function(attrs) {
        var errors = {};
        var hasError = false;
        if (!attrs.author) {
            errors.author = "author must be set";
            hasError = true;
        }
        if (!attrs.movieName) {
            errors.movieName = "movieName must be set";
            hasError = true;
        }

        if (hasError) {
            return errors;
        }
    }
});

module.exports = ToDo;
