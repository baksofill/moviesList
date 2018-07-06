var Marionette = require("backbone.marionette");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./input.html"),

    events: {
        // "submit": "onSubmit"
    },


    ui: {

    },

    initialize: function () {
        // debugger;
    }
});

module.exports = FormElement;
