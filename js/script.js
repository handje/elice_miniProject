// 1. 기본값 초기화
let score = 0;
let questions = [
  "What is 1 + 1?",
  "What is 2 + 3?",
  "What is 3 + 7?",
  "What is 9 + 9?",
];
let choices = [
  {
    answer: 1,
    choice1: "2",
    choice2: "4",
    choice3: "5",
    choice4: "7",
  },
  {
    answer: 2,
    choice1: "1",
    choice2: "5",
    choice3: "10",
    choice4: "11",
  },
  {
    answer: 3,
    choice1: "20",
    choice2: "30",
    choice3: "10",
    choice4: "14",
  },
  {
    answer: 4,
    choice1: "12",
    choice2: "20",
    choice3: "27",
    choice4: "18",
  },
];

//Meter array for the meter
let percent = [30, 50, 70, 100];

//Element Declarations for dom elements
let scoreElement = document.querySelector(".score");
let meterElement = document.querySelector(".meter");
let questionPElement = document.querySelector(".question-p");
let firstContainer = document.querySelector(".first-container");
let secondContainer = document.querySelector(".second-container");
let bodyElement = document.querySelector("body");
let childElement = document.querySelector(".child");
let questionElement = document.querySelector(".question");
let choiceElement = document.querySelector(".choices");

let i = 0;

//update the questions
function updatePage() {
  showUserName(userInfo);
  //last quiz
  if (i > 3) {
    //console.log("end");
    firstContainer.parentNode.removeChild(firstContainer);
    secondContainer.parentNode.removeChild(secondContainer);
    bodyElement.innerHTML = `
        <h1 class="result" style="color: #5AA7EB;">Total score: ${score}</h1>
        <a href="quiz.html"><button class="start-btn" >Play Again</button></a>
      `;
    return;
  }
  //quiz 번호
  questionPElement.innerText = `Question ${i + 1}/4`;

  //진행도
  meterElement.setAttribute("value", percent[i]);

  scoreElement.innerText = score;
  questionElement.innerText = questions[i];

  choiceElement.innerHTML = `
    <div class="parent">
        <div class="child1" onclick="checkAnswer(${choices[i].answer}, 1)"><div class="child-inner">A</div>${choices[i].choice1}</div>
        <div class="child2" onclick="checkAnswer(${choices[i].answer}, 2)"><div class="child-inner">B</div>${choices[i].choice2}</div>
        <div class="child3" onclick="checkAnswer(${choices[i].answer}, 3)"><div class="child-inner">C</div>${choices[i].choice3}</div>
        <div class="child4" onclick="checkAnswer(${choices[i].answer}, 4)"><div class="child-inner">D</div>${choices[i].choice4}</div>
    </div>
`;

  i++;
}

//check the answer.
function checkAnswer(ans, clicked) {
  //If the answer is same with the clicked choice
  if (ans === clicked) {
    //console.log("Correct");
    const choiceElement = document.querySelector(`.child${ans}`);
    console.log(choiceElement);

    choiceElement.style.backgroundColor = "green";
    score += 25;

    scoreElement.innerText = score;
  } else {
    console.log("Wrong");
    const choiceElement = document.querySelector(`.child${clicked}`);
    choiceElement.style.backgroundColor = "red";
  }
  //Timeout to wait for the background color to change before the page updates
  setTimeout(function () {
    updatePage();
  }, 1000);
}

//=============추가기능:login=================================
const USERNAME = "username"; //name의 key

//login input info
const login = document.querySelector(".submitForm");
const loginForm = document.querySelector(".login form");
const InputLogin = document.querySelector(".login input");

//user name을 출력할 요소
const helloUser = document.querySelector("#hello_User");

//local storage 확인
const userInfo = localStorage.getItem(USERNAME);

//function
//login
function handleLogin(event) {
  event.preventDefault();
  const name = InputLogin.value;
  login.classList.add("hidden");
  localStorage.setItem(USERNAME, name);
  showUserName(name);
}

//로그인한 user name 출력
function showUserName(name) {
  helloUser.innerText = `${name}😉`;
}

//main
if (userInfo === null) {
  //로그인 기록이 없을 경우
  loginForm.addEventListener("submit", handleLogin);
} else {
  //로그인 기록이 있을 경우
  login.classList.add("hidden");
  showUserName(userInfo);
}
