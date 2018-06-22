var Marionette = require('backbone.marionette');
var MovieView = require('./layoutPage/layout');
var MovieModel = require('./movies-model');
var BlogList = require('./layoutPage2/layout2');


var Controller = Marionette.Object.extend({
    initialize: function() {
        /** The region manager gives us a consistent UI and event triggers across
         our different layouts.
         */
        this.options.regionManager = new Marionette.RegionManager({
            regions: {
                main: '#app-hook'
            }
        });
        var initialData = this.getOption('initialData');

        // var layout = new LayoutView({
        //     collection: new BlogList(initialData)
        // });
        var movie = new MovieView({
            collection: new Backbone.Collection(initialData),
            model: new MovieModel()
        });

        this.getOption('regionManager').get('main').show(movie);

        /** We want easy access to our root view later */
        this.options.layout = layout;
    },

    /** List all blog entrys with a summary */
    index: function() {
        var layout = this.getOption('movie');
        // layout.triggerMethod('show:blog:list');

        // var movie = new MovieView({
        //     collection: new Backbone.Collection(options.initialData),
        //     model: new MovieModel()
        // });
        console.log('we are on index page');
    },

    /** List a named entry with its comments underneath */
    blogEntry: function(entry) {
        // var layout = this.getOption('layout');
        // layout.triggerMethod('show:blog:entry', entry);
        console.log('we are on BLOG page');
    }
});

var Router = Marionette.AppRouter.extend({
    appRoutes: {
        '': 'index',
        'blog': 'blogEntry'
    },

    /** Initialize our controller with the options passed into the application,
     such as the initial posts list.
     */
    initialize: function() {
        this.controller = new Controller({
            initialData: this.getOption('initialData')
    });
    }
});

module.exports = Router;