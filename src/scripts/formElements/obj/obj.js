var Marionette = require("backbone.marionette");

var IdView = require("../id/id");
var InputView = require("../input/input");
var SelectView = require("../select/select");

var ObjView = Marionette.LayoutView.extend({
    tagName: "div",
    className: "elementForm",
    
    template: require("./obj.html"),
    templateHelpers: function() {
        return {
            key: this.key,
            els: this.els
        };
    },

    initialize: function(data){
        this.init(data.options);
    },

    init: function(options){
        this.els = [];
        this.key = options.key;
        var properties = options.properties;
        for (var key in properties) {
      
            var elementView = this.selectingView(properties[key], options.value);
            if(elementView){
                this.els.push({
                    key: properties[key].value,
                    type: properties[key].type,
                    view: elementView
                });
            }
        }
        this.els.forEach(function(el) {
            this.appendRegion(el.key);
        }.bind(this));
    },

    onShow: function() {
        this.els.forEach(function(el) {
            this.regionManager.get(this.getRegionName(el.key)).show(el.view);
        }.bind(this));
    },

    appendRegion: function(key){
        var rName = this.getRegionName(key);
        this.addRegion(rName, "#" + rName);
    },

    getRegionName: function(key){
        return "obj-el-" + this.key + "-" + key;
    },

    selectingView: function (properties, vals) {
        var options = {
            key: properties.value,
            value: vals[properties.value]
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
            return new ObjView({options});
        default:
            console.log("something went wrong");
        }
    },

    set: function (vals) {
        this.els.forEach(function(el) {
            if (vals.value[el.key]) {
                el.view.set({ key: el.key, value: vals.value[el.key] });
            }
        });
    },

    getValue: function () {
        var data = {};
        this.els.forEach(function(el) {
            data[el.key] = el.view.getValue();
        });

        return data;
    }
});

module.exports = ObjView;
