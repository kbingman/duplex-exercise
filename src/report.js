const { Transform } = require('stream');

/**
 * Simple utility function to round numbers
 */
const round = function (number, places = 3) {
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
};

/** 
 * Main reporter function 
 */
const reporter = function (options) {
    const { verbose } = options || {};

    return new Transform({

        objectMode: true,

        write(chunk, encoding, callback) {
            const rate = round(chunk.bytes / chunk.elapsed);
            let text = `${rate} bytes/sec\n`;
            if (verbose) {
                text = `${chunk.lines} lines in total. Growth rate: ${rate} bytes/sec. Total bytes: ${chunk.bytes}.\n`;
            }

            this.push(text);
//             callback();
        }
    });
};

module.exports = reporter;
