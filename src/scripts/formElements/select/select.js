var BaseElement = require("../base/base");

var SelectElement = BaseElement.extend({
    type: "select",
    template: require("./select.html"),

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", options: [""]});
    }
});

module.exports = SelectElement;
