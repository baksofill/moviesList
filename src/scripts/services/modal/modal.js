var Backbone = require("backbone");
var Marionette = require("backbone.marionette");

/**
 * @class View of typical bootstrap modals
 */
var ModalView = Marionette.LayoutView.extend({
    /**
     * @method initialize
     * @param {Object} options
     */
    initialize: function(options = {}) {
        this.model = new Backbone.Model(options);
    },

    /**
     * @name triggers
     * @type {Object}
     */
    triggers: {
        "click .btn-primary": { event: "confirm", preventDefault: false, stopPropagation: false },
        "click .btn-secondary": "cancel",
        "click .close": "cancel",
    },

    /**
     * @name events
     * @type {Object}
     */
    events: {
        submit: "submit",
    },

    /**
     * @method submit
     * @param {Event} e
     */
    submit: function(e) {
        e.preventDefault();
        var val = this.$("input").val();
        this.trigger("submit", val);
    },
});

module.exports = ModalView;
