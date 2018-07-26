var Handsontable = require("handsontable");
var ObjView = require("../../formElements/obj/obj");
var props = require("../props.js");
var schema = require("../../services/schema");

var ObjEditor = Handsontable.editors.BaseEditor.prototype.extend();
ObjEditor.prototype.init = function () {
    this.div = document.createElement("DIV");
    this.div.style.display = "none";

    this.schemaProps = schema.getPropertiesAsArray();

    this.instance.rootElement.appendChild(this.div);
};
ObjEditor.prototype.prepare = function () {
    // Remember to invoke parent's method
    Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);

    this.iv = new ObjView({
        options: {
            key: props[this.col].key,
            properties: this.schemaProps[this.col].properties,
            value: this.originalValue
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
    this.div.style.minWidth = width + "px";

    // display the view
    this.div.style.display = "";

    // Attach node to DOM, by appending it to the container holding the table
    this.iv.render();
    this.div.appendChild(this.iv.el);
    this.iv.onShow();
};
ObjEditor.prototype.focus = function () {
    console.log("focus");
};
ObjEditor.prototype.close = function () {
    this.div.style.display = "none";
    while (this.div.firstChild) {
        this.div.removeChild(this.div.firstChild);
    }
};

module.exports = ObjEditor;
