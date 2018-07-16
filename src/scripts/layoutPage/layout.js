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
        add: "onShowMovieList"
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
            id: Math.random(),
            author: view.el[0].value,
            movieName: view.el[1].value,
            typeOfFilm: view.el[2].value,
            releaseDate: view.el[3].value,
            duration: {
                type: "min",
                value: "--"
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
            author: view.el[0].value,
            movieName: view.el[1].value,
            typeOfFilm: view.el[2].value,
            releaseDate: view.el[3].value,
            duration: {
                type: "min",
                value: "--"
            }
        }, {validate: true});

        var items = this.model.pick("id", "author", "movieName", "typeOfFilm", "releaseDate", "duration");
        this.collection.add(items);
    },

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
