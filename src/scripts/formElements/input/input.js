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
        for (var key in data) {
            if (!data[key]) {
                data[key] = "";
            }
        }
        return data;
    },

    render: function () {
        return this.$el.html(this.template(this.model.toJSON()));
    },

    set: function (vals) {
        this.model.set(vals);
        this.render();
    },

    getValue: function () {
        return this.$("#id-" + this.model.get("key")).val();
    }
});

module.exports = FormElement;
