'use strict';

const Transformer = require('./src/transform');
const Reporter = require('./src/report');

const flags = process.argv.reduce((memo, arg, i) => {
    if (arg.match('--')) {
        let key = arg.replace('--', '');
        memo[key] = true;
    }
    return memo;
}, {});

const transformer = Transformer();
const reporter = Reporter({ verbose: flags.verbose });

process.stdin
    .pipe(transformer)
    .pipe(reporter)
    .pipe(process.stdout);
