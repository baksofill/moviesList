var Backbone = require("backbone");
var Marionette = require("backbone.marionette");


var ModalView = Marionette.LayoutView.extend({
    initialize(options = {}) {
        this.model = new Backbone.Model(options);
    },

    triggers: {
        "click .btn-primary": { event: "confirm", preventDefault: false, stopPropagation: false },
        "click .btn-secondary": "cancel",
        "click .close": "cancel",
    },

    events: {
        submit: "submit",
    },

    submit(e) {
        e.preventDefault();
        var val = this.$("input").val();
        this.trigger("submit", val);
    },
});

module.exports = ModalView;
