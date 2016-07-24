const test = require('ava');
const Reporter = require('../src/report');

test.cb('reports the data throughput', t => {
    const reporter = Reporter();

    reporter.write({ lines: 3, bytes: 21, elapsed: 0.011 });
    reporter.on('data', data => {
        t.true(data === '1909.091 bytes/sec\n');
        t.end(); 
    });
});

test.cb('respects the verbose flag', t => {
    const reporter = Reporter({ verbose: true });

    reporter.write({ lines: 3, bytes: 21, elapsed: 0.011 });
    reporter.on('data', data => {
        t.true(data === 'Hey this is the verbose version: rate 1909.091 bytes/sec\n');
        t.end(); 
    });
});
