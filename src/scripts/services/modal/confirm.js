var ModalView = require("./modal");

/**
 * @class View of bootstrap modal confirm
 */
var ConfirmView = ModalView.extend({
    template: require("./confirm.html")
});

module.exports = ConfirmView;
