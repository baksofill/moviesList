var data = require("../schema.json");

var Schema = {

    getEditor: function(index) {

        switch (data.properties[index].type) {
        case "id":
            return "inputEditor";
        case "string":
            return "inputEditor";
        case "number":
            return "inputEditor";
        case "select":
            return "selEditor";
        case "obj":
            return "objEditor";
        default:
            return "inputEditor";
        }
    },

    getProperties: function() {
        var props = {};
        for (var key in data.properties) {
            props[key] = data.properties[key];
            props[key].title = data.properties[key].value;
            props[key].editor = this.getEditor(key);
        }
        return props;
    },

    getPropertiesAsArray: function() {
        return _.values(this.getProperties());
    }
};

module.exports = Schema;
