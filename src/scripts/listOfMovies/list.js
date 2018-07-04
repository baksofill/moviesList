var Marionette = require("backbone.marionette");
var modals = require("../services/modal");
var FormView = require("../form/form");
var ModalFormWrapper = require("../services/modal/formWrapper");

var List = Marionette.LayoutView.extend({
    tagName: "li",
    className: "list-group-item",
    template: require("./moviesList.html"),

    ui: {
        btnEdit: ".glyphicon-pencil",
        btnDelete: ".glyphicon-trash",
    },

    events: {
        "click @ui.btnEdit": "edit",
        "click @ui.btnDelete": "delete",
    },

    edit: function () {
        var formView = new FormView({model: this.model, layout: this.getOption("layout"), mode: "edit"});
        var modalFW = new ModalFormWrapper({title: "Edit movie"});
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

    delete: function () {
        modals.request("close");
        modals.request("confirm", {
            title: "Confirm deletion",
            text: "Do you want to delete the entry?",
        }).then(function(val) {
            if (val === true) {
                Marionette.triggerMethodOn(this.getOption("layout"), "delete:movie:item", this.model);
            }
        }.bind(this));
    },
});

var MainListView = Marionette.CompositeView.extend({
    tagName: "span",
    className: "list-group",
    template: require("./listWrapper.html"),
    childView: List,
    childViewContainer: "ul",
    childViewOptions: function() {
        return {
            layout: this.getOption("layout")
        };
    },

    ui: {
        btnAdd: "#btn-add"
    },

    events: {
        "click @ui.btnAdd": "addNew"
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
    }
});

module.exports = MainListView;
