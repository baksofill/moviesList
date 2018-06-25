var Marionette = require('backbone.marionette');


var FormView = Marionette.LayoutView.extend({
    tagName: 'form',
    template: require('./movieForm.jst'),

    triggers: {
        submit: 'add:movie:item'
    },

    modelEvents: {
        change: 'render'
    },

    ui: {
        author: '#id_author',
        movieName: '#id_movieName'
    }
});

module.exports = FormView;