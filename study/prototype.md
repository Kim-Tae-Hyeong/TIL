# prototype

<!-- Constructor(생성자 함수)prototype<br>
instance( ) -->

```js
function Person(n, a) {
  this.name = n;
  this.age = a;
}
var roy = new Person("로이", 30);

var royClone1 = new roy.__prote__.contructor("로이_클론1", 10);

var royClone2 = new roy.constructor("로기_클론2", 25);

var royClone3 = new Object.getPrototypeOf(roy).constructor("로이_클론3", 20);

var royClone4 = new Person.prototype.constructor("로이_클론4", 15);
```

```js
function Person(n, a) {
  this.name = n;
  this.age = a;
}

Person.prototype.setOlder = function () {
  this.age += 1;
};
Person.prototype.getAge = function () {
  return this.age;
};

//Person -> setOlder(), getAge()

var roy = new Person("로이", 30);
// roy {name: 재남, age: 30}
var jay = new Person("제이", 25);
// jay {name: '제이',age:25}

// 각 인스턴스들은 자신의 메서드인 것처럼 다양한 명령을 수행할 수 있다.
roy.setOlder();
jay.setOlder();
```

<!-- 2022.01.08 이미지 정리 필요. -->
