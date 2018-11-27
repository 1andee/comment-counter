const fs = require('fs');

module.exports = {

    scan: function(filePath) {
        let text = fs.readFileSync(`./${filePath}`, 'utf8');

        return `\nResults for ${filePath}:

            Total # of lines: ${this.getTotalLinesCount(text)}
            Total # of comment lines: ${this.getSingleCommentsCount(text) + this.getBlockCommentInternalRowCount(text)}
            Total # of single line comments: ${this.getSingleCommentsCount(text)}
            Total # of comment lines within block comments: ${this.getBlockCommentInternalRowCount(text)}
            Total # of block line comments: ${this.getBlockLineComments(text)}
            Total # of TODO’s: ${this.getTODOs(text)}
        `;
    },

    getTotalLinesCount: function(text) {
        return text.split('\n').length;
    },

    getSingleCommentsCount: function(text) {
        return text.split("//").length - 1;
    },

    getBlockLineComments: function(text) {
        return text.split("/*").length - 1;
    },

    getBlockCommentInternalRowCount: function(text) {
        let arr = text.split("/*");
        let rowCount = 0;
        for (let i = 1; i < arr.length; i++) {
            let endBlockCommentPos = arr[i].indexOf('*/');
            let singleBlockComment = arr[i].substring(0, endBlockCommentPos);
            rowCount += singleBlockComment.split("\n").length;
        };

        return rowCount;
    },

    getTODOs: function(text) {
        return text.split("TODO:").length - 1;
    }
}