/**
 * Duration cell renderer
 * @param {Object} instance Handsontable instance
 * @param {Element} td Table cell where to render
 * @param {Number} row 
 * @param {Number} col 
 * @param {String|Number} prop Row object property name
 * @param value Value to render (remember to escape unsafe HTML before inserting to DOM!)
 */
function durationRenderer(instance, td, row, col, prop, value) {
    td.innerHTML = value.value + " " + value.type;

    return td;
}

module.exports = durationRenderer;
