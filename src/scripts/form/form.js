var Marionette = require("backbone.marionette");

var IdView = require("../formElements/id/id");
var InputView = require("../formElements/input/input");
var SelectView = require("../formElements/select/select");
var $ = require("jquery");

var schema = require("../schema.json");
var schemaService = require("../services/schema");

var FormView = Marionette.LayoutView.extend({
    tagName: "form",
    className: "mainForm",
    template: require("./movieForm.html"),

    initialize: function(){
        this.els = [];
        for (var key in schema.properties) {
            if(schema.properties[key].type !== "obj"){
                var options, dependencies;
                var typeOfElement = schema.properties[key].type;
                var value = schema.properties[key].value;
                schema.properties[key].dep ? dependencies = schema.properties[key].dep : dependencies = {};
                schema.properties[key].options ? options = schema.properties[key].options : options = [];
                var elementView = this.selectingView(typeOfElement, value, options, dependencies);
                if(elementView){
                    this.els.push({
                        key: schema.properties[key].value,
                        type: schema.properties[key].type,
                        view: elementView
                    });
                }
            }
        }
        this.els.forEach(function(el, index) {
            this.appendRegion(index);
        }.bind(this));
    },

    templateHelpers: function() {
        return {
            buttonTitle: (this.getOption("mode") === "edit") ? "Save" : "Add Movie",
            els: this.els
        };
    },

    events: {
        "submit": "onSubmit"
    },

    modelEvents: {
        change: "render"
    },

    onShow: function() {
        this.els.forEach(function(el, index) {
            this.regionManager.get(this.getRegionName(index)).show(el.view);
        }.bind(this));
        // debugger;
        // var validator = $(".mainForm").validate();
        // validator.element( "#author" );
        // $(".mainForm").validate({
        //     rules: {
        //         author: {
        //             required: true,
        //             normalizer: function(value) {
        //                 return $.trim(value);
        //             }
        //         },
        //         movieName: {
        //             required: true,
        //             minlength: 3
        //         }
        //     },
        //     showErrors: function () {
        //         debugger;
        //     },
        //     messages: {
        //         author: {
        //             required: "please fill this fild"
        //         },
        //         movieName: {
        //             required: "please fill this fild",
        //             minlength: " min length is 3"
        //         }
        //
        //     }
        // });
    },

    appendRegion: function(index){
        var rName = this.getRegionName(index);
        this.addRegion(rName, "#" + rName);
    },

    getRegionName: function(index){
        return "elview" + index;
    },

    selectingView: function (type, value, optionsArray, dep) {
        var myVal = this.model.attributes[value];

        switch (type) {
        case "id":
            return new IdView({options: {key: value, value: Math.random()}});
        case "string":
            return new InputView({options: {key: value, value: myVal, dep: dep}});
        case "number":
            return new InputView({options: {key: value, value: myVal, dep: dep}});
        case "select":
            return new SelectView( {options: {key: value, value: myVal, options: optionsArray, dep: dep}});
        case "multiple":
            return new InputView({options: {key: value, value: myVal, dep: dep}});
        default:
            console.log("something when wrong");
        }
    },
    
    onSubmit: function () {
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
        } else {
            console.log("invalid form data");
        }
    },

    toObject: function () {
        return this.model.pick(this.els.map(function(el) {return el.key;}));
    }
});

module.exports = FormView;
