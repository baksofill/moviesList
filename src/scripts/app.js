var Marionette = require("backbone.marionette");
var Router = require("./appRoutes");
var modals = require("./services/modal");
var schema = require("./services/schema");

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
        },
        seasons: "",
        country: "USA",
        movieMaker: "DreamWorks Animation"

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
        },
        seasons: "4",
        country: "France",
        movieMaker: "StudioCanal"
    }
];

var app = new Marionette.Application({
    onStart: function (options) {
        var router = new Router(options);

        Backbone.history.start();
    }
});

modals.setup({
    el: "#main-modal-container"
});

schema.setupValidators();

app.start({initialData: initialData});
