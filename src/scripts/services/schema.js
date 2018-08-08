var data = require("../schema.json");
var dataCountries = require("../schema.countries.json");

/**
 *  @class application schema service
 */
var Schema = {

    /**
     * Returns default values for schema
     * @method getDefaults
     * @return {Object}
     */
    getDefaults: function() {
        var defaults = {};
        for (var key in data.properties) {
            var value = data.properties[key].value;
            defaults[value]= data.properties[key].default || "";
        }
        return defaults;
    },

    /**
     * Converts data object to array according to schema
     * @method getDataAsArray
     * @param {Object} values
     * @returns {Array}
     */
    getDataAsArray: function(values) {
        var result = [];
        for (var key in data.properties) {
            result[Number(key)] = values[data.properties[key].value];
        }

        return result;
    },

    /**
     * Returns index of element in schema by name
     * @method getIndexByValue
     * @param {string} value
     * @return {number}
     */
    getIndexByValue: function(value) {
        for (var key in data.properties) {
            if (data.properties[key].value === value) {
                return Number(key);
            }
        }
        return null;
    },

    /**
     * Returns name of element in schema by index
     * @method getValueByIndex
     * @param {number} index
     * @return {string}
     */
    getValueByIndex: function(index) {
        return data.properties[index].value;
    },
    
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
     * Returns array of data for each column of table according to schema and in depending from defining values
     * @method getProps
     * @param {Array} definingValues
     * @returns {Array}
     */
    getProps: function(definingValues) {

        function property(attr) {
            return function(model, value) {
                if (_.isUndefined(value)) {
                    return model.get(attr);
                }
                model.set(attr, value);
            };
        }
    
        function validator() {
            return function (value, callback) {
                callback($("#hotEditorForm").valid());
            };
        }
    
        var props = this.getPropertiesAsArray().map(function(el) {
            return _.merge(el, {
                key: el.value,
                type: el.type,
                data: property(el.value),
                validator: (el.validation) ? validator() : undefined
            });
        });

        if (Array.isArray(definingValues)) {
            props.forEach(function(el, index) {
                var elsToUpdate = this.getSlaveElements(index);
                elsToUpdate.forEach(function(slavEl) {
                    if (slavEl.type === "select") {
                        var elValue = definingValues[this.getIndexByValue(el.key)];
                        var targetValue = definingValues[this.getIndexByValue(slavEl.target)];
                        var dependencyResult = this[slavEl.action](elValue, targetValue);
                        if (Array.isArray(dependencyResult)) {
                            props[this.getIndexByValue(slavEl.key)].options = dependencyResult;
                        }
                    }
                }.bind(this));
            }.bind(this));
        }

        return props;
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
                        type: data.properties[index].type,
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
                        type: data.properties[key].type,
                        target: data.properties[key].dep[key2].target,
                        action: data.properties[key].dep[key2].action,
                    };
                }
            }
        }
        return els;
    },

    /**
     * Sets options in schema
     * @method set
     * @param {string} value
     * @param {Object} options
     */
    set: function(value, options) {
        for (var key in data.properties) {
            if (data.properties[key].value === value) {
                _.merge(data.properties[key], options);
            }
        }
    },

    /**
     * Dependency method for Seasons
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
     * Dependency method for MovieMaker
     */
    updateMovieMaker: function(value, onDependsValue) {
        return dataCountries[onDependsValue];
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
