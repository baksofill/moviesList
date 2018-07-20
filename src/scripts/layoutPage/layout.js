var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

var FormView = require("../form/form");
var ListView = require("../listOfMovies/list");

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

    onEditMovieItem: function (view) {
        // todo: need to refactoring, should be same as on this.onAddMovieItem();
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
        var items = this.model.pick(this.parsingElements(schema.properties, view));
        this.collection.add(items);
    },

    parsingElements: function(data, view, counter, arrayOfKeys){
        if (!arrayOfKeys){
            arrayOfKeys = [];
        }

        for (var key in data) {
            if (!counter){
                counter = key;
            }
            // todo: !counter ? counter = key;
            var dataObj = {};

            if (data[key].type !== "obj") {
                var value = data[key].value;
                dataObj[value] = view.el[counter].value;
                this.model.set(dataObj, {validate: true});
                counter++;
                arrayOfKeys.push(value);
            } else {
                value = this.parsingElements(data[key].properties, view, counter, arrayOfKeys);
            }
        }
        return arrayOfKeys;
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
