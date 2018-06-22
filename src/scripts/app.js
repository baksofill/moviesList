var Marionette = require('backbone.marionette');
var MovieView = require('./layoutPage/layout');
var MovieModel = require('./movies-model');


var initialData = [
    {author: 'Spilberg', movieName: 'Cool movie about Marionette'},
    {author: 'Tom Kruz', movieName: 'Some coding'}
];

var app = new Marionette.Application({
    onStart: function(options) {
        var movie = new MovieView({
            collection: new Backbone.Collection(options.initialData),
            model: new MovieModel()
        });
        movie.render();
        movie.triggerMethod('show');
    }
});

app.start({initialData: initialData});