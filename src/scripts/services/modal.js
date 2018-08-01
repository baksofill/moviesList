var Marionette = require("backbone.marionette");
var _ = require("underscore");
var ModalView = require("./modal/modal");
var LayoutView = require("./modal/layout");
var AlertView = require("./modal/alert");
var ConfirmView = require("./modal/confirm");
var PromptView = require("./modal/prompt");

var ModalService = require("backbone-service-modals");
var PromisePolyfill = require("es6-promise");

var ES6Promise = PromisePolyfill.Promise;

var viewClassesNames = ["LayoutView", "AlertView", "PromptView", "ConfirmView"];

/**
 *  @class application modal service
 */
var appModalService = ModalService.extend({
    LayoutView: LayoutView,
    AlertView: AlertView,
    ConfirmView: ConfirmView,
    PromptView: PromptView,

    _prepareViewClasses: function() {
        viewClassesNames.forEach(function(className) {
            var ViewClass = this[className];
            if (typeof ViewClass !== "function") {
                throw new Error("ModalService: expected " + className + " to be a template function or View class");
            }
            if (!(ViewClass.prototype instanceof Marionette.View)) {
                ViewClass = ModalView.extend({
                    template: ViewClass
                });
                this[className] = ViewClass;
            }
        }.bind(this));
    },

    /**
     * @method setup
     * @param {Object} options
     */
    setup: function(options) {
        options = options || {};
        _.extend(this, _.pick(options, viewClassesNames.concat(["el", "container"])));
        this._prepareViewClasses();
    },

    /**
     * @method start - initializing modal service
     */
    start: function() {
        var layout = this.layout = new this.LayoutView();

        if (!this.container) {
            if (!this.el) throw new Error("ModalService: container or el options must be defined");

            this.container = new Marionette.Region({
                el: this.el
            });
        }
        
        this.container.show(layout);

        layout.$el.modal({
            show: false,
            backdrop: "static"
        });

        layout.$el.on({
            "shown.bs.modal": function(e) {
                this.trigger("modal:show", e);
            }.bind(this),
            "hidden.bs.modal": function(e) {
                this.trigger("modal:hide", e);
            }.bind(this)
        });

        this.contentRegion = new Marionette.Region({
            el: layout.$(".modal-content")
        });
    },

    /**
     * @method render
     * @param {Backbone.View} view
     */
    render: function(view) {
        view.render();
        Marionette.triggerMethodOn(view, "before:show", view, this.contentRegion);
        view._parent = this.contentRegion;
        view._parent.el.appendChild(view.el);
        Marionette.triggerMethodOn(view, "show", view, this.contentRegion);
    },

    /**
     * @method remove
     * @param {Backbone.View} view
     */
    remove: function(view) {
        view._parent.el.removeChild(view.el);
    },

    /**
     * @method animateIn
     */
    animateIn: function() {
        return new ES6Promise(function(resolve) {
            this.once("modal:show", resolve);
            this.layout.$el.modal("show");
        }.bind(this));
    },

    /**
     * @method animateOut
     */
    animateOut: function() {
        return new ES6Promise(function(resolve) {
            this.once("modal:hide", resolve);
            this.layout.$el.modal("hide");
        }.bind(this));
    },

    /**
     * @method animateSwap
     * @param {Backbone.View} oldView
     * @param {Backbone.View} newView
     */
    animateSwap: function(oldView, newView) {
        oldView.$el.hide();
        newView.$el.show();
    }
});

var modals = new appModalService();
modals.initialize();

module.exports = modals;
