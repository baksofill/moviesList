var Marionette = require("backbone.marionette");
var modals = require("../services/modal");

/**
 * @class View for demonstration of modals alert, confirm and prompt
 */
var ModalView = Marionette.LayoutView.extend({
    tagName: "div",
    template: require("./view.jst"),

    /**
     * @name events
     * @type {Object}
     */
    events: {
        "click #alert": "showAlert",
        "click #confirm": "showConfirm",
        "click #prompt": "showPrompt",
    },

    /**
     * @method showAlert
     */
    showAlert: function() {
        modals.close();
        modals.request("alert", {
            title: "Alert",
            text: "You are in danger!"
        }).then(function(val) {
            console.log(val);
            this.log("alert", val);
        }.bind(this));
    },

    /**
     * @method showConfirm
     */
    showConfirm: function() {
        modals.close();
        modals.request("confirm", {
            title: "Confirmation",
            text: "Should i stay? Or should i go?"
        }).then(function(val) {
            this.log("confirm", val);
        }.bind(this));
    },

    /**
     * @method showPrompt
     */
    showPrompt: function() {
        modals.close();
        modals.request("prompt", {
            title: "Prompt",
            text: "What is your name?",
            value: "Waldo"
        }).then(function(val) {
            this.log("prompt", val);
        }.bind(this));
    },

    /**
     * @method log
     * @param {String} type
     * @param {String} msg
     */
    log: function(type, msg) {
        this.$("#log").append(`${type}: ${msg} <br/>`);
    }

});

module.exports = ModalView;
