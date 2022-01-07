# closure
-> 컨텍스트 A에서 선언한 변수를 내부함수 B에서 참조할 경우에 발생하는 특별한 현상

```js
var outer = function (){
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
}
outer();
// outer 컨텍스트(A)에서 선언한 변수를 내부함수 inner(B)에서 참조!
```

```js
var outer = function (){
  va a = 1;
  var inner = function (){
    return ++a;
  };
  return inner;
}
var outer2 = outer();
console.log(outer2());
console.log(outer2());

/*
실행순서

1. 전역 -> environmentRecord {outer:f, outer2:undefined}
2. outer -> environmentRecord {a:1, inner:f}
            outerEnvironmentReference {outer:f}
3. outer -> EnvironmentRecord {a:1, (inner:f 점선)}  
            (outerEnvironmentReference {outer:f} 점선)
  전역 -> environmentRecord : {outer:f, outer2: inner}
4. inner -> environmentRecod {}
            outerEnvironmentReference {a:1 -> 2}
   outer -> environmentRecod {a:1 -> 2}
5. inner 컨텍스트 제거 -> outer-> environmentRecord {a:2} console.log 2출력
6. inner -> environmentRecod {}
            outerEnvironmentReference {a:2 -> 3}
   outer -> environmentRecod {a:2 -> 3}
7. inner 컨텍스트 제거 -> outer-> environmentRecord {a:3} console.log 3출력
8. 전역 컨텍스트 종료
*/

// -> a값은 outer2 변수가 inner함수를 물고 있는데 inner 함수로부터 a를 참조하기 때문에 그렇다. 
```
## 요약
-> 컨텍스트 A에서 선언한 변수 a를 참조하는 내부함수 B를 A의 외부로 전달할 경우,<br> A가 종료된 이후에도 a가 사라지지 않는 현상.(지역변수가 함수 종료 후에도 사라지지 않게 할 수 있다.)
