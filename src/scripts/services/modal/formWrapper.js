var Marionette = require("backbone.marionette");

/**
 * @class Wrapper layout view for views in modal
 */
var ModalFormWrapper = Marionette.LayoutView.extend({
    template: require("./formWrapper.html"),

    /**
     * @method templateHelpers
     */
    templateHelpers: function() {
        return {
            title: this.getOption("title")
        };
    },

    /**
     * @name regions
     * @type {Object}
     */
    regions: {
        content: "#modal-form-wrapper-content"
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
        this.trigger("submit");
    },

    /**
     * @method setForm
     * @param {Backbone.View} view
     */
    setForm: function(view) {
        this.formView = view;
    },

    /**
     * @method onRender
     */
    onRender: function() {
        if (this.formView) {
            this.content.show(this.formView);
        }
    },
});

module.exports = ModalFormWrapper;
