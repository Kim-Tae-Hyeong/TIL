# 13. map, weakmap

## 13-1. Map

### 13-1-1. 객체의 단점

#### 1. iterable하지 않다.

```js
const o = { a: 1, b: 2, c: 3 };

// (1)
for (let key in o) {
  console.log(key, o[key]);
}

// (2)
Object.prototype.method = function () {};
for (let key in o) {
  console.log(key, o[key]);
}

// (3)
for (let key in o) {
  if (o.hasOwnProperty(key)) {
    console.log(key, o[key]);
  }
}

// (4)
const obj2Arr = (obj) => {
  const arr = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push([key, obj[key]]);
    }
  }
  return arr;
};
const oArr = obj2Arr(o);
oArr.forEach((v) => console.log(v));

// (5)
const oArr2 = Object.keys(o).map((k) => [k, o[k]]);
oArr2.forEach((v) => console.log(v));
```

#### 2. 키를 문자열로 취급한다.

```js
const obj = {
  1: 10,
  2: 20,
  3: 30,
};
let res = 0;
for (let key in obj) {
  res += key;
}
console.log(res);
```

#### 3. 따라서 키값의 unique함을 완벽히 보장하지 못함.

```js
const obj = {
  1: 10,
  01: 20,
  "01": 30,
};
console.log(obj);
```

#### 4. 프로퍼티 개수를 직접 파악할 수 없다.

```js
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj).length);
console.log(Object.values(obj).length);
```

### 13-1-2. Map

#### 1. [ key, value ] 쌍(pair)으로 이루어진 요소들의 집합.

#### 2. 순서를 보장하며, iterable하다.

#### 3. 키에는 어떤 데이터타입도 저장할 수 있으며, 문자열로 취급하지 않는다.

```js
const map = new Map();
map.set(1, 10);
map.set(01, 20);
map.set("01", 30);
// -> Map(2) {1=> 20, "01" => 30} 객체와 달리 1,01를 숫자로 취급해서 1이되고 '01'은 문자로 취급하였다.
map.set({}, 40);
map.set(
  function () {},
  () => {}
);
console.log(map);
```

#### 4. 추가 / 값 가져오기 / 삭제 / 초기화 / 요소의 총 개수 / 포함여부확인

```js
const map = new Map();
map.set("name", "태형");
map.set("age", 25);
//-> 추가하기 {"name" => "태형", "age" => 25}

console.log(map.size);
// -> 2

console.log(map.get("name"));
console.log(map.get("age"));
// -> 태형, 25

map.delete("name");
console.log(map.has("name"));
console.log(map.has("age"));
// delete 후 name-> false, age -> true
console.log(map.size);

map.clear();
console.log(map.has("name"));
console.log(map.has("age"));
console.log(map.size);
```

#### 5. 초기값 지정

인자로 iterable한 개체를 지정할 수 있다.

```js
const map1 = new Map([
  [10, 10],
  ["10", "10"],
  [false, true],
]);
console.log(map1);

const map2 = new Map(map1);
console.log(map2);
console.log(map1 === map2);

const gen = function* () {
  for (let i = 0; i < 5; i++) {
    yield [i, i + 1];
  }
};
const map3 = new Map(gen());
console.log(map3);
```

#### 6. 기타 메소드 소개

```js
const map = new Map([
  [10, 10],
  ["10", "10"],
  [false, true],
  ["name", "태형"],
]);
const mapKeys = map.keys();
// -> {10,"10", false}
const mapValues = map.values();
// -> {10,"10", true}
const mapEntries = map.entries();
// -> {10 => 10,"10" => "10", flase => true}

map.forEach(function (value, key, ownerMap) {
  console.log(`${key}: ${value}`);
  console.log("ownerMap: ", ownerMap, "this: ", this);
}, []);
```

#### 7. 배열로 전환하기

```js
const map = new Map([
  [10, 10],
  ["10", "10"],
  [false, true],
  ["name", "태형"],
]);
const mapArray1 = [...map];
// -> {10 => 10, "10" => "10", false => true, "name" => "태형"}
const mapArray2 = [...map.keys()];
// -> {10,"10",false,"name"}
const mapArray3 = [...map.values()];
// -> {10,"10",true,"태형"}
const mapArray4 = [...map.entries()];
//  mapArray1 == mapArray4
console.log(mapArray1, mapArray2, mapArray3, mapArray4);
```

#### 8. 객체로 전환하기

```js
const map1 = new Map([[10, 10], ['10', '10'], [false, true], ['name', '태형']])
const map2 = new Map([[{}, 10], [function(){}, '10'], [[], true], [Symbol('심볼'), '태형']])
const convertMapToObject = map => {
  const resultObj = {}
  [...map].forEach(([k, v]) => {
    if(typeof k !== 'object') {
      resultObj[k] = v
    }
  })
  return resultObj
}
const obj1 = convertMapToObject(map1)
const obj2 = convertMapToObject(map2)
```

## 13-2. WeakMap

#### 1. Map과의 비교

Map에 객체를 키로 하는 데이터를 추가할 경우 Map에도 해당 객체에 대한 참조가 연결되어, 여타의 참조가 없어지더라도 Map에는 객체가 여전히 살아있음.  
한편 WeakMap은 객체에 대한 참조카운트를 올리지 않아 (약한 참조), 여타의 참조가 없어질 경우 WeakMap 내의 객체는 G.C의 대상이 됨.

```js
let obj1 = { a: 1 }; // 1
const map = new Map();
map.set(obj1, 10); // 2
obj1 = null; // 1

let obj2 = { b: 2 }; // 1
const wmap = new WeakMap();
wmap.set(obj2, 20); // 1
obj2 = null; // 0
```

#### 2. 참조형 데이터만 키로 설정할 수 있다.

```js
const keysArray = [
  { a: 1 },
  [1, 2, 3],
  function () {},
  Symbol("키"),
  45,
  "문자열",
  false,
];
const wmap = new WeakMap();
keysArray.forEach((v, i) => {
  wmap.set(v, i);
  console.log(wmap.get(v));
});
```

#### 3. iterable하지 않다.

- for ... of 사용 불가
- size 프로퍼티 없음
- `keys()`, `values()`, `entries()`, `clear()` 등 사용 불가

#### 4. 활용사례

- 비공개 객체 멤버

```js
const weakmapValueAdder = (wmap, key, addValue) => {
  wmap.set(key, Object.assign({}, wmap.get(key), addValue));
};
const Person = (() => {
  const privateMembers = new WeakMap();
  return class {
    constructor(n, a) {
      privateMembers.set(this, { name: n, age: a });
    }
    set name(n) {
      weakmapValueAdder(privateMembers, this, { name: n });
    }
    get name() {
      return privateMembers.get(this).name;
    }
    set age(a) {
      weakmapValueAdder(privateMembers, this, { age: a });
    }
    get age() {
      return privateMembers.get(this).age;
    }
  };
})();
const jn = new Person("태형", 30);
console.log(jn.name, jn.age, jn);

jn.age = 25;
console.log(jn.name, jn.age, jn);

const sh = new Person("서훈", 28);
console.log(sh.name, sh.age, sh);

sh.name = "성후";
console.log(sh.name, sh.age, sh);
```
