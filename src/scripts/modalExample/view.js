var Marionette = require("backbone.marionette");
var modals = require("../services/modal");

var ModalView = Marionette.LayoutView.extend({
    tagName: "div",
    template: require("./view.jst"),

    events: {
        "click #alert": "showAlert",
        "click #confirm": "showConfirm",
        "click #prompt": "showPrompt",
    },

    showAlert(e) {
        modals.close();
        modals.request("alert", {
            title: "Alert",
            text: "You are in danger!"
        }).then(function(val) {
            this.log("alert", val);
        }.bind(this));
    },

    showConfirm(e) {
        modals.close();
        modals.request("confirm", {
            title: "Confirmation",
            text: "Should i stay? Or should i go?"
        }).then(function(val) {
            this.log("confirm", val);
        }.bind(this));
    },

    showPrompt(e) {
        modals.close();
        modals.request("prompt", {
            title: "Prompt",
            text: "What is your name?",
            value: "Waldo"
        }).then(function(val) {
            this.log("prompt", val);
        }.bind(this));
    },

    log(type, msg) {
        this.$("#log").append(`${type}: ${msg} <br/>`);
    }

});

module.exports = ModalView;
