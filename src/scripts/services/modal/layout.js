var ModalView = require("./modal");

/**
 * @class Layout view of all modal views
 */
var LayoutView = ModalView.extend({
    className: "modal fade",

    attributes: {
        "tabindex": -1,
        "role": "dialog"
    },

    template: function() {
        return `
<div class='modal-dialog'>
    <div class='modal-content'></div>
</div>
        `;
    }
});

module.exports = LayoutView;
