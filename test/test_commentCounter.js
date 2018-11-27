const fs = require('fs');
const assert = require("chai").assert;
const expect = require("chai").expect;
const checkValidFilename = require("../lib/checkValidFilename");
const scanFileContents = require("../lib/scanFileContents");

describe("checkValidFilename", function () {
    it("should return true if it's a JavaScript file", function () {
        let filename = "test.js";
        let result = checkValidFilename(filename);
        assert.isTrue(result);
    });

    it("should return false for a Java file", function () {
        let filename = "badidea.java";
        assert.isFalse(checkValidFilename(filename));
    });
});

describe("scanFileContents", function () {
    it("scan method should return a string", function () {
        expect(scanFileContents.scan("/test/testdata.js")).to.be.a('string');
    });

    let file = fs.readFileSync(`./test/testdata.js`, 'utf8');
    
    it("getTotalLinesCount method should return 25", function () {
        expect(scanFileContents.getTotalLinesCount(file)).to.eql(25);
    });
    it("getSingleCommentsCount method should return 6", function () {
        expect(scanFileContents.getSingleCommentsCount(file)).to.eql(6);
    });
    it("getBlockLineComments method should return 3", function () {
        expect(scanFileContents.getBlockLineComments(file)).to.eql(3);
    });
    it("getBlockCommentInternalRowCount method should return 14", function () {
        expect(scanFileContents.getBlockCommentInternalRowCount(file)).to.eql(14);
    });
    it("getTODOs method should return 2", function () {
        expect(scanFileContents.getTODOs(file)).to.eql(2);
    });
});