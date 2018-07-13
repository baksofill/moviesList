var Marionette = require("backbone.marionette");

var InputView = require("../formElements/input/input");
var SelectView = require("../formElements/select/select");

var schema = {
    "title": "Film form",
    "type": "obj",
    "properties": {
        "0": {
            "type": "string",
            "value": "author",
            "dep": {
                "0": {
                    "target": "movieName",
                    "action": "update value",
                    "event": "change" //blure, focus
                }
            }

        }
        ,"1": {
            "type": "string",
            "value": "movieName"
        }
        ,"2": {
            "type": "select",
            "value": "typeOfFilm"
        }
        ,"3": {
            "type": "number",
            "value": "releaseDate"
        }
        // ,"4": {
        //     "type": "obj",
        //     "value": "duration",
        //     "properties": {
        //         "0": {
        //             "type": "string",
        //             "value": "min"
        //         },
        //         "1": {
        //             "type": "string",
        //             "value": "hr"
        //         }
        //     }
        // }
    }
};


var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),

    regions: {
        element: ".element"
    },

    // templateHelpers: function() {
    //     return {
    //         buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie"
    //     };
    // },

    events: {
        "submit": "onSubmit"
    },

    modelEvents: {
        change: "render"
    },

    ui: {
        author: "#id-author",
        movieName: "#id-movieName",
        releaseDate: "#id-releaseDate",
        typeOfFilm: "#id-typeOfFilm",
        duration: "#id-duration"
    },

    render: function () {

        var unitedViews = this.parsingElements(schema);

        return this.$el.append(unitedViews + this.template( this.model.toJSON() ));
    },

    parsingElements: function (data) {
        var unitedViews = "";
        for (var key in data.properties) {
            // debugger;
            var typeOfElement = data.properties[key].type;
            var value = data.properties[key].value;
            var elementView = this.selectingView(typeOfElement, value);
            unitedViews += elementView.$el[0].outerHTML;
        }
        return unitedViews;
    },

    selectingView: function (type, value) {
        /*this.model.set({
            releaseDate: view.ui.releaseDate.val(),
            duration: {
                type: "min",
                value: view.ui.duration.val()
            }
        };*/
        var myVal = this.model.attributes[value];

        switch (type) {
        case "string":
            return new InputView({options: {key: value, value: myVal}});
        case "number":
            return new InputView({options: {key: value, value: myVal}});
        case "select":
            return new SelectView({options: {key: value, value: myVal}});
        case "multiple":
            return new InputView({options: {key: value, value: myVal}});
        default:
            console.log("something when wrong");
        }
    },
    
    onSubmit: function () {
        Marionette.triggerMethodOn(this.getOption("layout"), (this.getOption("mode") ? this.getOption("mode") : "add") + ":movie:item", this);
    }
});

module.exports = FormView;
