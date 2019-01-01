const { minify } = require("../dist/index");
const { cmd } = require("faqtor");

const testFile = "./test.js";
const testOutput = "./test.min.js";

module.exports = {
    minify: minify(testFile, testOutput).factor(),
    clean: cmd(`rimraf ${testOutput}`).factor(testOutput)
}