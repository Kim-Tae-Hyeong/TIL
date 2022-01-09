# prototype

![IMG1](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/prototype_1.png)

생성자 함수를 new 연산자를 통해서 인스턴스를 만들었을 때, 그 인스턴스에는 constructor의
prototype이라고 하는 프로퍼티의 내용이 **proto** 프로퍼티로 참조를 전달하게 된다.
-> constructor.prototype이랑 instance.**proto** 랑 같은 객체를 바라본다.

![IMG2](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/prototype_2.png)

**proto**라는 프로퍼니는 생략이 가능하다 (**proto** 는 살아있다.)

결론은, instance에서 constructor에 있는 prototype 안에 들어있는 메서드들을 자신의 것처럼 접근이 가능하고 사용이 가능하다.

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

![IMG3](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/prototype_3.png)

-> 위에서 아래로 내려갈 수 있지만(new Array), 아래에서 위로는 올라갈 수 없다.

![IMG4](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/prototype_4.png)

Array.prototype은 객체이다(프로토타입이라는 프로퍼티가 객체로 들어가 있습니다.)

## Array.prototype은 객체인데, 이 객체를 무엇으로 만들까?

생성자 Object를 new 연산자를 이용해 만든 객체이다.(Object.prototype를 또 상속받을 수 있다.)

예를들면, 배열([1,2,3])에서 valueOf라는 메서드를 사용하게 되면,<br>
배열에는 해당 메서드가 없으므로 Array.prototype으로 올라가게 되고 여기에 있으면 사용하게 되며<br>
없다면, 마지막으로 Object.prototype으로 올라가 해당 메서드를 사용하게된다.

<!-- 2022.01.08 이미지 정리 필요. -->
