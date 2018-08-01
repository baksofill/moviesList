var Marionette = require("backbone.marionette");
var Backbone = require("backbone");

var schemaService = require("../../services/schema");

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

    addEvents: function (depObj) {
        depObj.watchedEl = this.model.attributes.key;
        $("#id-" + [depObj.target]).on(depObj.event, depObj, function (e) {
            $("#id-" + e.data.watchedEl)[0].value = schemaService[e.data.action]($("#id-" + e.data.watchedEl)[0].value,  e.currentTarget.value);
        });
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
