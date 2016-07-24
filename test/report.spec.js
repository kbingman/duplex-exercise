const test = require('ava');
const Reporter = require('../src/report');

test.beforeEach(t => {
    t.context.reporter = Reporter();
    t.context.reporter.write({ lines: 3, bytes: 21, elapsed: 0.011 });
});

test.cb('reports the data throughput', t => {
    t.context.reporter.on('data', data => {
        t.true(data === '1909.091 bytes/second\n');
        t.end(); 
    });
});
