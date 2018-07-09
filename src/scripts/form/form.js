var Marionette = require("backbone.marionette");


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),
    templateHelpers: function() {
        return {
            buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie",
            cid: this.model.cid
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
        cid: "#cid",
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
                this.toObject(),
                this.ui.cid.val()
            );
        } else {
            console.log("invalid form data");
        }
    },

    toObject: function () {
        return this.model.pick("author", "movieName", "typeOfFilm", "releaseDate", "duration");
    }
});

module.exports = FormView;
