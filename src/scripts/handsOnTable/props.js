var s = require("../services/schema");

/**
 * Returns array of data for each column of table according to schema
 * @returns {Array}
 */
var props = (function() {
    function property(attr) {
        return function(model, value) {
            if (_.isUndefined(value)) {
                return model.get(attr);
            }
            model.set(attr, value);
        };
    }

    function validator() {
        return function (value, callback) {
            callback($("#hotEditorForm").valid());
        };
    }

    return s.getPropertiesAsArray().map(function(el) {
        return _.merge(el, {
            key: el.value,
            data: property(el.value),
            validator: (el.validation) ? validator() : undefined
        });
    });
})();

module.exports = props;
