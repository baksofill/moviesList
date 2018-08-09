var Handsontable = require("handsontable");
var InputView = require("../../formElements/input/input");
var schemaService = require("../../services/schema");

/**
 * @private
 * @editor InputEditor
 * @class InputEditor
 */
var InputEditor = Handsontable.editors.BaseEditor.prototype.extend();
InputEditor.prototype.init = function () {
    this.div = document.createElement("div");
    this.div.style.display = "none";
    this.form = document.createElement("form");
    this.form.setAttribute("id", "hotEditorForm");

    this.instance.rootElement.appendChild(this.div);
};
InputEditor.prototype.prepare = function () {
    // Remember to invoke parent's method
    Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);

    var props = schemaService.getProps(this.cellProperties.instance.getDataAtRow(this.row));
    
    this.iv = new InputView({
        options: {
            key: props[this.col].key,
            value: this.originalValue,
            validation: props[this.col].validation
        }
    });
};
InputEditor.prototype.setValue = function (value) {
    this.iv.set({ value });
};
InputEditor.prototype.getValue = function () {
    return this.iv.getValue();
};
InputEditor.prototype.open = function () {
    var width = Handsontable.dom.outerWidth(this.TD);
    var height = Handsontable.dom.outerHeight(this.TD);
    var rootOffset = Handsontable.dom.offset(this.instance.rootElement);
    var tdOffset = Handsontable.dom.offset(this.TD);

    this.div.style.position = "absolute";
    this.div.style.top = tdOffset.top - rootOffset.top + "px";
    this.div.style.left = tdOffset.left - rootOffset.left + "px";
    this.div.style.zIndex = 9999;
    this.div.style.height = height + "px";
    this.div.style.width = width + "px";

    // display the view
    this.div.style.display = "";

    this.iv.render();
    // Attach node to DOM, by appending it to the container holding the table
    this.form.appendChild(this.iv.el);
    this.div.appendChild(this.form);
    $("#hotEditorForm").validate(this.iv.getValidationOptions());
};
InputEditor.prototype.focus = function () {
    console.log("focus");
};
InputEditor.prototype.close = function () {
    var validator = $("#hotEditorForm").validate();
    validator.destroy();
    this.div.style.display = "none";
    Handsontable.dom.empty(this.form);
    Handsontable.dom.empty(this.div);
};

module.exports = InputEditor;
