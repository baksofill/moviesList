var BaseElement = require("../base/base");

var DropDownElement = BaseElement.extend({
    template: require("./dropDown.html"),

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", options: [""], cellNumber: ""});
    }
});

module.exports = DropDownElement;
