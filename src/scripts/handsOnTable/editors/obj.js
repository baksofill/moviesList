var Handsontable = require("handsontable");
var ObjView = require("../../formElements/obj/obj");
var props = require("../props.js");

var ObjEditor = Handsontable.editors.BaseEditor.prototype.extend();
ObjEditor.prototype.init = function () {
    this.div = document.createElement("DIV");
    this.div.style.display = "none";
    this.form = document.createElement("FORM");
    this.form.setAttribute("id", "hotEditorForm");

    this.instance.rootElement.appendChild(this.div);
};
ObjEditor.prototype.prepare = function () {
    // Remember to invoke parent's method
    Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);

    this.iv = new ObjView({
        options: {
            key: props[this.col].key,
            properties: props[this.col].properties,
            value: this.originalValue,
            validation: props[this.col].validation
        }
    });
};
ObjEditor.prototype.saveValue = function (value, ctrlDown) {
    // if ctrl+enter and multiple cells selected, behave like Excel (finish editing and apply to all cells)
    if (ctrlDown) {
        // have to do
    } else {
        this.instance.setDataAtCell(this.row, this.col, value[0][0], "edit");
    }
};
ObjEditor.prototype.setValue = function (value) {
    this.iv.set({ value });
};
ObjEditor.prototype.getValue = function () {
    return this.iv.getValue();
};
ObjEditor.prototype.open = function () {
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

    // Attach node to DOM, by appending it to the container holding the table
    this.iv.render();
    this.form.appendChild(this.iv.el);
    this.div.appendChild(this.form);
    this.iv.onShow();
    $("#hotEditorForm").validate(this.iv.getValidationOptions());
};
ObjEditor.prototype.focus = function () {
    console.log("focus");
};
ObjEditor.prototype.close = function () {
    this.div.style.display = "none";
    Handsontable.dom.empty(this.form);
    Handsontable.dom.empty(this.div);
};

module.exports = ObjEditor;
