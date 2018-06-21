var Marionette = require('backbone.marionette');
var TodoView = require('./views/layout');
var ToDoModel = require('./models/todo');


var initialData = [
    {author: 'Spilberg', movieName: 'Cool movie about Marionette'},
    {author: 'Tom Kruz', movieName: 'Some coding'}
];

var app = new Marionette.Application({
    onStart: function(options) {
        var todo = new TodoView({
            collection: new Backbone.Collection(options.initialData),
            model: new ToDoModel()
        });
        todo.render();
        todo.triggerMethod('show');
    }
});

app.start({initialData: initialData});