var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var MovieModel = require('../movies-model');


var FormView = require('../form/form');
var ListView = require('../listOfMovies/list');

var MovieList = Marionette.LayoutView.extend({
    className: 'list-group',
    template: require('./layout.jst'),


    regions: {
        mainContainer: '.mainContainer'
    },

    collectionEvents: {
        add: 'itemAdded'
    },

    onShowMovieForm: function () {
        var formView = new FormView({model: this.model});
        this.mainContainer.show(formView);

        Backbone.history.navigate('');
    },

    onShowMovieList: function () {
        var listView = new ListView({collection: this.collection});
        this.mainContainer.show(listView);

        Backbone.history.navigate('list');
    },

    onChildviewAddMovieItem: function (child) {
        this.model.set({
            author: child.ui.author.val(),
            movieName: child.ui.movieName.val()
        }, {validate: true});

        var items = this.model.pick('author', 'movieName');
        this.collection.add(items);
    },

    itemAdded: function () {
        this.model.set({
            author: '',
            movieName: ''
        });
    }

});

module.exports = MovieList;