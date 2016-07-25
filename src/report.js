'use strict';

const Transform = require('stream').Transform;

/**
 * Simple utility function to round numbers
 */
const round = function (number, places) {
    places = places || 3;
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
};

/**
 * Main reporter function
 */
const reporter = function (options) {
    options = options || {}
    const verbose = options.verbose;

    return new Transform({

        objectMode: true,

        write(chunk, encoding, callback) {
            const rate = round(chunk.bytes / chunk.elapsed);
            let text = `${rate} bytes/sec\n`;
            if (verbose) {
                text = `${chunk.lines} lines in total. Growth rate: ${rate} bytes/sec. Total bytes: ${chunk.bytes}.\n`;
            }

            this.push(text);
        }
    });
};

module.exports = reporter;
