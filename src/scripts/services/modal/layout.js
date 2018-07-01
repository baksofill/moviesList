var ModalView = require("./modal");

var LayoutView = ModalView.extend({
    className: "modal fade",

    attributes: {
        "tabindex": -1,
        "role": "dialog"
    },

    //template: function renderLayout() {
    //    return "<div class='modal-dialog'><div class='modal-content'></div></div>";
    //}
    //template: _.template("<div class='modal-dialog'><div class='modal-content'></div></div>")
    template: function() {
        return `
<div class='modal-dialog'>
    <div class='modal-content'></div>
</div>
        `;
    }
});

module.exports = LayoutView;
