var Marionette = require("backbone.marionette");
var Backbone = require("backbone");
var $ = require("jquery");

var schemaService = require("../../services/schema");

var FormElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./input.html"),

    initialize: function(data) {
        this.model = new Backbone.Model(this.ititData(data.options));
        this.render();
    },

    addEvents: function (depObj) {
        depObj.watchedEl = this.model.attributes.key;
        $("#id-" + [depObj.target]).on(depObj.event, depObj, function (e) {
            $("#id-" + e.data.watchedEl)[0].value = schemaService[e.data.action]($("#id-" + e.data.watchedEl)[0].value,  e.currentTarget.value);
        });
    },

    dependencyAction: function (action, onDependsEl) {
        if ($("#id-" + onDependsEl)[0]) {
            var onDependsValue =  $("#id-" + onDependsEl)[0].value;
            this.$el[0].value = schemaService[action](this.$el[0].value, onDependsValue);
        }
    },

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", dep: {}});
    },

    render: function () {
        if (Object.keys(this.model.attributes.dep).length > 0) {
            for (var key in this.model.attributes.dep) {
                this.addEvents(this.model.attributes.dep[key]);
            }
        }
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
