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
        var p = {};
        for (var key in data.properties) {
            p[key] = _.clone(data.properties[key]);
            p[key].title = data.properties[key].value;
            p[key].editor = this.getEditor(key);
        }
        return p;
    },

    getPropertiesAsArray: function() {
        return _.values(this.getProperties());
    },

    setupValidators: function() {
        $.validator.addMethod("releaseDate", function(value) {
            if (!value || value.length != 4 || 1895 > value || value > (new Date()).getFullYear()) {
                return false;
            }
            return true;

        }, "Please specify the correct date of release");
          
    }
};

module.exports = Schema;
