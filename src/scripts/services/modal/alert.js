var ModalView = require("./modal");
var defaultCaptions = require("./captions");

/**
 * @class View of bootstrap modal alert
 */
var AlertView = ModalView.extend({
    template: function (data) {
        return `
<div class="modal-header">
    <h5 class="modal-title">${data.title}</h5>
    <button type="button" class="close" aria-hidden="true">&times;</button>      
</div>

<div class="modal-body">
    <p>${data.text}</p>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-primary">${data.ok || defaultCaptions.ok}</button>
</div>
        `;
    }
});

module.exports = AlertView;
