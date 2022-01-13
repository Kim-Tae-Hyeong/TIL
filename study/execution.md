# Execution Context

Execution Context -> **함수**를 실행할 때 필요한 환경정보를 **담은 객체**

- Variable Environment
- Lexical Environment
  - environmentRecord : 현재문백의 식별자 (hoisting)
  - outerEnvironmentReference : 외부 식별자 (scope chain)
- this

### Hoisting

-> 변순'선언', 함수'선언'을 끌어올리는 것

```js
console.log(a());
console.log(b());
console.log(c());

function a() {
  return "a";
}
var b = function bb() {
  return "bb";
};
var c = function () {
  return "c";
};
```

-> 함수가 console.log 뒤에 있어서 오류가 날 거 같지만,Hosting으로 인해 변수'선언',함수'선언'이 위로 올라와서 <br>

```js
function a() {
  return "a";
}
var b;
var c;
console.log(a());
console.log(b());
console.log(c());

b = function bb() {
  return "bb";
};
c = function () {
  return "c";
};
```

-> 이런 구조로 작동이 된다. 그래서 결과는 a값만 출력이 되고 b,c의 해당하는 함수 표현식은 Hosting에 포함되지 않아서 에러가 뜨게 된다.

# 함수 표현식

```js
// 함수선언문
function a() {
  return "a";
}

// 기명 함수표현식
var b = function bb() {
  return "bb";
};

// (익명) 함수표현식
var c = function () {
  return "c";
};
```

## call stack

-> 현재 어떤 함수가 동작중인지, 다음에 어떤 함수가 호출될 예정인지 <br> 등을 제어하는 자료구조
ex)

```js
var a = 1;
function outer() {
  console.log(a); // 1 콘솔 출력 순위

  function inner() {
    console.log(a); // 2
    var a = 3;
  }

  inner();

  console.log(a); // 3
}

outer();
console.log(a); // 4
```

실행 : 전역 컨텍스트 -> outer -> inner

종료 : inner -> outer -> 전역 컨텍스트 -> 종료

## 순서

- 전역 컨텍스트 활성화
  1. 변수 a 선언
  2. 함수 outer 선언
  3. 변수 a에 1 할당
  4. out 함수 호출
     - OUTER 컨텍스트 활성화
       1. 함수 inner 선언
       2. outer context에서 a 탐색 -> global a 탐색 -> 1출력
       3. inner 함수 호출
          - INNER 컨텍스트 활성화
            1. 변수 a 선언
            2. inner context에서 a 탐색 -> undefined 출력
            3. 변수 a에 3 할당
  5. inner context 종료
  6. outer context에서 a 탐색 -> global a 탐색 -> 1 출력
  7. outer context 종료
  8. global context에서 a 탐색 -> 1 출력
  9. global context 종료
