var Marionette = require("backbone.marionette");
var MovieModel = require("../movies-model");
var Handsontable = require("handsontable");

var modals = require("../services/modal");
var FormView = require("../form/form");
var ModalFormWrapper = require("../services/modal/formWrapper");

var schema = require("../services/schema");
var props = require("./props.js");
var InputEditor = require("./editors/input.js");
var SelEditor = require("./editors/select.js");

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

        (function(Handsontable){
            Handsontable.editors.registerEditor("inputEditor", InputEditor);
            Handsontable.editors.registerEditor("selEditor", SelEditor);
        })(Handsontable);

        var schemaProps = schema.getPropertiesAsArray();
        var hot = new Handsontable(container, {
            data: movieCollection,
            dataSchema: makeMovie,
            contextMenu: false,
            colHeaders: schemaProps.map(function(el) {return el.title;}),
            columns: schemaProps.map(function(el, index) {return {data: props[index].data, editor: el.editor};}),
            rowHeaders: true,
        });

        Handsontable.hooks.add("modifyRowData", function(row) {
            return movieCollection.at(row);
        }, hot);

        function makeMovie() {
            return new MovieModel();
        }
    },

    onDomRefresh: function() {
        this.hotInit();
    },
});

module.exports = hotView;
