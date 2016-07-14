const SyncPromise = require('../src/syncpromise');

var assert = require('chai').assert;
describe('new SyncPromise', function() {
  it('should error when called without an argument', function() {
    assert.throws(() => {
      new SyncPromise();
    }, 'Not enough arguments to Promise.');
  });

  it('should error when called with an argument that is not an object', function() {
    assert.throws(() => {
      new SyncPromise('foo');
    }, 'Argument 1 of Promise.constructor is not an object.');
  });

  it('should error when called with an argument that is not callable', function() {
    assert.throws(() => {
      new SyncPromise({});
    }, 'Argument 1 of Promise.constructor is not callable.');
  });

  it('should error when callback doesn not resolve the promise', function() {
    assert.throws(() => {
      new SyncPromise(() => {});
    }, 'Callback must resolve the promise before returning.');
  });

  it('should return a fulfilled promise if arg calls resolve', function() {
    const p = new SyncPromise((resolve) => {resolve()});
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, undefined);
  });

  it('should return a rejected promise if arg calls reject', function() {
    const p = new SyncPromise((resolve, reject) => {reject()});
    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, undefined);
  });

  it('should return a fulfilled promise with a value if arg calls resolve', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')});
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo');
  });

  it('should return a rejected promise with a value if arg calls reject', function() {
    const p = new SyncPromise((resolve, reject) => {reject('faa')});
    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'faa');
  });

  it('should throw if resolve called on a resolved promise', function() {
    assert.throws(() => {
      new SyncPromise((resolve, reject) => {
        resolve('faa');
        resolve('fa2');
      });
    }, 'Cannot call resolve on already resolved promise.');
  });

  it('should throw if reject called on a rejected promise', function() {
    assert.throws(() => {
      new SyncPromise((resolve, reject) => {
        resolve('faa');
        reject('fa2');
      });
    }, 'Cannot call reject on already resolved promise.');
  });
});
