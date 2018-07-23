var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./input.html"),

    initialize: function(data) {
        this.model = new Backbone.Model(this.ititData(data.options));
        this.render();
    },

    ititData: function (data) {
        return _.defaults(data, {key: "", value: ""});
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
