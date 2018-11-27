checkValidFilename = (fname) => {
    // return false if system file or missing extension
    let fileExt = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
    if (fileExt !== 'js') {
        return false;
    }
    return true;
}

module.exports = checkValidFilename;