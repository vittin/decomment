'use strict';

// Tests for single-line comments;

var decomment = require('../lib');
var os = require('os');
var LB = os.EOL;

describe("Single:", function () {

    describe("empty comment", function () {
        it("must return an empty string", function () {
            expect(decomment("//")).toBe("");
            expect(decomment("/\/text")).toBe(""); // '/\/' = '//'
        });
    });

    describe("multiple empty comments", function () {
        var out1 = decomment("//" + LB + "//" + LB);
        var out2 = decomment("//" + LB + "//");
        it("must return an empty string", function () {
            expect(out1).toBe("");
            expect(out2).toBe("");
        });
    });

    describe("non-empty comment", function () {
        var out = decomment("// text");
        it("must return an empty string", function () {
            expect(out).toBe("");
        });
    });

    describe("non-empty multiple comments", function () {
        var out1 = decomment("// text1" + LB + "// text2");
        var out2 = decomment("// text1" + LB + "// text2" + LB);
        it("must return an empty string", function () {
            expect(out1).toBe("");
            expect(out2).toBe("");
        });
    });

    describe("with a prefix", function () {
        it("must return the prefix", function () {
            expect(decomment(LB + "//")).toBe(LB);
            // spaces and tabs are removed from empty lines:
            expect(decomment(" \t \t")).toBe("");
            expect(decomment("text//comment" + LB)).toBe("text" + LB);
        });
    });

    describe("with line-break suffix", function () {
        var out = decomment("//" + LB);
        it("must return an empty string", function () {
            expect(out).toBe("");
        });
    });

    describe("with multiple line-break suffixes", function () {
        var out = decomment("//" + LB + LB);
        it("must return a single line break", function () {
            expect(out).toBe(LB);
        });
    });

    describe("with preceding text", function () {
        var out1 = decomment("Text//");
        var out2 = decomment(LB + "Text//");
        var out3 = decomment("Text" + LB + "//");
        var out4 = decomment("Text//" + LB + "Here");
        it("must return the preceding text", function () {
            expect(out1).toBe("Text");
            expect(out2).toBe(LB + "Text");
            expect(out3).toBe("Text" + LB);
            expect(out4).toBe("Text" + LB + "Here");
        });
    });

    describe("with empty text prefix", function () {
        var out1 = decomment("''//");
        var out2 = decomment("\"\"//");
        var out3 = decomment("``//");
        it("must leave only the comment", function () {
            expect(out1).toBe("''");
            expect(out2).toBe("\"\"");
            expect(out3).toBe("``");
        });
    });

    describe("with empty text suffix", function () {
        var out1 = decomment("//" + LB + "''");
        var out2 = decomment("//" + LB + "\"\"");
        var out3 = decomment("//" + LB + "``");
        it("must leave only the comment", function () {
            expect(out1).toBe("''");
            expect(out2).toBe("\"\"");
            expect(out3).toBe("``");
        });
    });

    describe("comments inside text", function () {
        var out = decomment("'//Text'");
        it("must leave only the comment", function () {
            expect(out).toBe("'//Text'");
        });
    });

    describe("spaces", function () {
        describe("before text", function () {
            var out = decomment("\t \tText");
            it("must preserve the spaces", function () {
                expect(out).toBe("\t \tText");
            });
        });
        describe("after text", function () {
            var out = decomment("Text\t \t");
            it("must preserve the spaces", function () {
                expect(out).toBe("Text\t \t");
            });
        });
        describe("complex case", function () {
            var out = decomment("a // comment" + LB + "\tb // comment" + LB + "c//end");
            it("must keep spaces correctly", function () {
                expect(out).toBe("a " + LB + "\tb " + LB + "c");
            });
        });
    });

    describe("multiple line breaks that follow", function () {
        it("must be removed", function () {
            expect(decomment("//text" + LB + LB + "end", {trim: true})).toBe("end");
            expect(decomment("//text" + LB + "\t" + LB + "end", {trim: true})).toBe("end");
        });
    });
});
