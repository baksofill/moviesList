var ModalView = require("./modal");

/**
 * @class View of bootstrap modal prompt
 */
var PromptView = ModalView.extend({
    tagName: "form",
    template: require("./prompt.html")
});

module.exports = PromptView;
