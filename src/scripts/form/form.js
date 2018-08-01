var Marionette = require("backbone.marionette");

var IdView = require("../formElements/id/id");
var InputView = require("../formElements/input/input");
var SelectView = require("../formElements/select/select");
var ObjView = require("../formElements/obj/obj");

var schema = require("../schema.json");

var FormView = Marionette.LayoutView.extend({
    tagName: "div",
    className: "mainForm",
    template: require("./movieForm.html"),

    templateHelpers: function() {
        return {
            buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie",
            els: this.els
        };
    },

    initialize: function(){
        this.els = [];
        for (var key in schema.properties) {
            var elementView = this.selectingView(schema.properties[key], this.model.attributes);
            if(elementView){
                this.els.push({
                    key: schema.properties[key].value,
                    type: schema.properties[key].type,
                    validation: schema.properties[key].validation,
                    dep:  schema.properties[key].dep,
                    view: elementView
                });
            }
        }
        this.els.forEach(function(el) {
            this.appendRegion(el.key);
        }.bind(this));
    },

    events: {
        "submit": "onSubmit"
    },

    modelEvents: {
        change: "render"
    },

    onShow: function() {
        var vOptions = {
            debug: true, 
            rules: {},
        };
        this.els.forEach(function(el) {
            this.regionManager.get(this.getRegionName(el.key)).show(el.view);
            _.merge(vOptions, el.view.getValidationOptions());
        }.bind(this));
        this.$("#movieForm").validate(vOptions);
    },

    appendRegion: function(key){
        var rName = this.getRegionName(key);
        this.addRegion(rName, "#" + rName);
    },

    getRegionName: function(key){
        return "form-el-" + key;
    },

    selectingView: function (properties, vals) {
        var options = {
            key: properties.value,
            value: vals[properties.value],
            validation: properties.validation,
            dep: properties.dep
        };

        switch (properties.type) {
        case "id":
            options.value = Math.random();
            return new IdView({options});
        case "string":
            return new InputView({options});
        case "number":
            return new InputView({options});
        case "select":
            options.options = properties.options;
            return new SelectView({options});
        case "obj":
            options.properties = properties.properties;
            return new ObjView({model: this.model, options});
        default:
            console.log("something when wrong");
        }
    },
    
    onSubmit: function () {
        if (!this.$("#movieForm").valid()) {
            return;
        }
        var data = {};
        this.els.forEach(function(el) {
            data[el.key] = el.view.getValue();
        });
        this.model.set(data, {validate: true});

        if (this.model.isValid()) {
            Marionette.triggerMethodOn(this.getOption("layout"),
                (this.getOption("mode") ? this.getOption("mode") : "add") + ":movie:item",
                this.toObject(),
                this.model.cid
            );
        }
    },

    toObject: function () {
        return this.model.pick(this.els.map(function(el) {return el.key;}));
    }
});

module.exports = FormView;
