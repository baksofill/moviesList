var ModalView = require("./modal");
var defaultCaptions = require("./captions");

/**
 * @class View of bootstrap modal prompt
 */
var PromptView = ModalView.extend({
    tagName: "form",
    template: function (data) {
        return `
<div class="modal-header">
    <h5 class="modal-title">${data.title}</h5>
    <button type="button" class="close" aria-hidden="true">&times;</button>
</div>

<div class="modal-body">
    <div class="form-group">
    <label for="modal__input--prompt">${data.text}</label>
    <input id="modal__input--prompt" class="form-control" type="text" value="${data.value || ""}">
    </div>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-secondary">${data.cancel || defaultCaptions.cancel}</button>
    <button type="submit" class="btn btn-primary">${data.ok || defaultCaptions.ok}</button>
</div>
`;
    }
});

module.exports = PromptView;
