//var Marionette = require("backbone.marionette");
//var Backbone = require("backbone");
var BaseElement = require("../base/base");

var FormElement = BaseElement.extend({
    template: require("./id.html")
});

module.exports = FormElement;
