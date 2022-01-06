# this

1. 전역공간에서 - window / global
    ```js
    /* 브라우저에서 */
    console.log(this) // window 객체

    /* node.js에서 */
    console.log(this) // global 객체
    ```
2. 함수 호출시 - window / global
    ```js
    function a(){
      console.log(this);
    }
    a(); // window => 함수를 호출했을 때 주체가 누구냐에 따라 정해진다.

    function b(){
      function c(){
        console.log(this);
      }
      c(); /* c함수가 b함수 내부에서 호출을 했는데도 window 객체가 나오는데, 오류라고 의견이 나뉜다. 그래서 es6에서는 arrow function이 나왔다. */
    }

    b();
    ```
3. 메서드 호출시 - 메서드 호출 주체 (메서드명 앞)
    * 메서드를 호출한 주체 (누가 호출했는지)

        ```js
        var a {
          b: function(){
            console.log(this);
          }
        }
        a.b(); // {b: f} f=> function

        // 자바스크립의 메서드 -> 인스턴스(객체)와 관련된 동작
        // b함수를 a객체의 "메서드"로서 호출

        obj.func();
        obj.['func']();
        // .대신 대괄호를 사용해서 표현 가능하고 같은 의미이다.
        ```
        * 메서드 내부함수에서의 우회범
          
            ```js
            var a = 10;
            var obj = {
              a: 20,
              b: function(){
                var self = this;
                console.log(this.a); // 20

                function c(){
                  console.log(this.a); // 10 / window.a => 전역변수 a값을 가져온다 (자바스크립트의 오류라는 의견이 있다.)
                  //this===obj
                }
                function d(){
                  console.log(self.a); // 20 상위에 변수에 this값을 넣는다.
                }
                const e = () => {
                  console.log(this.a); // 20 동적인 this를 화살표 함수를 쓰면 정적으로 바뀌면서 상위 스코프 this를 가리킨다.
                c();
                d();
              }
            }
            obj.b();
            ```
4. callback 호출시 - 기본적으로는 함수내부에서와 동일 
    * 명시적인 this 바인딩 세가지 방법 (call,apply,bind)

      ```js
      function a(x, y, z){
        console.log(this, x, y, z);
      }  
      var b = {
        bb: 'bbb' 
      };

      a.call(b,1 ,2 ,3);

      a.apply(b,[1, 2, 3]);

      var c = a.bind(b);
      c(1, 2, 3);

      var d = a.bind(b, 1, 2);
      d(3);
      // 결과 => 모두 {bb: "bbb"} 1 2 3 
      ```
5. 생성자함수 호출시 - 인스턴스

    ```js
    function Person(n, a) {
      this.name = n;
      this.age = a;
    }
    var roy = Person('태형', 25);
    console.log(window.name, window.age);
    // 태형 30
    var show = new Person('태형', 25);
    console.log(show);
    // Person {name : "태형", age: 25}
    ```