var Marionette = require("backbone.marionette");


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.jst"),

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
        console.log("dropdown opened");
        // this.ui.dropdownToggle.dropdown();  //not working :(
    }
});

module.exports = FormView;
