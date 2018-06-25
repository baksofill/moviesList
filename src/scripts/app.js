var Marionette = require('backbone.marionette');
var MovieView = require('./layoutPage/layout');
var MovieModel = require('./movies-model');
var Router = require('./appRoutes');


var initialData = [
    {
        author: 'Spilberg',
        movieName: 'Cool movie about Marionette',
        releaseDate: '2007',
        duration: {
            min: '30',
            hr: '0.5'
        }
    },
    {
        author: 'Tom Kruz',
        movieName: 'Some coding',
        releaseDate: '2005',
        duration: {
            min: '30',
            hr: '0.5'
        }
    }
];

var app = new Marionette.Application({
    onStart: function (options) {
        var router = new Router(options);

        Backbone.history.start();
    }
});

app.start({initialData: initialData});
