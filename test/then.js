const SyncPromise = require('../src/syncpromise');

const assert = require('chai').assert;

describe('SyncPromise.prototype.then', function() {
  it('should return an original promise if then is empty', function() {
    const p = new SyncPromise((resolve) => {resolve()}).then();
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, undefined);

    const p2 = new SyncPromise((resolve, reject) => {reject()}).then();
    assert.strictEqual(p2.state, 'rejected');
    assert.strictEqual(p2.reason, undefined);
  });

  it('should return an original promise with a value if then is empty', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')}).then();
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo');

    const p2 = new SyncPromise((resolve, reject) => {reject('faa')}).then();
    assert.strictEqual(p2.state, 'rejected');
    assert.strictEqual(p2.reason, 'faa');
  });

  it('should return a promise with a value of then if resolved', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')}).then(
      () => {return 'foo2';});
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'foo2');
  });

  it('should return a new promise with an empty value if then does not return anything', function() {
    const p = new SyncPromise((resolve) => {resolve('foo')}).then(
      () => {});
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, undefined);
  });

  it('should return a promise with a reason of the original promise if rejected', function() {
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(
      () => {return 'foo2'});
    assert.strictEqual(p.state, 'rejected');
    assert.strictEqual(p.reason, 'foo');
  });

  it('should return a promise with a reason of the then if rejected', function() {
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(
      () => {return 'foo2'},
      () => {return 'faa'});
    assert.strictEqual(p.state, 'fulfilled');
    assert.strictEqual(p.value, 'faa');
  });

  it('should pass a value to then when resolved', function() {
    const p = new SyncPromise((resolve, reject) => {resolve('foo')}).then(
      (arg) => {
        assert.strictEqual(arg, 'foo');
      });
  });

  it('should pass a reason to then when rejected', function() {
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(
      null,
      err => {
        assert.strictEqual(err, 'foo');
      });
  });

  it('should not call the second arg of then when resolved', function() {
    let notCalled = true;
    const p = new SyncPromise((resolve, reject) => {resolve('foo')}).then(
      null,
      err => {
        notCalled = false;
      });
    assert.strictEqual(notCalled, true);
  });

  it('should not call the first arg of then when rejected', function() {
    let notCalled = true;
    const p = new SyncPromise((resolve, reject) => {reject('foo')}).then(
      arg => {
        notCalled = false; 
      });
    assert.strictEqual(notCalled, true);
  });

  it('should not pick a value from a then resolved value', function() {
    const interactive = new SyncPromise((resolve) => {
      resolve('value');
    });

    interactive.then(() => {return 'new value';});

    assert.strictEqual(interactive.value, 'value');
  });
});
