var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",

    initialize: function(data) {
        this.key = data.options.key;
        this.model = new Backbone.Model(this.ititData(data.options));
        this.render();
        if (data.options.validation) {
            this.validation = data.options.validation;
        }
    },

    ititData: function (data) {
        return _.defaults(data, {key: "", value: ""});
    },

    render: function () {
        return this.$el.html(this.template(this.model.toJSON()));
    },

    getValidationOptions: function() {
        var options = {
            rules: {},
        };
        if (this.validation) {
            options.rules[this.key] = this.validation;
        }
        return options;
    },

    set: function (vals) {
        this.model.set(vals);
        this.render();
    },

    getId: function() {
        return "#id-" + this.key;
    },

    getValue: function () {
        return $(this.getId()).val();
    }
});

module.exports = FormElement;
