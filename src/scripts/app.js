var Marionette = require("backbone.marionette");
var Router = require("./appRoutes");

var initialData = [
    {
        author: "Spilberg",
        movieName: "Cool movie about Marionette",
        dropdown: [
            {option: "Movie"},
            {option: "TV series"}
        ],
        releaseDate: "2007",
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
    // {
    //     author: {
    //         label: "author",
    //         type: "input",
    //         class: "myClass, someClass",
    //         value: "Spilberg",
    //         validationRule: "string"
    //     },
    //     movieName: {
    //         label: "Director",
    //         type: "input",
    //         class: "",
    //         value: "Cool movie about Marionette",
    //         validationRule: "string"
    //     },
    //     dropdown: [
    //         {
    //             option: "Movie",
    //             class: "",
    //             disabled: "true",
    //             type: "dropdown"
    //         },
    //         {
    //             option: "TV series",
    //             class: "",
    //             disabled: "false",
    //             type: "dropdown"
    //         }
    //     ],
    //     releaseDate: {
    //         label: "Release Date",
    //         type: "input",
    //         value: "2007",
    //         class: "",
    //         disabled: "true",
    //         validationRule: "integer"
    //     },
    //     duration: [
    //         {
    //             min: "30",
    //             type: "input",
    //             label: "Min",
    //             validationRule: "integer",
    //             class: ""
    //         },
    //         {
    //             hr: "0.5",
    //             type: "input",
    //             label: "Min",
    //             validationRule: "positiveNumber",
    //             class: ""
    //         }
    //     ]
    // }

];

var app = new Marionette.Application({
    onStart: function (options) {
        var router = new Router(options);

        Backbone.history.start();
    }
});

app.start({initialData: initialData});
