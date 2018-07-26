function durationRenderer(instance, td, row, col, prop, value, cellProperties) {
    td.innerHTML = value.value + " " + value.type;

    return td;
}

module.exports = durationRenderer;
