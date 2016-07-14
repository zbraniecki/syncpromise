const CurPromise = SyncPromise;

console.log(0);
new CurPromise(function(resolve, reject) {
  console.log(1);
  return resolve();
}).then(() => {
  console.log(2);
  return new CurPromise(function(resolve, reject) {
    console.log(3);
    resolve();
  });
}).then(() => {
  console.log(4);
});

console.log(5);
console.log('-----------------------------');

console.log(0);

function load(path) {
  return new CurPromise(function(resolve, reject) {
    console.log(1);
    if (path === 'foo') {
      resolve('GOOD');
    } else {
      reject('BAD');
    }
  });
}

load('foo').then(val => {
  console.log(val);
});
console.log(2);

console.log('-----------------------------');

console.log(0);

function load(path) {
  return new CurPromise(function(resolve, reject) {
    console.log(1);
    if (path === 'foo') {
      resolve('GOOD');
    } else {
      reject('BAD');
    }
  });
}

load('err').then(val => {
  console.log(val);
}, err => {
  console.error(err);
});
console.log(2);
