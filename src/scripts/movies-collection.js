/* globals _: false */
var Backbone = require("backbone");
var MovieModel = require("./movies-model");

var MovieCollection = Backbone.Collection.extend({
    model: MovieModel,

    splice: function(index, howMany) {
        var args = _.toArray(arguments).slice(2).concat({at: index}),
            removed = this.models.slice(index, index + howMany);
      
        this.remove(removed).add.apply(this, args);
      
        return removed;
    }
});

module.exports = MovieCollection;
