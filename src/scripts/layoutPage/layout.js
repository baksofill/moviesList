var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var MovieModel = require('../movies-model');


var FormView = require('../form/form');
var ListView = require('../listOfMovies/list');

var MovieList = Marionette.LayoutView.extend({
    className: 'list-group',
    template: require('./layout.jst'),


    regions: {
        form: '.form',
        list: '.list'
    },

    // ui: {
    //     author: '#id_author',
    //     form: 'form',
    //     movieName: '#id_movieName'
    // },

    onShow: function() {

    },

    onShowMovieForm: function() {
        var formView = new FormView({model: this.model});
        this.showChildView('form', formView);

        // Backbone.history.navigate('');

    },

    onShowMovieList: function() {
        var listView = new ListView({collection: this.collection});
        this.showChildView('list', listView);

        // Backbone.history.navigate('list');

    }
});

module.exports = MovieList;