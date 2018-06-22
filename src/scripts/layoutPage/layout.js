var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var MovieModel = require('../movies-model');


var MovieItem = Marionette.LayoutView.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: require('./movieItem.jst')
});


var MovieList = Marionette.CompositeView.extend({
    el: '#app-hook',
    className: 'list-group',
    template: require('./movieList.jst'),

    childView: MovieItem,
    childViewContainer: 'ul',

    ui: {
        author: '#id_author',
        form: 'form',
        movieName: '#id_movieName'
    },

    triggers: {
        'submit @ui.form': 'add:todo:item'
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
    },

    itemAdded: function() {
        this.model.set({
            author: '',
            movieName: ''
        });
    }
});

module.exports = MovieList;