var Marionette = require("backbone.marionette");


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),
    templateHelpers: function() {
        return {
            buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie"
        };
    },

    events: {
        "click @ui.dropdownToggle": "onDropdownToggle",
        "submit": "onSubmit"
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
    },
    
    onSubmit: function () {
        Marionette.triggerMethodOn(this.getOption("layout"), (this.getOption("mode") ? this.getOption("mode") : "add") + ":movie:item", this);
    }
});

module.exports = FormView;
