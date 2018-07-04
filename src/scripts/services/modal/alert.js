var ModalView = require("./modal");

/**
 * @class View of bootstrap modal alert
 */
var AlertView = ModalView.extend({
    template: require("./alert.html")
});

module.exports = AlertView;
