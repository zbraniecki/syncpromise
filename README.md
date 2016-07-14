# SyncPromise

SyncPromise is an incomplete implementation of Promise API. SyncPromise executes your Promise based code synchronously.

## Why

Because sometimes you need to test your Promise based code in a sync scenario.

## Features

* Small
* ES6 based
* With tests
* Most of new Promise()
* Most of Promise.prototype.then
* Most of Promise.resolve
* Most of Promise.reject
* Most of Promise.all


### Restrictions

Can't handle Promise.prototype.catch for obvious reasons.


## Differences from ECMAScript promises

* Throws when SyncPromise callback ends without resolving the promise
* Throws when attempting to resolve an already resolved promise
* No Promise.prototype.catch
* No Promise.prototype.race (we accept patches!)
* Some other things probably missing...

