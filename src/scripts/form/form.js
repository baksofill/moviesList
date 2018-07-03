var Marionette = require("backbone.marionette");


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),

    triggers: {
        submit: "add:movie:item"
    },

    events: {
        "click @ui.dropdownToggle": "onDropdownToggle"
    },

    modelEvents: {
        change: "render"
    },

    ui: {
        author: "#id_author",
        movieName: "#id_movieName",
        releaseDate: "#id_release-date",
        dropdownToggle: ".dropdown-toggle"
    },

    onDropdownToggle: function () {
        this.ui.dropdownToggle.dropdown();
    }
});

module.exports = FormView;
