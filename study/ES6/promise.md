# 16. Promise

## 16-1. 소개

#### Callback Hell

- id가 'btn'인 button을 클릭하면 서버에 users 리스트를 가져오는 요청을 하고,
- 성공하면 list의 세번째 user의 정보를 다시 요청하여
- 성공하면 user의 profileImage url값을 가져다가 image 태그로 표현하고,
- 이 image를 클릭하면 해당 이미지를 제거.

```js
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.body.appendChild(script);

document.body.innerHTML += '<button id="btn">클릭</button>';
document.getElementById("btn").addEventListener("click", function (e) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/users?since=1000",
    success: function (data) {
      var target = data[2];
      $.ajax({
        method: "GET",
        url: "https://api.github.com/user/" + target.id,
        success: function (data) {
          var _id = "img" + data.id;
          document.body.innerHTML +=
            '<img id="' + _id + '" src="' + data.avatar_url + '"/>';
          document.getElementById(_id).addEventListener("click", function (e) {
            this.remove();
          });
        },
        error: function (err) {
          console.error(err);
        },
      });
    },
    error: function (err) {
      console.error(err);
    },
  });
});
```

#### Promise

```js
document.body.innerHTML = '<button id="btn">클릭</button>';
document.getElementById("btn").addEventListener("click", function (e) {
  fetch("https://api.github.com/users?since=1000")
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      var target = res[2];
      return fetch("https://api.github.com/user/" + target.id);
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      var _id = "img" + res.id;
      document.body.innerHTML +=
        '<img id="' + _id + '" src="' + res.avatar_url + '"/>';
      document.getElementById(_id).addEventListener("click", function (e) {
        this.remove();
      });
    })
    .catch(function (err) {
      console.error(err);
    });
});
```

#### Promise를 반환하면서 JSON parsing을 자동으로 해주는 library (axios) 활용시

```js
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js";
document.body.appendChild(script);

document.body.innerHTML += '<button id="btn">클릭</button>';
document.getElementById("btn").addEventListener("click", function (e) {
  axios
    .get("https://api.github.com/users?since=1000")
    .then(function (res) {
      var target = res.data[2];
      return axios.get("https://api.github.com/user/" + target.id);
    })
    .then(function (res) {
      var _id = "img" + res.data.id;
      document.body.innerHTML +=
        '<img id="' + _id + '" src="' + res.data.avatar_url + '"/>';
      document.getElementById(_id).addEventListener("click", function (e) {
        this.remove();
      });
    })
    .catch(function (err) {
      console.error(err);
    });
});
```

## 16-2. 상세

### 16-2-1. Promise Status

- unnsettled (미확정) 상태: pending. thenable하지 않다.
- settled (확정) 상태: resolved. thenable한 상태.
  - fulfilled (성공)
  - rejected (실패)

```js
const promiseTest = (param) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (param) {
        resolve("해결 완료");
      } else {
        reject(Error("실패!!"));
      }
    }, 1000);
  });

const testRun = (param) =>
  promiseTest(param)
    .then((text) => {
      console.log(text);
    })
    .catch((error) => {
      console.error(error);
    });

// then -> resolve, fulfiled(성공)
// error -> reject (실패)

const a = testRun(true);
const b = testRun(false);
```

### 16-2-2. 문법

- `new Promise(function)`
- `.then()`, `.catch()`는 언제나 promise를 반환한다.

```js
const executer = (resolve, reject) => { ... }
const prom = new Promise(executer)

const onResolve = res => { ... }
const onReject = err => { ... }

// (1)
prom.then(onResolve, onReject)

// (2)
prom.then(onResolve).catch(onReject)
```

```js
new Promise((resolve, reject) => { ... })
.then(res => { ... })
.catch(err => { ... })
```

```js
const simplePromiseBuilder = (value) => {
  return new Promise((resolve, reject) => {
    if (value) {
      resolve(value);
    } else {
      reject(value);
    }
  });
};

simplePromiseBuilder(1)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

simplePromiseBuilder(0)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

```js
const simplePromiseBuilder2 = (value) => {
  return new Promise((resolve, reject) => {
    if (value) {
      resolve(value);
    } else {
      reject(value);
    }
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

simplePromiseBuilder2(1);
simplePromiseBuilder2(0);
```

```js
const prom = new Promise((resolve, reject) => {
  resolve();
  reject();
  console.log("Promise");
});
prom.then(() => {
  console.log("then");
});

prom.catch(() => {
  console.log("catch");
});

console.log("Hi!");
```

```js
const prom = new Promise((resolve, reject) => {
  reject();
  resolve();
  console.log("Promise");
});
prom.then(() => {
  console.log("then");
});

prom.catch(() => {
  console.log("catch");
});

console.log("Hi!");

// 1. then이나 catch구문은 실행큐에 후순위로 등록되고 실행된다.
// 2. promise 인스턴스에 넘긴 함수 내부에서는, resolve나 reject 둘 중에 먼저 호출한 것만 실제로 실행된다.
// 3. 사실은 실제로 실행되는게 아니라, 실행은 둘다 되는데, pending상태일 때만 의미가 있기 때문에 2번과 같은 결과가 나온 것이다.
```

### 16-2-3. 확장 Promise 만들기

1. `Promise.resolve`, `Promise.reject`

```js
Promise.resolve(42)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
// 42
Promise.reject(12)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
// error 12
```

2. thenable 객체

```js
const thenable = {
  then(resolve, reject) {
    resolve(33);
  },
};
const prom = Promise.resolve(thenable);
prom.then((res) => {
  console.log(res);
  // resolve : 33
});
```

```js
const thenable = {
  then(resolve, reject) {
    reject(33);
  },
};
const prom = Promise.resolve(thenable);
prom.catch((err) => {
  console.log(err);
});
```

### 16-2-4. Promise Chaning (then, catch에서 return)

.then이나 .catch 안에서

1 return promise 인스턴스 : prmoise 인스턴가 리턴된것 **(return new Promise() or return Promise.resoluve() )**

2 return 일반값 : promise 객체에 resolved 상태로 반환됨. 그 안에 값이 담김.

3 return 안하면 : return undefined (원래 JS 동작이 이러하다.)

4 Promise.resolve() or Promise.reject() : return 해주지 않는 이상 의미없음.
-> 별개의 프라미스객체가 생성될 뿐, 현재 process상의 Prmoise 플로우에 영향을 주지 않는다. return 한 것은 1번과 같다.

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("첫번째 프라미스");
  }, 1000);
})
  .then((res) => {
    console.log(res);
    return "두번째 프라미스"; // 다음 then res값으로 넘어간다.
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("세번째 프라미스");
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("네번째 프라미스");
      }, 1000); // 1초 뒤 reject이기 때문에 then 말고 catch로 간다.
    });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
    return new Error("이 에러는 then에 잡힙니다."); // error 메세지가 나오면 또 다음 then을 타고 실행이 된다.
  })
  .then((res) => {
    console.log(res);
    throw new Error("이 에러는 catch에 잡힙니다.");
    // 여기서는 throw를 통해서 process를 중단시키고 error 메세지를 반환하라고 했으므로 then말고 catch로 가게 된다.
  })
  .then((res) => {
    console.log("출력 안됨");
  })
  .catch((err) => {
    console.error(err);
  });
```

### 16-2-5. Error Handling

```js
asyncThing1()
  .then(asyncThing2)
  .then(asyncThing3)
  .catch(asyncRecovery1)
  .then(asyncThing4, asyncRecovery2)
  .catch((err) => {
    console.log("Don't worry about it");
  })
  .then(() => {
    console.log("All done!");
  });

// -> asyncthing1~3 실패하면 asyncRecovery1로 간다.
// asyncRecovery1에서 성공이면 asyncthing4로 가고 실패하면  asyncRecovery2로 간다.
// asyncthing4에서 성공하면 'All done으로'가지만 실패하면 asyncRecovery2가 아닌 'Don't worry about it'으로 간다.
// asyncRecovery2 성공 -> 'All done' 실패 -> 'Don't worry about it'
// 'Don't worry about it'에서 성공하면 -> 'All done'
// 최종적으로 'All done'은 무조건 실행이 된다.
```

![에러 핸들링](https://raw.githubusercontent.com/js-jsm/es6js/master/15%20%ED%94%84%EB%9D%BC%EB%AF%B8%EC%8A%A4/promise_chaining.png)

### 16-2-6. Multi Handling

#### 1. `Promise.all()`

- iterable의 모든 요소가 fulfilled되는 경우: 전체 결과값들을 배열 형태로 then에 전달.
- iterable의 요소 중 일부가 rejected되는 경우: 가장 먼저 rejected 되는 요소 '하나'의 결과를 catch에 전달.

```js
const arr = [
  1,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("resolved after 1000ms");
    }, 1000);
  }),
  "abc",
  () => "not called function",
  (() => "IIFE")(),
];

Promise.all(arr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
// -> 1초 뒤 [1,"resolved after 1000ms", "abc", f, "IIFE"]가 나온다.
```

```js
const arr = [
  1,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("rejected after 1000ms");
    }, 1000);
  }),
  "abc",
  () => "not called function",
  (() => "IIFE")(),
];

Promise.all(arr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
// -> 1초뒤 "rejected after 1000ms"

/*
  Promise.all() :
1. 일반값은 그냥 resolved 된 값으로 간주
2. iterable 내의 모든 요소들이 resolved된 순간에 다음번 then 호출. 이때 값은 iterable 실행 결과가 배열로 반환된다.
3. iterable 내의 일부 요소가, 하나라도 reject가 되면, 그 순간 catch를 호출하여, reject된 값만 넘어온다.
*/
```

#### 2. `Promise.race()`

- iterable의 요소 중 가장 먼저 fulfilled / rejected되는 요소의 결과를 then / catch에 전달.

```js
const arr = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("1번요소, 1000ms");
    }, 1000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("2번요소, 500ms");
    }, 500);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("3번요소, 750ms");
    }, 750);
  }),
];
Promise.race(arr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
//-> 가장 빠른 2번요소 500ms가 실행된다. 시간이 없는 일반값이 있으면 가장 먼저 실행이 되기 때문에 일반값이 나온다.
```

```js
const arr = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("1번요소, 0ms");
    }, 0);
  }),
  "no queue",
];
Promise.race(arr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
//-> no queue가 실행된다. setTimeout을 0해도 Queue로 가기 때문에 늦게 실행이 된다.
/*
Promise.reace(iterable) : 
1. 일반값은 그냥 resolved 된 값으로 간주.
2. iterable 내의 요소 중에 가장 먼저 resolved (then) 또는 rejected (catch) 된 값을 반환함.
*/
```

> 참고: [ES2017 Async Function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
