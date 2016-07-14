function isPromise(p) {
  return p && p.then ? true : false;
}

const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

class SyncPromise {
  constructor(fn = null, silenceRepetitiveResolutions = false) {
    if (fn === null) {
      throw new TypeError('Not enough arguments to Promise.');
    }
    if (!(fn instanceof Object)) {
      throw new TypeError('Argument 1 of Promise.constructor is not an object.')
    }
    if (!(fn instanceof Function)) {
      throw new TypeError('Argument 1 of Promise.constructor is not callable.')
    }
    this.state = STATE.PENDING;

    let resolve = val => {
      if (this.state !== STATE.PENDING && !silenceRepetitiveResolutions) {
        throw new Error('Cannot call resolve on already resolved promise.');
      }
      this.state = STATE.FULFILLED;
      this.value = val;
    };
    let reject = err => {
      if (this.state !== STATE.PENDING && !silenceRepetitiveResolutions) {
        throw new Error('Cannot call reject on already resolved promise.');
      }
      this.state = STATE.REJECTED;
      this.reason = err;
    };
    fn(resolve, reject);
    if (this.state === STATE.PENDING) {
      throw new Error('Callback must resolve the promise before returning.');
    }
  }

  then(fn = null, err = null) {
    const cb =
      this.state === STATE.FULFILLED ? fn : err;
    if (cb === null) {
      return this;
    }
    const arg = this.state === STATE.FULFILLED ? this.value : this.reason;

    const ret = cb(arg);
    if (isPromise(ret)) {
      return ret;
    }
    if (this.state === STATE.FULFILLED) {
      this.value = ret;
    } else {
      this.reason = ret;
    }
    return this;
  }
}

SyncPromise.resolve = function(val) {
  return new SyncPromise(resolve => {
    resolve(val);
  });
}

SyncPromise.reject = function(err) {
  return new SyncPromise((resolve, reject) => {
    reject(err);
  });
}

SyncPromise.all = function(promises) {
  return new SyncPromise((resolve, reject) => {
    let l = promises.length;
    const result = [];

    promises.every((p, i) => {
      if (isPromise(p)) {
        let didError = false;

        p.then(res => {
          result[i] = res;
          --l || resolve(result);
        }, err => {
          reject(err);
          didError = true;
        });

        if (didError) {
          return false;
        }
      } else {
        result[i] = p;
        --l || resolve(result);
      }
      return true;
    });
  });
}

if (typeof module !== 'undefined') {
  module.exports = SyncPromise;
}
