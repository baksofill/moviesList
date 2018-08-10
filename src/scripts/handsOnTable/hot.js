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
var DropDownView = require("../formElements/dropDown/dropDown");

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
            columnSorting: true,
            colHeaders: function (col) {
                this.dropDown = new DropDownView({
                    options: {
                        key: props[col].key,
                        value: "myValue",
                        options: [
                            {type: "text", value: "Sort Asc"},
                            {type: "text", value: "Sort Desc"},
                            {type: "text", value: "Sorting Disabled"},
                            {type: "input", value: "Filter"}
                        ],
                        cellNumber: col
                    }
                });
                return this.dropDown.el.outerHTML;
            },

            columns: props.map(function(el) {
                return {
                    data: el.data,
                    editor: el.editor,
                    validator: el.validator,
                    allowInvalid: false,
                    renderer: el.renderer};
            }),
            rowHeaders: true
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
                    var colsToUpdate = schemaService.getSlaveElements(index);
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

        Handsontable.dom.addEvent(container, "click", function (event) {
            if (event.target.nodeName == "A" && event.target.className == "dropdown-item") {
                var cellNumber = event.target.dataset.cellnumber;
                switch (event.target.text) {
                case "Sort Asc":
                    hot.getPlugin("columnSorting").sort(cellNumber, "asc", false);
                    break;
                case "Sort Desc":
                    hot.getPlugin("columnSorting").sort(cellNumber, "desc", false);
                    break;
                default:
                    hot.getPlugin("columnSorting").sort(cellNumber, "none", false);
                }
            }
        });

        function makeMovie() {
            return new MovieModel();
        }
    },

    onDomRefresh: function() {
        this.hotInit();
    }
});

module.exports = hotView;
