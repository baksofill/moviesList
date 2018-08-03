var Marionette = require("backbone.marionette");
var MovieModel = require("../movies-model");
var Handsontable = require("handsontable");

var modals = require("../services/modal");
var FormView = require("../form/form");
var ModalFormWrapper = require("../services/modal/formWrapper");

var schemaService = require("../services/schema");
var props = require("./props.js");
var InputEditor = require("./editors/input.js");
var SelEditor = require("./editors/select.js");
var ObjEditor = require("./editors/obj.js");

var DurationRenderer = require("./renderers/duration.js");

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
            Handsontable.editors.registerEditor("objEditor", ObjEditor);
            Handsontable.renderers.registerRenderer("durationRenderer", DurationRenderer);
        })(Handsontable);

        var hot = new Handsontable(container, {
            data: movieCollection,
            dataSchema: makeMovie,
            contextMenu: false,
            colHeaders: props.map(function(el) {
                return el.title;
            }),
            columns: props.map(function(el) {
                return {
                    data: el.data,
                    editor: el.editor,
                    validator: el.validator,
                    allowInvalid: false,
                    renderer: el.renderer};
            }),
            rowHeaders: true,
        });

        Handsontable.hooks.add("modifyRowData", function(row) {
            return movieCollection.at(row);
        }, hot);

        Handsontable.hooks.add("afterChange", function(changes, source) {
            if (source === "p") {
                return;
            }
            props.forEach(function(prop, index) {
                if (changes[0][1] === prop.data) {
                    var masterElements = schemaService.getMasterElements(index);
                    var slaveElements = schemaService.getSlaveElements(index);
                    var colsToUpdate = [];
                    if (masterElements.length > 0) {
                        colsToUpdate = masterElements;
                    } else {
                        if (slaveElements.length > 0) {
                            colsToUpdate = slaveElements;
                        }
                    }
                    colsToUpdate.forEach(function(el, index) {
                        if (changes[0][2] !== changes[0][3]) {
                            var row = movieCollection.at(changes[0][0]);
                            var newValue = schemaService[el.action](row.get(el.key), row.get(el.target));
                            if (newValue !== null) {
                                this.setDataAtCell(changes[0][0], index, newValue, "p");
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
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
