# Execution Context
Execution Context -> **함수**를 실행할 때 필요한 환경정보를 **담은 객체**
- Variable Environment
- Lexical Environment
    - environmentRecord : 현재문백의 식별자 (hoisting)
    - outerEnvironmentReference : 외북 식별자 (scope chain)
- this



## call stack
-> 현재 어떤 함수가 동작중인지, 다음에 어떤 함수가 호출될 예정인지 <br> 등을 제어하는 자료구조
ex)
```js
var a = 1;
function outer(){
  console.log(a); // 1 콘솔 출력 순위 

  function inner(){
    console.log(a); // 2
    var a = 3;
  }

  inner(); 

  console.log(a);  // 3
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