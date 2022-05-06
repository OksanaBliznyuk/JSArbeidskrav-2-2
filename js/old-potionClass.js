// create studen array
var studentArray = [];

var characterArray = [];

async function getcharacters(url) {
  const character = await fetch(url);
  const jsondata = await character.json();
  console.log(jsondata);

  jsondata.forEach((character) => {
    characterArray.push(character);
  });
}

// listCharacters();

getcharacters(
  "https://raw.githubusercontent.com/KostaSav/hp-api/master/data/characters.json"
).then(() => {
  listCharacters();
  fillStudentArray();
});

var cardsDiv = document.getElementById("classRoom");
cardsDiv.visibility = "hidden";

function listCharacters() {
  var teacherBox = document.getElementById("teacher");
  for (let i = 0; i < characterArray.length; i++) {
    if (characterArray[i].name == "Severus Snape") {
      console.log("Severus");
      teacherBox.innerHTML = `
                  <img src="${newImageUrl(characterArray[i].image)}" alt="" />

      
      <h2>${characterArray[i].name}</h2>
      <h4>${"2022" - characterArray[i].yearOfBirth}</h4>`;
    }
  }
}

function newImageUrl(url) {
  let orgUrl = url;
  return (
    "https://raw.githubusercontent.com/KostaSav/hp-api/master/public/images/" +
    orgUrl.split("/").pop()
  );
}

//Snakkebobble (input id=text):

let buttonElement = document.getElementById("text");

function hiddenBubble() {
  paragraph.style.visibility = "hidden";
}

function showBubble() {
  paragraph.style.visibility = "visible";
}

buttonElement.addEventListener("mouseleave", hiddenBubble);
buttonElement.addEventListener("mouseover", showBubble);

//Start undervisning button (div class=click):

var classroomBtn = document.getElementById("classroom-btn");
classroomBtn.onclick = showStudents;

function startUndervisning() {
  alert("Welkommen til klassen!");
}

function showStudents() {
  cardsDiv.visibility = "visible"; //.style.visibility = "visible";

  var classRoom = document.getElementById("classRoom");
  let currentStudent = 0;
  let studentNumber = "";
  for (let i = 1; i < 11; i++) {
    studentNumber = "student-" + i;
    arrayNumber = i;
    currentStudentFrame = document.getElementById(studentNumber);
    currentStudentFrame.innerHTML = `
                  <img src="${newImageUrl(
                    studentArray[arrayNumber].image
                  )}" alt="" style="width: 240px; height: 240px;" />

      
      <h3>${studentArray[arrayNumber].name}</h3>
      <p>${studentArray[arrayNumber].house}</p>`;
  }
}
// fill array with 10 random students
// define function fillStudentArray()
function fillStudentArray() {
  let randomStudent = 1;
  let studentNumber = "";
  for (let i = 1; i < 11; i++) {
    randomStudent = Math.floor(Math.random() * characterArray.length);
    studentArray[i] = characterArray[randomStudent];
  }
}

var removeStudent = confirm("Er du sikkert?");
if (removeStudent) {
} else {
}
