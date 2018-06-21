var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var ToDoModel = require('../models/todo');


var ToDo = Marionette.LayoutView.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: require('../html/todoitem.jst')
});


var TodoList = Marionette.CompositeView.extend({
    el: '#app-hook',
    className: 'list-group',
    template: require('../html/todolist.jst'),

    childView: ToDo,
    childViewContainer: 'ul',

    ui: {
        author: '#id_author',
        form: 'form',
        movieName: '#id_movieName'
    },

    triggers: {
        'submit @ui.form': 'add:todo:item'
    },

    collectionEvents: {
        add: 'itemAdded'
    },

    modelEvents: {
        change: 'render'
    },

    onAddTodoItem: function() {
        this.model.set({
            author: this.ui.author.val(),
            movieName: this.ui.movieName.val()
        }, {validate: true});

        var items = this.model.pick('author', 'movieName');
        this.collection.add(items);
    },

    itemAdded: function() {
        this.model.set({
            author: '',
            movieName: ''
        });
    }
});


module.exports = TodoList;