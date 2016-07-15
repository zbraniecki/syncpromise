const SyncPromise = require('../src/syncpromise');

const assert = require('chai').assert;

describe('SyncPromise.prototype.then -> new SyncPromise', function() {
  it('should return then\'s resolve value if then resolves', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')}).then(() => {
      return new SyncPromise((resolve, reject) => {resolve('foo2')});
    });
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo2');
  });

  it('should return then\'s reject reason if then rejects', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')}).then(() => {
      return new SyncPromise((resolve, reject) => {reject('foo2')});
    });
    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo2');
  });

  it('should return then\'s resolve value if then resolves', function() {
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(() => {}, () => {
      return new SyncPromise((resolve, reject) => {resolve('foo2')});
    });
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo2');
  });

  it('should return then\'s reject reason if then rejects', function() {
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(() => {}, () => {
      return new SyncPromise((resolve, reject) => {reject('foo2')});
    });
    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo2');
  });
});
