# class

클래스는 인스턴스라는 용어와 같다.
인스턴스는 어떤 클래스의 속성을 지니고 있는 구체적인 객체 및 대상을 의미한다.

이미지 처럼 클래스도 상위 클래스, 하위 클래스로 나뉠 수 있다.
![IMG1](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_1.png)

## class에 대하여

일반적으로 클래스의 정의는 인스턴스를 생성하는 데에 보조하는 역할을 한다.<br><br>
Array에 있는 애들을 static methods, static properties라고 하는데, 얘네들은 클래스를 추상적인 클래스로서가 아니라 클래스를 하나의 객체로서 다룰 때 쓰는 메서드이고, prototype에 있는 메서드는 메서드 혹은 프로토타입 메서드라고 한다.

![IMG2](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_2.png)

인스턴에서 methods는 **proto**로 접근할 수 있다.<br>
하지만, **instance에서 static & static properties로 접근하지 못한다.**<br>
instance를 this로서 접근은 못하기 때문에 접근하지 못 한다고 하였고, 접근을 하려면 call,apply,bind 메서드를 사용해야 한다.

![IMG3](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_3.png)

```js
function Person(name, age) {
  this._name = name;
  this._age = age;
}

Person.getInformations = function (instance) {
  return {
    name: instance._name,
    age: instance._age,
  };
};
// -> static method

Person.prototype.getName = function () {
  return this._name;
};
// -> (prototype) method
Person.prototype.getAge = function () {
  return this._age;
};
// -> (prototype) method

/* 출력 */
var roy = new Person("로이", 30);
console.log(roy.getName()); // Ok
console.log(roy.getAge()); // Ok
console.log(roy.getInformations(roy)); // Error
console.log(Person.getInformations(roy)); // Ok
```

## Class 상속

```js
function Person(name, age) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.getAge = function () {
  return this.age;
};
function Employee(name, age, position) {
  this.name = name || "이름없음";
  this.age = age || "나이모름";
  this.position = position || "직책모름";
}

//-> Employee.prototype과 Person의 인스턴스 연결
// -> Employee.prototype.constructor = Employee;
Employee.prototype = new Person();
Employee.prototype.constructor = Employee;
Employee.prototype.getPosition = function () {
  return this.position;
};

var roy = new Employee("고무", 30, "CEO");
console.dir(roy); // -> Employee.age:30,name:"로이",position:CEO,[[Prototype]] : Person
```

위 코드처럼 Person을 상위에 올리고 Employee를 하위로 내려서 상속 구조를 만들 수 있다. <br>
이미지 처럼 Person은 getName과 getAge에 접근이 가능하지만, <br>
getPosition에는 접근하지 못하며,<br>
Employee는 3개 메서드에 접근이 가능하다.

![IMG5](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_5.png)
![IMG5-2](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_5-2.png)

### 그러면, 둘 간의 연결은 어떻게 할 것인가?

Person과 Employee의 상위 클래스와 하위 클래스 구분과 연결을 이미지와 같이 할 수 있다. <br>

Employee.prototype = new Person()이라는 코드로 둘 사이를 연결시켜준다. (Employee의 프로토타입이 Person의 인스턴스면 된다.) <br>

하지만, 여기서 연결 시 Employee의 프로토타입은 Person의 인스턴스로 덮어 씌어졌으므로 <br> 원래 있던 프로토타입이 날아가면서 Eployee constuctor가 사라지기 때문에 <br>
Employee.prototype.constructor = Employee 코드로 다시 생성해준다.

![IMG6](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_6.png)
![IMG6-2](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_6-2.png)

콘솔로 찍어보게 되면<br>
name:고무"를 지우게 된다면 **체이닝**에 의해서 name:"이름없음"이 나오게 된다.
![IMG7](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_7.png)

- 순서
  1. Bridege라는 함수를 만든다.
  2. Bridege.prototype에 Person.prototype이 가게 만든다.
  3. Employee.prototype에 Bridege 인스턴스 넣어준다
  4. Employee.prototype.constructor 다시 살려준다.
  5. Employee.prototype.getPosition 선언해준다.

![IMG7-2](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_7-2.png)
![IMG7-3](https://github.com/Kim-Tae-Hyeong/TIL/blob/inflearn-study/study/img/class_7-3.png)

```js
function Bridge() {}
Bridge.prototype = Person.prototype;
Employee.prototype = new Bridge();
Employee.prototype.constructor = Employee;

var roy = new Employee("로이", 30, "CEO");
console.dir(roy); // -> Employee.name : 이름없음, age:나이모름, 삭제 됨;
```

## ES6 extends

```js
class Person {
  constructor(name, age) {
    this.name = name || "이름없음";
    this.age = age || "나이모름";
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}

class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position || "직책모름";
  }
  getPosition() {
    return this.position;
  }
}
```
