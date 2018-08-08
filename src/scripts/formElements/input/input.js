var BaseElement = require("../base/base");

var FormElement = BaseElement.extend({
    type: "input",
    template: require("./input.html")
});

module.exports = FormElement;
