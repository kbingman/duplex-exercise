const { Transform } = require('stream');

const round = function (number, places = 3) {
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
};

const reporter = function () {
    return new Transform({
    
        objectMode: true,
    
        write(chunk, encoding, callback) {
            const rate = round(chunk.bytes / chunk.elapsed);
            const text = rate + ' bytes/second\n';
            this.push(text);
//             callback();
        }
    });
};


module.exports = reporter;
