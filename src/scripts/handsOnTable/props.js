var props = (function() {
    function property(attr) {
        return function(model, value) {
            if (_.isUndefined(value)) {
                return model.get(attr);
            }
            model.set(attr, value);
        };
    }

    return [
        {key: "id", data: property("id")},
        {key: "author", data: property("author")},
        {key: "movieName", data: property("movieName")},
        {key: "releaseDate", data: property("releaseDate")},
        {key: "typeOfFilm", data: property("typeOfFilm")},
    ];
})();

module.exports = props;
