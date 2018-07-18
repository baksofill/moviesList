var Backbone = require("backbone");

var schema = require("./schema.json");


var defaultsData = {};
for (var key in schema.properties) {
    var value = schema.properties[key].value;
    defaultsData[value]= "";
}

var ToDo = Backbone.Model.extend({
    defaults: defaultsData
});

module.exports = ToDo;
