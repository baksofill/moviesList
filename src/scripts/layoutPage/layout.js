var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var FormView = require("../form/form");
var ListView = require("../listOfMovies/list");
var hotView = require("../handsOnTable/hotV1.js");


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
        debugger;
        this.itemAdded();
        var listView = new ListView({collection: this.collection, layout: this});
        this.mainContainer.show(listView);

        Backbone.history.navigate("list");
    },

    onEditMovieItem: function (view) {
        var arrayOfKeys = [];
        for (var key in schema.properties) {
            var value = schema.properties[key].value;
            var dataObj = {};
            dataObj[value] = view.el[key].value;
            this.model.set(dataObj, {validate: true});
            arrayOfKeys.push(value);
        }

        var items = this.model.pick(arrayOfKeys);

        this.collection.get(view.model).set(items);
        this.onShowMovieList();
        this.model.set(this.model.defaults);
    },

    onDeleteMovieItem: function (item) {
        this.collection.remove(item);
    },

    onAddMovieItem: function (view) {
        var arrayOfKeys = [];
        for (var key in schema.properties) {
            var value = schema.properties[key].value;
            var dataObj = {};
            dataObj[value] = view.el[key].value;
            this.model.set(dataObj, {validate: true});
            arrayOfKeys.push(value);
        }

        var items = this.model.pick(arrayOfKeys);
        this.collection.add(items);
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
