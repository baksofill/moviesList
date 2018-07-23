var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var FormView = require("../form/form");
var ListView = require("../listOfMovies/list");
var hotView = require("../handsOnTable/hot.js");


var schema = require("../schema.json");

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
        this.itemAdded();
        var listView = new ListView({collection: this.collection, layout: this});
        this.mainContainer.show(listView);

        Backbone.history.navigate("list");
    },

    onShowMovieTable: function () {
        var hot = new hotView({collection: this.collection, layout: this});
        this.mainContainer.show(hot);

        Backbone.history.navigate("handsontable");
    },

    onEditMovieItem: function (data) {
        var arrayOfKeys = [];

        for (var key in data) {
            arrayOfKeys.push(key);
        }

        this.model.set(data, {validate: true});
        var items = this.model.pick(arrayOfKeys);

        this.collection.get(this.model).set(items);
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
        for (var key in schema.properties) {
            var value = schema.properties[key].value;
            var dataObj = {};
            dataObj[value] = "";
            this.model.set(dataObj, {validate: true});
        }
    }
});

module.exports = MovieList;
