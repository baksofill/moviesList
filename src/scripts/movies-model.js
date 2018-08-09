var Backbone = require("backbone");

var schemaService = require("./services/schema");

var defaultsData = schemaService.getDefaults();

var MovieModel = Backbone.Model.extend({
    defaults: defaultsData
});

module.exports = MovieModel;
