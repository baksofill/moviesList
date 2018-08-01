var BaseElement = require("../base/base");

var SelectElement = BaseElement.extend({
    template: require("./select.html"),

    ititData: function (data) {
        return _.defaults(data, {key: "", value: "", options: [""], dep: {}});
    }
});

module.exports = SelectElement;
