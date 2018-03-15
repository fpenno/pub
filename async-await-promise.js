/**
 * @author Felipe Penno <https://www.piscestek.com.au>
 */

function getPromise(flag, injectError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag && !injectError) {
        let log = `${flag} ${getChronos()} getPromise:resolve`;
        resolve(log);
      } else {
        let log = `${flag} ${getChronos()} getPromise:reject`;
        reject(log);
      }
    }, 2000);
  });
}

// logs time and calls promise:
async function asyncCall(flag, injectError = false) {
  console.log(`${flag} ${getChronos()} asyncCall`);
  var result = null;
  try {
    result = await getPromise(flag, injectError);
  } catch (error) {
    result = error;
  }
  console.log(result);
}

// logs time and returns promise:
function promiseCall(flag, injectError = false) {
  console.log(`${flag} ${getChronos()} promiseCall`);
  return getPromise(flag, injectError);
}

// time tracker
function getChronos(chronos = new Date()) {
  return `${chronos.getHours()}:${chronos.getMinutes()}:${chronos.getSeconds()}.${chronos.getMilliseconds()}`;
}

// simpler async/await approach: resolved
asyncCall(10);

// simpler async/await approach: rejected
asyncCall(11, true);

// waits for promise to be resolved
promiseCall(20).then(
  result => {
    console.log(result);
  },
  error => {
    console.log(error);
  }
);

// waits for promise to be rejected
promiseCall(21, true).then(
  result => {
    console.log(result);
  },
  error => {
    console.log(error);
  }
);

// waits for promise to be rejected (with catch)
promiseCall(22, true)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
