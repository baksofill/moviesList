var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./input.html"),

    initialize: function(options) {
        this.model = new Backbone.Model(options.options);
        this.render();
    },

    render: function () {
        return this.$el.html(this.template(this.model.toJSON()));
    }
});

module.exports = FormElement;
