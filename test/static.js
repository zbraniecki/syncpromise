const SyncPromise = require('../src/syncpromise');

var assert = require('chai').assert;

describe('SyncPromise.resolve', function() {
  it('should return resolved value of the promise', function() {
    const p = SyncPromise.resolve('foo');

    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo');
  });
});

describe('SyncPromise.reject', function() {
  it('should return rejected reason of the promise', function() {
    const p = SyncPromise.reject('foo');

    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo');
  });
});
