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
        author: "#id-author",
        movieName: "#id-movieName",
        releaseDate: "#id-release-date",
        typeOfFilm: "#dropdown",
        duration: "#duration"
    },

    onDropdownToggle: function () {
        this.ui.dropdownToggle.dropdown();
    }
});

module.exports = FormView;
