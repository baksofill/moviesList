var ModalView = require("./modal");
var defaultCaptions = require("./captions");

var ConfirmView = ModalView.extend({
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
    <button type="button" class="btn btn-secondary">${data.no || defaultCaptions.no}</button>
    <button type="button" class="btn btn-primary">${data.yes || defaultCaptions.yes}</button>
</div>
    `;
    }
});

module.exports = ConfirmView;
