const { Transform } = require('stream');

/**
 * Main Transformer factory. Returns a new copy of the Transformer stream
 */
const transform = function () {
    // Log the start time for elapsed time recording
    const start = new Date();

    return new Transform({

        objectMode: true,

        transform(chunk, encoding, callback) {
            // Transform the chunk into a string
            const data = chunk.toString('utf8');
            const elapsed = (new Date() - start) / 1000;
    
            // Push the data onto the readable queue as an object
            this.push({ 
                bytes: chunk.length,
                lines: data.split(/\n/).length,
                elapsed: elapsed
            });
//             callback();
        }
    
    });
};


module.exports = transform;
