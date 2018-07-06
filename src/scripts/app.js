var Marionette = require("backbone.marionette");
var Router = require("./appRoutes");
var modals = require("./services/modal");

var initialData = [
    {
        id: "1",
        author: "Spilberg",
        movieName: "Cool movie about Marionette",
        typeOfFilm: "Movie",
        releaseDate: "2007",
        duration: {
            type: "min",
            value: "30"
        }
    },
    {
        id: "2",
        author: "Tom Kruz",
        movieName: "Some coding",
        typeOfFilm: "TV series",
        releaseDate: "2005",
        duration: {
            type: "hr",
            value: "0.5"
        }
    }
];

var schema = {
    title: "Film form",
    type: "obj",
    properties: {
        0: {
            "type": "string",
            "value": "author"
        },
        1: {
            "type": "string",
            "value": "movieName"
        },
        2: {
            "type": "select",
            "value": "typeOfFilm"
        },
        3: {
            "type": "number",
            "value": "releaseDate"
        },
        4: {
            "type": "multiple",
            "value": "duration"
        }
    }
};

var app = new Marionette.Application({
    onStart: function (options) {
        var router = new Router(options);

        Backbone.history.start();
    }
});

modals.setup({
    el: "#main-modal-container"
});

app.start({initialData: initialData, schema: schema});
