var s = require("../services/schema");

var props = (function() {
    function property(attr) {
        return function(model, value) {
            if (_.isUndefined(value)) {
                return model.get(attr);
            }
            model.set(attr, value);
        };
    }

    return s.getPropertiesAsArray().map(function(el) {
        return {
            key: el.value,
            data: property(el.value)
        };
    });
})();

module.exports = props;
