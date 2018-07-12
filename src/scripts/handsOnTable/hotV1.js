/* globals _: false */
var Marionette = require("backbone.marionette");
var MovieModel = require("../movies-model");
var Handsontable = require("handsontable");

var modals = require("../services/modal");
var FormView = require("../form/form");
var ModalFormWrapper = require("../services/modal/formWrapper");

var hotView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("./hot.html"),

    events: {
        "click #btn-add": "addNew"
    },

    addNew: function () {
        var formView = new FormView({model: this.getOption("layout").model, layout: this.getOption("layout"), mode: "add"});
        var modalFW = new ModalFormWrapper({title: "Add movie"});
        modalFW.setForm(formView);
        modalFW.on({
            cancel: function() {
                modals.request("close", modalFW);
            },
            submit: function() {
                modals.request("close", modalFW);
            },
        });

        modals.request("close");
        modals.request("open", modalFW);
    },

    hotInit: function() {
        var movieCollection = this.collection;
        var container = document.getElementById("hot");


        var hot = new Handsontable(container, {
            data: movieCollection,
            dataSchema: makeMovie,
            contextMenu: false,
            colHeaders: ["Author", "Movie name", "Release date", "Type"],
            columns: [
                {data: property("author")},
                {data: property("movieName"), type: "text"},
                {data: property("releaseDate")},
                {data: property("typeOfFilm")},
            ],
            rowHeaders: true,
        });

        Handsontable.hooks.add("modifyRowData", function(row) {
            return movieCollection.at(row);
        }, hot);

        function makeMovie() {
            return new MovieModel();
        }

        function property(attr) {
            return function (model, value) {
                if (_.isUndefined(value)) {
                    return model.get(attr);
                }
                model.set(attr, value);
            };
        }
    },

    onDomRefresh: function() {
        this.hotInit();
    },
});

module.exports = hotView;
