var Marionette = require("backbone.marionette");
var Router = require("./appRoutes");
var modals = require("./services/modal");

var initialData = [
    {
        author: "Spilberg",
        movieName: "Cool movie about Marionette",
        dropdown: [
            {option: "Movie"},
            {option: "TV series"}
        ],
        releaseDate: "2007",
        // better to use obj instead array
        duration: [
            {min: "30"},
            {hr: "0.5"}
        ]
    },
    {
        author: "Tom Kruz",
        movieName: "Some coding",
        dropdown: [
            {option: "Movie"},
            {option: "TV series"}
        ],
        releaseDate: "2005",
        duration: [
            {min: "30"},
            {hr: "0.5"}
        ]
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

app.start({initialData: initialData});
