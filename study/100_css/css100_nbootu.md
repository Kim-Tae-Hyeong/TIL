# css 네이밍, 알아봐야 할 것 (2022.03.12)

- box, cont, wrap, inner 차이 -> ?
- wrap 여러번 사용해도 되는지 -> 자주 사용은 지양하지만 보면 여러번 사용하더라.
- transform-origin이 무엇인지. -> CSS transform 속성과 함께 사용되는 속성으로서, 회전 중심(원점·기준점)을 지정합니다. (3번)
- transform-origin 기준점이 100%넘어서면 값을 넣으면 위치가 예상하기 힘듦 알아볼것. (3번)
- css animation 주면 테두리 선이 보이는 이슈 (3번)
- animation-fill-mode 관련 효과 (4번)
- 마크업을 작업할 때 순서? <br>
  - 마크업 -> css 네이밍 추가 -> css 작업<br>
  - 마크업 (css네이밍 같이) -> css 작업<br>
  - 마크업(css 네이밍 + css 작업)
- 꺾은선 그래프 만들기 위한 좌표 계산하기 (5번)
- 그래프 라인 선을 어떻게 표현할 것인가 svg? div rotate?(5번)
- 어려운 css 네이밍...(5번)

1. [클래스로 숫자 만들기](https://codepen.io/kimTaeHyeong/pen/xxPvgdR)

- 숫자를 클래스를 이용하여 네모를 만드는 과정
- 1를 표시할 때는 네모 두개를 이용했고, rotate로 꺾어서 1를 표현했다.
- 0을 표현할 때는 radius로 둥글게 만들고 border를 통해 색을 두께를 표현했다.(border를 사용했기 때문에 가운데 원이 비어있는 효과가 나타남)

2. [애니메이션 버튼 만들기](https://codepen.io/kimTaeHyeong/pen/xxPvgdR)

- 버튼 모양을 만들기 위해 width, height, background-color를 이용해 표현했고
- 애니메이션은 inactive, active일 때 효과를 넣었다
- inactive -> 1,3번째 선이 0%에서 50%일 때 transform: translateY를 이용해서 가운데로 이동하게했고,
- 100% -> 1,3 transform: rotate를 주었고, 2번째는 scale과, opacity를 통해서 사라지게 했다.
- active -> inactive일 때랑 반대로 했다.
- js를 통해서 처음 클릭했을때 inactive클래스를 제거하고 active가 없으면 추가하는 이벤트를 주었다. <br>(inactive를 처음에 넣는 이유는 페이지가 열렸을 때 이벤트가 실행되는 걸 막기위해 css에 animation : none을 주었기 때문이다.)

3. [해가 지는 애니메이션](https://codepen.io/kimTaeHyeong/pen/eYymzaw?editors=1100)

- 모든 div에 position absolute를 줘서 겹치게 만든다.
- 태양같은 경우는 rotate를 통해서 돌리는데 transform-origin를 통해서 기준점을 통해서 횐전을 시키도록 만든다.
- 태양을 원 가운데 위치를 두고 transform-origin을 부모 같은데 중점을 두게 하고 rotate를 통해서 안보였다 나오는 식으로 만든다.
- 바닥은 똑같은 position absolute, z-index를 이용해서 bottom을 주고 배치시킨다.
- 피라미드는 clip-path를 이용해서 모양을 만든다.
- 피라미드의 가상선택자 after를 이용하여 그림자를 만든다. 모양은 clip-path를 이용한다.
- 피라미드의 그림자도 마찬가지로 width,height값을 주고 absolute를 줘서 위치를 조정한 다음, clip-path로 피라미드 모양처럼 만든다.
- 애니메이션를 통해 그림자를 scaleY를 이용해 표현하고, clip-path를 통해 모양을 바꾼다.

4. [해가 지는 애니메이션](https://codepen.io/kimTaeHyeong/pen/MWryrwE?editors=1100)

- div.circle1 -> circle2 -> circle3 이렇게 부모-자식 형태로 만들고
- 크기를 다르게 한 다음 애니메이션을 통해 크기가 점점 커지게 만든다.
- animation 값 중 alternate값을 주면 반대 방향으로도 애니메이션이 진행이 된다.
- 처음에 0% 일때 scale(0), 100% scale(1)를 주고
- 최상 부모에 10~20%, 2번째 40%, 3번째 70퍼를 0%와 같은 효과를 줘서 속도를 조정하는 식으로 했다.

  5.[꺾은선 그래프](https://codepen.io/kimTaeHyeong/pen/qBpapWp?editors=1100)

- cont_graph만들고 그 안에 컨텐츠를 만들기 시작했다. (위에 주황색 정보 -> inner_info, 그래프 컨텐츠 -> content_graph)
- inner_info는 flex를 이용해서 양 끝 배치를 하고 부모에 padding, 자식한테 margin을 줘서 위치를 조정한다.
- 좌표를 계산해서 top을 통해서 위치 조절 점을 배치한다?
- 꺾으선은 svg를 통해서 하는게 좋을 거 같다. (방법 확인 필요)
