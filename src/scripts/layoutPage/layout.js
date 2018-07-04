var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var FormView = require("../form/form");
var ListView = require("../listOfMovies/list");

var MovieList = Marionette.LayoutView.extend({
    className: "list-group",
    template: require("./layout.html"),

    regions: {
        mainContainer: ".mainContainer"
    },

    collectionEvents: {
        add: "itemAdded"
    },

    onShowMovieForm: function () {
        var formView = new FormView({model: this.model, layout: this});
        this.mainContainer.show(formView);

        Backbone.history.navigate("");
    },

    onShowMovieList: function () {
        var listView = new ListView({collection: this.collection, layout: this});
        this.mainContainer.show(listView);

        Backbone.history.navigate("list");
    },

    onEditMovieItem: function (view) {
        this.model.set({
            author: view.ui.author.val(),
            movieName: view.ui.movieName.val(),
            typeOfFilm: view.ui.typeOfFilm.val(),
            releaseDate: view.ui.releaseDate.val(),
            duration: {
                type: "min",
                value: view.ui.duration.val()
            }
        }, {validate: true});

        var items = this.model.pick("author", "movieName", "typeOfFilm", "releaseDate", "duration");

        this.collection.get(view.model).set(items);
        this.onShowMovieList();
        this.model.set(this.model.defaults);
    },

    onDeleteMovieItem: function (item) {
        this.collection.remove(item);
    },

    onAddMovieItem: function (view) {
        this.model.set({
            id: Math.random(),
            author: view.ui.author.val(),
            movieName: view.ui.movieName.val(),
            typeOfFilm: view.ui.typeOfFilm.val(),
            releaseDate: view.ui.releaseDate.val(),
            duration: {
                type: "min",
                value: view.ui.duration.val()
            }
        }, {validate: true});

        var items = this.model.pick("id", "author", "movieName", "typeOfFilm", "releaseDate", "duration");
        this.collection.add(items);
    },

/*    onChildviewAddMovieItem: function (child) {
        this.model.set({
            id: Math.random(),
            author: child.ui.author.val(),
            movieName: child.ui.movieName.val(),
            typeOfFilm: child.ui.typeOfFilm.val(),
            releaseDate: child.ui.releaseDate.val(),
            duration: {
                type: "min",
                value: child.ui.duration.val()
            }
        }, {validate: true});

        var items = this.model.pick("id", "author", "movieName", "typeOfFilm", "releaseDate", "duration");
        this.collection.add(items);
    },*/

    itemAdded: function () {
        this.model.set({
            id: "",
            author: "",
            movieName: "",
            typeOfFilm: "",
            releaseDate: "",
            duration: {
                type: "",
                value: ""
            }
        });
    }
});

module.exports = MovieList;
