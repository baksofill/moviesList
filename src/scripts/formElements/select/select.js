var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var SelectElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./select.html"),

    initialize: function(data) {
        this.model = new Backbone.Model(this.ititData(data.options));
        this.render();
    },

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", options: [""]});
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

module.exports = SelectElement;
