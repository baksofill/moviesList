var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var defaultCaptions = require("./captions");

/**
 * @class View of typical bootstrap modals
 */
var ModalView = Marionette.LayoutView.extend({
    /**
     * @method initialize
     * @param {Object} options
     */
    initialize: function(options) {
        options = options || {};
        this.model = new Backbone.Model(options);
    },

    /**
     * @method templateHelpers
     */
    templateHelpers: function() {
        return {
            title: this.getOption("title"),
            text: this.getOption("text"),
            value: this.getOption("value") || "",
            buttonNo: this.getOption("no") || defaultCaptions.no,
            buttonYes: this.getOption("yes") || defaultCaptions.yes,
            buttonOk: this.getOption("ok") || defaultCaptions.ok,
            buttonCancel: this.getOption("cancel") || defaultCaptions.cancel,
        };
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
