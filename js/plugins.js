//trigger niceScroll
  $('html').niceScroll({
    cursorcolor:"dodgerblue",
    cursorborder: '1px solid dogerblue',
    cursorwidth:"10px"
});


//append text to paragraph in loading  
let y="Welcome To Our Page",
    count=0,
    sectionloading=document.getElementById("load");
function load(){
  if(count == y.length){
    clearInterval(wait);
    sectionloading.style.display="none";
  }
  else{
    sectionloading.childNodes[1].innerHTML+=y[count];
    count++;
  }
}
let wait=setInterval(load,300);


//function to toggle active class in header and scrollTo to sections

let alllistanchor=document.querySelectorAll(".nav li a");
alllistanchor.forEach(elem=>{
  elem.addEventListener("click",(e)=>{
    alllistanchor.forEach(link=>{
      link.classList.remove("active");
    });    
    e.target.classList.add("active");
    document.getElementById(e.target.getAttribute("data-value")).scrollIntoView({
      behavior:'smooth'
    });    
  });
});


//function to get data from json file and put it in myheader section

function mycarousel(){
  document.getElementById("inner").firstElementChild.classList.add("active");
    let req = new XMLHttpRequest(),
       carouselimg=document.querySelectorAll('.myheader img');
       req.onreadystatechange=function(){
      if(this.readyState == 4 && this.status == 200){
        let datacarousel=JSON.parse(this.responseText);
        for(i=0;i<carouselimg.length;i++){
          carouselimg[i].src=datacarousel.carousel[i].src;
        }
      }
    }
    req.open("GET","js/data.json",true);
    req.send();
  }
  mycarousel();
  
  
  
  //create paragraph and  append to carousel 

  let paragraph=document.createElement("p"),
      x="It's Not Over Untill I Win",
      index=0;
  document.getElementsByClassName("carousel-caption")[1].appendChild(paragraph);
  function print(){
    if(index == x.length){
      clearInterval(stop);
    }
    else{
      paragraph.innerHTML+=x[index];
      index++;
    }
  }
  setTimeout(function(){
    let stop=setInterval(print,150);
  },5700);
  
//function to get data from json file ana put in mycard section

function mycard(){
  let request = new XMLHttpRequest(),
     imgsrc= document.querySelectorAll('.mycard img'),
        backcontent=document.querySelectorAll('.back'),
        anchorhref=document.querySelectorAll('.mycard a');
        request.onreadystatechange=function(){
      if(this.readyState ==4 && this.status == 200){
        let datacard=JSON.parse(this.responseText);
        //put data from json to img src
        for(let i=0;i<datacard.works.length;i++){
          backcontent[i].innerHTML=datacard.works[i].body;
          imgsrc[i].src=datacard.works[i].src;
          anchorhref[i].href=datacard.works[i].link;
          }
      }
    }
    request.open("GET","js/data.json",true);
    request.send();
  };

mycard();

//function to show more works & show less works

let moreworks=document.querySelector('.mycard button'),
    allgrid=document.querySelectorAll('.mycard .col-md-3');
moreworks.onclick=function(){
  if(this.getAttribute("data-text") == "Less Works"){
    this.innerHTML=this.getAttribute("data-text");
    this.setAttribute("data-text","More Works");
    allgrid.forEach(elem =>{
      elem.style.display="block";
    });
  }
  else{
    this.innerHTML=this.getAttribute("data-text");
    this.setAttribute("data-text","Less Works");
    for(let i=4;i<allgrid.length;i++){
      allgrid[i].style.display="none";
    }
  }
}


//function to toggle myinfo

let sectionmyinfo=document.getElementById("myinfo"),
    panelbody=sectionmyinfo.childNodes[1].childNodes[1].childNodes[3],
    span=sectionmyinfo.childNodes[1].childNodes[1].childNodes[1].childNodes[1];
span.onclick=function(){
    if(span.getAttribute('data-text') == "hide"){
      panelbody.style.display="block";
      span.setAttribute("data-text","show");
      span.firstElementChild.classList.remove("fa-minus");
      span.firstElementChild.classList.add("fa-plus");
    }
    else{
      panelbody.style.display="none";
      span.setAttribute("data-text","hide");
      span.firstElementChild.classList.remove("fa-plus");
      span.firstElementChild.classList.add("fa-minus");
    }
}

//function to get data from json and put it in section myinfo

function information(){
  let myinfo=new XMLHttpRequest(),
      alllist=document.querySelectorAll(".myinfo ul li"),
      alllink=document.querySelectorAll(".myinfo .link li a");
      myinfo.onreadystatechange=function(){
        if(this.readyState ==4 && this.status == 200){
          let infodata=JSON.parse(this.responseText);
          document.querySelector(".myinfo .content img").src=infodata.myinfo[1][0];
          for(let i=0;i<6;i++){
            if(i <= 1){
              alllist[i].innerHTML+=infodata.myinfo[0][i];
              alllink[i].href=infodata.myinfo[1][i+1];
              alllink[i].innerHTML=infodata.myinfo[1][i+1];
            }
            else{
              alllist[i].innerHTML+=infodata.myinfo[0][i];
            }
          }
        }
      }
      myinfo.open("GET","js/data.json",true);
      myinfo.send();
}
information();


//function to animate our-progress section

$(function(){
  "use strict";
    $(window).on("scroll",function(){
      if($(window).scrollTop() > ($(".our-progress").offset().top-$(".our-progress").height())){
        $(".our-progress .content").animate({
          "left":"0px"
        });
        $(".our-progress .info").animate({
          "right":"0px"
        });
      }
    });
})


//function to get data from json file ana put it in our-progress section

function get(){
  let myrequest=new XMLHttpRequest(),
      allprogress=document.querySelectorAll(".our-progress .progress-bar"),
      allspan=document.querySelectorAll(".our-progress span");
      myrequest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          let progressdate=JSON.parse(this.responseText);
          for(let i=0;i<allprogress.length;i++){
            allspan[i].innerHTML=progressdate.progress[i].name;
            allprogress[i].setAttribute("aria-valuenow",progressdate.progress[i].rank);
            allprogress[i].style.width=progressdate.progress[i].rank;
            allprogress[i].innerHTML=progressdate.progress[i].rank;
          }
        }
      }
      myrequest.open("GET","js/data.json",true);
      myrequest.send();
}

window.onscroll=function(){
  // if condition to call function get when at scroll something
  if(window.pageYOffset > (document.getElementById("our-progress").offsetTop-document.getElementById("our-progress").offsetHeight)){
    let stop=setTimeout(get,1000);
  }

  // if condition to show image in upperfooter section at scroll something
  let upperfootersection=document.querySelector(".upperfooter"),
    allimage=document.querySelectorAll(".upperfooter .image"),
    counter=0;
  if(window.pageYOffset > 1300){
    let set=setInterval(function(){
      if(counter > 5){
        clearInterval(set);
      }
      else{
        allimage[counter++].style.display="block";
      }
    },500);
  }
}


//function to get data from data.json and put it in feature section

function featuresection(){
  let featurerequest=new XMLHttpRequest(),
      allicon=document.querySelectorAll(".feature .feat i"),
      allparag=document.querySelectorAll(".feature .feat p"),
      allicon2=document.querySelectorAll(".feature .overlfeat i"),
      allparag2=document.querySelectorAll(".feature .overlfeat p");

      featurerequest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          let featuredata=JSON.parse(this.responseText);
          for(let i=0;i<featuredata.feature.length;i++){
            if(i>3){
              allicon2[i].classList.add(featuredata.feature[i].icon);
              allparag2[i].innerHTML=featuredata.feature[i].paragraph;
            }
            else{
              allicon[i].classList.add(featuredata.feature[i].icon);
              allparag[i].innerHTML=featuredata.feature[i].paragraph;
              allicon2[i].classList.add(featuredata.feature[i].icon);
              allparag2[i].innerHTML=featuredata.feature[i].paragraph;
            }
          }
        }
      }

      featurerequest.open("GET","js/data.json",true);
      featurerequest.send();
}

featuresection();


//function to show popup

document.querySelector(".feature button").onclick=function(){
  document.querySelector(".feature .overlay .properties").style.top=`${document.querySelector(".feature").offsetTop}px`;
  document.querySelector(".feature .overlay").style.display="block";
}

//function to close popup

document.querySelector(".feature .overlay .cancel").onclick=function(){
  document.querySelector(".feature .overlay").style.display="none";
}


//function to animate form

$(function(){
  "use strict";
  $(window).on("scroll",function(){
    "use strict";
    if($(window).scrollTop() > ($(".contact-us").offset().top-$(".contact-us").height())){
      $(".forminput").animate({
        "top":"0px"
      },500);
      $(".formsubmit").animate({
        "bottom":"0px"
      },500);
    }
  });
});