var Marionette = require("backbone.marionette");

var IdView = require("../formElements/id/id");
var InputView = require("../formElements/input/input");
var SelectView = require("../formElements/select/select");

var schema = require("../schema.json");

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

    render: function () {
        var unitedViews = this.parsingElements(schema);
        return this.$el.append(unitedViews + this.template( this.model.toJSON() ));
    },

    parsingElements: function (data) {
        var unitedViews = "";
        for (var key in data.properties) {
            if(data.properties[key].type !== "obj"){
                var options;
                var typeOfElement = data.properties[key].type;
                var value = data.properties[key].value;
                data.properties[key].options ? options = data.properties[key].options : options = [];
                var elementView = this.selectingView(typeOfElement, value, options);
                if(elementView){
                    unitedViews += elementView.$el[0].outerHTML;
                }
            } else {
                unitedViews += this.parsingElements(data.properties[key]);
            }
        }
        return unitedViews;
    },

    selectingView: function (type, value, optionsArray) {
        var myVal = this.model.attributes[value];

        switch (type) {
        case "id":
            return new IdView({options: {key: value, value: Math.random()}});
        case "string":
            return new InputView({options: {key: value, value: myVal}});
        case "number":
            return new InputView({options: {key: value, value: myVal}});
        case "select":
            return new SelectView({options: {key: value, value: myVal, options: optionsArray}});
        case "multiple":
            return new InputView({options: {key: value, value: myVal}});
        default:
            console.log("something when wrong");
        }
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
