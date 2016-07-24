const test = require('ava');
const Transformer = require('../src/transform');

test.beforeEach(t =>{
    t.context.transformer = Transformer();
    t.context.transformer.write('testing\ntesting123');
});

test.cb('records the number of lines', t => {    
    t.context.transformer.on('data', data => {
        t.true(data.lines === 2);
        t.end();
    });
});

test.cb('records the length of bytes of the input buffer', t => {
    t.context.transformer.on('data', data => {
        t.true(data.bytes === 18);
        t.end(); 
    });
});

test.cb.skip('records the elapsed time', t => {
    setTimeout(() => {
        t.context.transformer.on('data', data => {
            console.log(data);        
            t.true(data.elapsed > 0);
        });
        t.context.transformer.write('testing\ntesting123\ntestingABC');
        t.end();
    }, 100);
})
