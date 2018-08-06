var data = require("../schema.json");

/**
 *  @class application schema service
 */
var Schema = {

    /**
     * Returns name of handsontable editor for specified element
     * @method getEditor
     * @param {number} index
     * @returns {string}
     */
    getEditor: function(index) {

        switch (data.properties[index].type) {
        case "id":
            return "inputEditor";
        case "string":
            return "inputEditor";
        case "number":
            return "inputEditor";
        case "select":
            return "selEditor";
        case "obj":
            return "objEditor";
        default:
            return "inputEditor";
        }
    },

    /**
     * Returns porperties of schema as Object
     * @method getProperties
     * @returns {Object}
     */
    getProperties: function() {
        var p = {};
        for (var key in data.properties) {
            p[key] = _.clone(data.properties[key]);
            p[key].title = data.properties[key].value;
            p[key].editor = this.getEditor(key);
        }
        return p;
    },

    /**
     * Returns porperties of schema as Array
     * @method getPropertiesAsArray
     * @returns {Array}
     */
    getPropertiesAsArray: function() {
        return _.values(this.getProperties());
    },

    /**
     * Returns an array of elements on which the element with the index depends
     * @method getMasterElements
     * @param {Number} index
     * @returns {Array}
     */
    getMasterElements: function(index) {
        var els = [];
        
        for (var key in data.properties[index].dep) {
            for (var key2 in data.properties) {
                if (data.properties[key2].value === data.properties[index].dep[key].target) {
                    els[index] = {
                        key: data.properties[index].value,
                        target: data.properties[index].dep[key].target,
                        action: data.properties[index].dep[key].action,
                    };
                }
            }
        }
        return els;
    },

    /**
     * Returns an array of elements that depend on the element with the index
     * @method getSlaveElements
     * @param {Number} index
     * @returns {Array}
     */
    getSlaveElements: function(index) {
        var els = [];
        for (var key in data.properties) {
            for (var key2 in data.properties[key].dep) {
                if (data.properties[index].value === data.properties[key].dep[key2].target) {
                    els[key] = {
                        key: data.properties[key].value,
                        target: data.properties[key].dep[key2].target,
                        action: data.properties[key].dep[key2].action,
                    };
                }
            }
        }
        return els;
    },


    /**
     * Adds dependency method
     */
    updateSeasons: function(value, onDependsValue) {
        if (onDependsValue === "Movie") {
            return "";
        } else if (onDependsValue === "TV series") {
            return value || 1;
        }
        return null;
    },

    /**
     * Adds validators to jquery-validator
     */
    setupValidators: function() {
        $.validator.addMethod("releaseDate", function(value) {
            if (!value || value.length != 4 || 1895 > value || value > (new Date()).getFullYear()) {
                return false;
            }
            return true;

        }, "Please specify the correct date of release");
          
    }
};

module.exports = Schema;
