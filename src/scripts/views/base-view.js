'use strict';

export default Backbone.View.extend({

    close () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    }
});
