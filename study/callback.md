# callback

* 제어권 위임
  * 실행 시점

      ```js
      var cb = function(){
        console.log('1초마다 실행될 겁니다.');
      };

      setInterval(cb,1000); // 함수에 제어권을 setInterval에게 넘겨줌
      ```
  * 매개변수

      ```js
      var arr = [1, 2, 3, 4, 5];
      var entries = [];
      arr.forEach(function(v, i){
        entries.push([i, v, this[i]]);
      },[10, 20, 30, 40, 50]);
      //foreach->첫번째 인자는 콜백함수, 두번째 인자는 this로 인식할 대상(생략가능)
      console.log(entries);
      // -> ([0,1,10],[1,2,,20],[2,3,30]...)
      ```
  * this

      ```js
      document.body.innerHTML = '<div id="a">abc</div>';
      function cbFunc(x){
        console.log(this,x); // this-> div 태그, x -> PointerEvent
      }

      documnet.getElementById('a').addEventListener('click',cbFunc);
      
      /*
       addEventListener(type,callback,option)
       {
        type => click,mousemove,keyup,scroll 등
        callback => Event 인스턴스, 반환값이 없다.
        this => currentTarget 속성값과 같다.
        option => useCapture라 불리는 불린값으로, 이벤트 버블링이나 캡쳐링을 사용할 것인지 나타낸다.
       }
       
      */
      ```

## 콜백함수의 특징
1. 다른 함수(A)의 인자로 콜백함수(B)를 전달하면 A가 B의 제어권을 갖게 된다.
    - 특별한 요청(bind)이 없는 한 A에 미리 정해놓은 방식에 따라 B를 호출한다.
        * 미리 정해놓은 방식이란
          1. 어떤 시점에 콜백을 호출하지
          2. 인자에는 어떤 값들을 지정할지,
          3. this에 무엇을 바인딩할지 등이다
2. 콜백은 '함수'다.

    ```js
    var arr = [1, 2, 3, 4, 5];
    var obj = {
      vals: [1,2,3],
      logValues: function(v,i){
        if(this,vals){
          console.log(this.vals,v,i);
        }
        else{
          console.log(this,v,i);
        }
      }
    };
    obj.logValues(1,2); // 메서드로서 호출이고, this값은 -> obj
    // 결과 -> [1,2,3] 1 2
    arr.forEach(obj.logValues); // obj.logValues 콜백함수로 전달, this -> 전역객체
    
    // 메서드로 호출 -> obj.logValues(1,2);
    // 콜백함수로 전달 -> arr.forEach(obj.logValues);

    ```
