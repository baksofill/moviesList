var Marionette = require("backbone.marionette");

var ElementView = require("../formElements/input/input");

var schema = {
    title: "Film form",
    type: "obj",
    properties: {
        0: {
            "type": "string",
            "value": "author"
        },
        1: {
            "type": "string",
            "value": "movieName"
        },
        2: {
            "type": "select",
            "value": "typeOfFilm"
        },
        3: {
            "type": "number",
            "value": "releaseDate"
        },
        4: {
            "type": "multiple",
            "value": "duration"
        }
    }
};


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),

    regions: {
        element: ".element"
    },

    templateHelpers: function() {
        return {
            buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie"
        };
    },

    events: {
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

    initialize: function () {
        // debugger;
    },

    onShow: function () {
        debugger;
        // schema.properties.length;
        for (key in schema.properties) {
            var typeOfElement =  schema[key].type;
            this.renderingCustomElement(typeOfElement);
        }



        var elementView = new ElementView({model: this.model});
        this.showChildView("element", elementView);
    },

    renderingCustomElement: function () {

    },
    
    onSubmit: function () {
        Marionette.triggerMethodOn(this.getOption("layout"), (this.getOption("mode") ? this.getOption("mode") : "add") + ":movie:item", this);
    }
});

module.exports = FormView;
