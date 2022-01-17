window.onload = function () {
  const offset_top = getCurrentScrollPercentage();
  let main_text = document.querySelectorAll(".main_box_text p");
  for (let a = 0; a < main_text.length; a++) {
    main_text[a].classList.add("main_box_text_on");
  }

  // console.log(main_text);
  //스킬 애니메이션
  let numAnimation = document.querySelectorAll(".num_animation");
  let progress = document.querySelectorAll("progress");
  let skill_event = "false";
  let about_me_event1 = "false";
  let about_me_event2 = "false";
  let project_event1 = "false";
  let project_event2 = "false";
  let footer_smile = "false";
  let about_animation1 = document.querySelectorAll(".about_show1");
  let about_animation2 = document.querySelectorAll(".about_show2");
  let project_animation = document.querySelectorAll(".project_box");

  function skill_animation(idx) {
    let targetNum = numAnimation[idx].getAttribute("data-rate");
    let progress_num = progress[idx].getAttribute("value");
    let num = 0;
    let timer = setInterval(function () {
      ++num;
      numAnimation[idx].innerText = num + "%";
      progress[idx].setAttribute("value", num);
      if (num == targetNum) {
        clearInterval(timer);
      }
    }, 30);
  }


  function getCurrentScrollPercentage() {
    return (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100
    );
  }
  document.addEventListener("scroll", () => {
    const currentScrollPercentage = getCurrentScrollPercentage();
    console.log(currentScrollPercentage);
    if (currentScrollPercentage > 47 && skill_event == "false") {
      skill_event = "true";
      for (let i = 0; i < numAnimation.length; i++) {
        skill_animation(i);
      }
    } else if (currentScrollPercentage > 27 && about_me_event1 == "false") {
      for (let j = 0; j < about_animation1.length; j++) {
        about_me_event1 = "true";
        about_animation1[j].classList.add("on");
      }
      for (let c = 0; c < about_animation2.length; c++) {
        about_animation2[c].classList.add("on");
      }
    } else if (currentScrollPercentage > 58 && project_event1 == "false") {
      $(".temlook").attr("id", "temlook");
      $("#temlook_text").attr("id", "project_text_temlook");
      project_event1 = "true";
    } else if (currentScrollPercentage > 73 && project_event2 == "false") {
      $(".vmax").attr("id", "vmax");
      $("#vmax_text").attr("id", "project_text_vmax");
      project_event2 = "true";
    } else if (currentScrollPercentage > 92 && footer_smile == "false") {
      $(".smile").attr("id", "smile");
      footer_smile = "true";
    }
  });

  // pc 메뉴 링크 이동
  const pc_menu_a_click = function (e) {
    let target = e.target;
    let link = "#" + target.getAttribute("data-link");

    // let menuHeight = document.querySelector(link).offsetHeight;

    let location = document.querySelector(link).offsetTop;

    let pc_menu_bar = document.querySelector("menu_pc_wrap");

    $(".web_background").fadeOut(-300);
    $(".menu_pc_wrap").stop().animate({
      left: -300
    }, 500);

    window.scrollTo({
      top: location,
      behavior: 'smooth'
    });
    // console.log(link);
  }
  let pc_menu_a = document.querySelectorAll(".pc_menu_a");


  for (let i = 0; i < pc_menu_a.length; i++) {
    pc_menu_a[i].addEventListener('click', pc_menu_a_click);
  }


  $(".menu_pc_box").click(function () {
    $(".web_background").fadeIn(300);
    $(".menu_pc_wrap").stop().animate({
      left: 0
    }, 500);
    return false;
  });

  $(".menu_mobile_box").click(function () {
    $(".web_background").fadeIn(300);
    $(".menu_pc_wrap").stop().animate({
      left: 0
    }, 500);
    return false;
  });

  $(".close_menu").click(function () {
    $(".web_background").fadeOut(-300);
    $(".menu_pc_wrap").stop().animate({
      left: -300
    }, 500);
  });



};