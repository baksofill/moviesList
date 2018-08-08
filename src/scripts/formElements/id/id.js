var BaseElement = require("../base/base");

var FormElement = BaseElement.extend({
    type: "id",
    template: require("./id.html")
});

module.exports = FormElement;
