# class

## class에 대하여

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

## class 상속

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

var roy = new Employee("로이", 30, "CEO");
console.dir(roy); // -> Employee.age:30,name:"로이",position:CEO,[[Prototype]] : Person

function Bridge() {}
Bridge.prototype = Person.prototype;
Employee.prototype = new Bridge();
Employee.prototype.constructor = Employee;

var roy = new Employee("로이", 30, "CEO");
console.dir(roy); // -> Employee.name : 이름없음, age:나이모름, 삭제 됨;
```
