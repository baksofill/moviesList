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
        id: "#id",
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
        this.model.set({
            id: (this.ui.id.val() === "") ? Math.random() : this.ui.id.val(),
            author: this.ui.author.val(),
            movieName: this.ui.movieName.val(),
            typeOfFilm: this.ui.typeOfFilm.val(),
            releaseDate: this.ui.releaseDate.val(),
            duration: {
                type: "min",
                value: this.ui.duration.val()
            }
        }, {validate: true});

        if (this.model.isValid()) {
            Marionette.triggerMethodOn(this.getOption("layout"),
                (this.getOption("mode") ? this.getOption("mode") : "add") + ":movie:item",
                this.toObject()
            );
        } else {
            console.log("invalid form data");
        }
    },

    toObject: function () {
        return this.model.pick("id", "author", "movieName", "typeOfFilm", "releaseDate", "duration");
    }
});

module.exports = FormView;
