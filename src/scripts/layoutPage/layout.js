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

    onEditMovieItem: function (data) {
        this.collection.get(data.id).set(data);
        this.onShowMovieList();
        this.model.set(this.model.defaults);
    },

    onDeleteMovieItem: function (item) {
        this.collection.remove(item);
    },

    onAddMovieItem: function (data) {
        this.collection.add(data);
    },

    itemAdded: function () {
        this.model.set(this.model.defaults);
    }
});

module.exports = MovieList;
