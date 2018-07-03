var Marionette = require("backbone.marionette");

var List = Marionette.LayoutView.extend({
    tagName: "li",
    className: "list-group-item",
    template: require("./moviesList.html")
});

var MainListView = Marionette.CompositeView.extend({
    tagName: "span",
    className: "list-group",
    template: require("./listWrapper.html"),
    childView: List,
    childViewContainer: "ul",

    ui: {
        dropdownToggle: ".glyphicon-pencil",
        btnAdd: "#btn-add"
    },

    events: {
        "click @ui.dropdownToggle": "edit",
        "click @ui.btnAdd": "addNew"
    },

    edit: function () {
        console.log("start edit current item");
    },

    addNew: function () {
        console.log("adding new item");
    }
});

module.exports = MainListView;
