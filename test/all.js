const SyncPromise = require('../src/syncpromise');

var assert = require('chai').assert;

describe('SyncPromise.all', function() {
  it('should return a SyncPromise with a list of values when succeeded', function() {
    const p = SyncPromise.all([
      new SyncPromise((resolve, reject) => {resolve('foo')}),
      new SyncPromise((resolve, reject) => {resolve('foo2')}),
    ]);

    assert.strictEqual(p.state, 'fulfilled');
    assert.deepEqual(p.value, ['foo', 'foo2']);
  });

  it('should return a SyncPromise with a list of values when succeeded 2', function() {
    const p = SyncPromise.all([
      'foo',
      'foo2',
    ]);

    assert.strictEqual(p.state, 'fulfilled');
    assert.deepEqual(p.value, ['foo', 'foo2']);
  });

  it('should return rejected SyncPromise if at least one rejects', function() {
    const p = SyncPromise.all([
      new SyncPromise((resolve, reject) => {resolve('foo')}),
      new SyncPromise((resolve, reject) => {reject('foo2')}),
    ]);

    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo2');
  });

  it('should return first rejected SyncPromise if at many reject', function() {
    const p = SyncPromise.all([
      new SyncPromise((resolve, reject) => {reject('foo')}),
      new SyncPromise((resolve, reject) => {reject('foo2')}),
    ]);

    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo');
  });
});
