var Marionette = require("backbone.marionette");
var Backbone = require("backbone");
var $ = require("jquery");

var schemaService = require("../../services/schema");

var SelectElement = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    template: require("./select.html"),

    events: {
        "submit": "onSubmit"
        ,"change #id-typeOfFilm": "dependencyAction"
    },

    dependencyAction: function (e) {
        var onDependsValue = e.currentTarget.value;
        var dependItemId = "#id-" + this.model.attributes.dep.dependItem;
        var currentValue = $(dependItemId)[0].value;
        $(dependItemId)[0].value = schemaService[this.model.attributes.dep.action](currentValue, onDependsValue);
    },

    initialize: function(data) {
        this.model = new Backbone.Model(this.ititData(data.options));
        var eventKey = this.model.attributes.dep.event + " #id-" + this.model.attributes.key ;
        if (eventKey !== "") {
            this.events[eventKey] = "dependencyMethod";
        }
        this.render();
    },

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", options: [""], dep: {event: "", dependItem: "", action: ""}});
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

module.exports = SelectElement;
