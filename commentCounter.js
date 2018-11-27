const fs = require('fs');
const cfonts = require('cfonts');
const readlineSync = require('readline-sync');
const checkValidFilename = require('./lib/checkValidFilename');
const scanFileContents = require('./lib/scanFileContents');

let outputArray = [];

processFiles = (filesToScan) => {
    for (let i = filesToScan.length - 1; i >= 0; i--) {
        if (!checkValidFilename(filesToScan[i])) {
            console.log(`Sorry, I can only analyze JavaScript files. Skipping ${filesToScan[i]}`);
            filesToScan.splice(i, 1);
        } else {
            // make sure the file actually exists
            try {
                fs.statSync(`./${filesToScan[i]}`);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    console.log(`Sorry, I couldn't find ${filesToScan[i]}. Skipping...`);
                    filesToScan.splice(i, 1)
                }
            }
        }
    }

    if (filesToScan.length) {
        console.log(`\nAnalyzing ${filesToScan.length} file${filesToScan.length !== 1 ? 's' : ''}...\n`);
    
        filesToScan.forEach((file) => {
            let result = scanFileContents.scan(file);
            outputArray.push(result);
        });
    
        console.log(outputArray.join(''));
    } else {
        console.log('\nI couldn\'t find any files to check-in 😨\n');
    }
    outputArray.length ? askSaveResults() : askStartOver();
}

askSaveResults = () => {
    if (readlineSync.keyInYN('Do you want to save these results?')) {
        let timestamp = new Date().toLocaleString();
        fs.writeFile(`checkin-results-${timestamp}.md`, outputArray.join(''), (err) => {
            if (err) {
                throw err;
            }
            console.log(`Results saved as checkin-results-${timestamp}.md \n`);
            askStartOver();
        });
    } else {
        askStartOver();
    }
}

askStartOver = () => {
    if (readlineSync.keyInYN('Do you have more file(s) to check in?')) {
        checkMoreFiles();
    } else {
        console.log('Exiting...')
        process.exit();
    }
}

checkMoreFiles = () => {
    outputArray = [];
    let input = readlineSync.question('Please enter the additional filename(s) to check: ');
    processFiles(input.split(' '));
}

cfonts.say('comment\ncounter', {
    font: 'block',
    align: 'left',
    colors: ['blueBright', 'red'],
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
});

let initialFiles = process.argv.slice(2);
processFiles(initialFiles);