var ModalView = require("./modal");

/**
 * @class Layout view of all modal views
 */
var LayoutView = ModalView.extend({
    /**
     * @name className
     * @type {String}
     */
    className: "modal fade",

    /**
     * @name attributes
     * @type {Object}
     */
    attributes: {
        "tabindex": -1,
        "role": "dialog"
    },

    template: require("./layout.html")
});

module.exports = LayoutView;
