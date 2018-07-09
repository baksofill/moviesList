/* globals describe: false, it: false, beforeEach: false */
var assert = require("chai").assert;

var MovieModel = require("../../src/scripts/movies-model");

describe("Todo Model", function() {
    describe("Initialization", function() {

        beforeEach(function() {
            this.m = new MovieModel();
        });

        it("should default the author to an empty string", function() {
            assert.equal(this.m.get("author"), "");
        });

        it("should default the movieName to an empty string", function() {
            assert.equal(this.m.get("movieName"), "");
        });

        it("should default the releaseDate to an empty string", function() {
            assert.equal(this.m.get("releaseDate"), "");
        });

        it("should default the typeOfFilm to an empty string", function() {
            assert.equal(this.m.get("typeOfFilm"), "");
        });

        it("should default the duration to an object", function() {
            assert.deepEqual(this.m.get("duration"), {value: "", type: ""});
        });
    });

    describe("Validation", function() {
        beforeEach(function() {
            this.m = new MovieModel();
        });

        it("must be set the author", function() {
            var errors = this.m.validate({});
            assert.property(errors, "author");
            assert.typeOf(errors["author"], "string", "error message");
        });

        it("must be set the movieName", function() {
            var errors = this.m.validate({});
            assert.property(errors, "movieName");
            assert.typeOf(errors["movieName"], "string", "error message");
        });

        it("passing validation", function() {
            var errors = this.m.validate({author: "a", movieName: "b"});
            assert.isUndefined(errors);
        });
    });
});
