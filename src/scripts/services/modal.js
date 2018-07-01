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

var appModalService = ModalService.extend({
    LayoutView,
    AlertView,
    ConfirmView,
    PromptView,

    _prepareViewClasses() {
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

    setup: function(options = {}) {
        if(options) {
            _.extend(this, _.pick(options, viewClassesNames.concat(["el", "container"])));
        }
        this._prepareViewClasses();
    },

    start() {
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

    render(view) {
        this.contentRegion.show(view);
    },

    remove() {
        this.contentRegion.empty();
    },

    animateIn() {
        return new ES6Promise(function(resolve) {
            this.once("modal:show", resolve);
            this.layout.$el.modal("show");
        }.bind(this));
    },

    animateOut() {
        return new ES6Promise(function(resolve) {
            this.once("modal:hide", resolve);
            this.layout.$el.modal("hide");
        }.bind(this));
    },

    animateSwap(oldView, newView) {
        oldView.$el.hide();
        newView.$el.show();
    }
});

var modals = new appModalService();
modals.initialize();

module.exports = modals;
