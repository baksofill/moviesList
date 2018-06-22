var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var MovieModel = require('../movies-model');


var MovieItem = Marionette.LayoutView.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: require('./movieItem2.jst')
});


var MovieList2 = Marionette.CompositeView.extend({
    el: '#app-hook',
    className: 'list-group',
    template: require('./movieList2.jst'),

    childView: MovieItem,
    childViewContainer: 'ul',

    ui: {
        author: '#id_author',
        form: 'form',
        movieName: '#id_movieName2'
    },

    collectionEvents: {
        add: 'itemAdded'
    },

    modelEvents: {
        change: 'render'
    },

    onAddTodoItem: function() {
        this.model.set({
            author: this.ui.author.val(),
            movieName: this.ui.movieName.val()
        }, {validate: true});

        var items = this.model.pick('author', 'movieName');
        this.collection.add(items);
    }
});

module.exports = MovieList2;