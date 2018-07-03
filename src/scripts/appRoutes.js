var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var MovieView = require("./layoutPage/layout");
var MovieModel = require("./movies-model");


var Controller = Marionette.Object.extend({
    initialize: function () {
        this.options.regionManager = new Marionette.RegionManager({
            regions: {
                main: "#app-hook"
            }
        });
        var initialData = this.getOption("initialData");

        var movie = new MovieView({
            collection: new Backbone.Collection(initialData),
            model: new MovieModel()
        });

        this.getOption("regionManager").get("main").show(movie);
        this.options.movie = movie;
    },


    index: function () {
        var movie = this.getOption("movie");
        movie.triggerMethod("show:movie:form");
    },

    listEntry: function () {
        var movie = this.getOption("movie");
        movie.triggerMethod("show:movie:list");
    },

    default: function (other) {
        console.log("we are on 404 page. " + other + "page not еxist");
    }
});

var Router = Marionette.AppRouter.extend({
    appRoutes: {
        "": "index",
        "list": "listEntry",
        "*other": "default"
    },

    initialize: function () {
        this.controller = new Controller({
            initialData: this.getOption("initialData")
        });
    }
});

module.exports = Router;
