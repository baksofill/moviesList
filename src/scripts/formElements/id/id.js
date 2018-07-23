var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./id.html"),

    initialize: function(options) {
        this.model = new Backbone.Model(options.options);
        this.render();
    },

    render: function () {
        return this.$el.html(this.template(this.model.toJSON()));
    },

    set: function (vals) {
        this.model.set(vals);
        this.render();
    },

    getId: function() {
        return "#id-" + this.model.get("key");
    },

    getValue: function () {
        return this.$(this.getId()).val();
    }
});

module.exports = FormElement;
