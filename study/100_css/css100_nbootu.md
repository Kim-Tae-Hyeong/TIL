# css 네이밍 (2022.03.12)

- box, cont, wrap, inner 차이 -> ?
- wrap 여러번 사용해도 되는지 -> 자주 사용은 지양하지만 보면 여러번 사용하더라.
- transform-origin이 무엇인지. -> CSS transform 속성과 함께 사용되는 속성으로서, 회전 중심(원점·기준점)을 지정합니다.

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
