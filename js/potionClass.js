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
cardsDiv.style.display = "none";

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

//Snakkebobble

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

function showStudents(refresh) {
  cardsDiv.style.display = "grid";
  if (refresh) fillStudentArray();

  cardsDiv.visibility = "visible"; //.style.visibility = "visible";

  var classRoom = document.getElementById("classRoom");
  let currentStudent = 0;
  let studentNumber = "";
  var imageUrl;
  for (let i = 0; i < 10; i++) {
    studentNumber = "student-" + (i + 1);
    arrayNumber = i;
    currentStudentFrame = document.getElementById(studentNumber);
    if (studentArray[arrayNumber].image != "") {
      imageUrl = newImageUrl(studentArray[arrayNumber].image);
    } else {
      // imageUrl = "/Images/monster;
      switch (studentArray[arrayNumber].name) {
        case "Ritchie Coote":
          imageUrl = "/Images/monster-1.jpg";
          break;
        case "Penelope Clearwater":
          imageUrl = "/Images/monster-2.jpg";
          break;
        case "Sally-Anne Perks":
          imageUrl = "/Images/monster-3.jpg";
          break;
        case "Melinda Bobbin":
          imageUrl = "/Images/monster-4.jpg";
          break;
        case "Bradley":
          imageUrl = "/Images/monster-7.jpg";
          break;
        case "Terry Boot":
          imageUrl = "/Images/monster-8.jpg";
          break;
        case "Andrew Kirke":
          imageUrl = "/Images/monster-9.jpg";
          break;
        case "Rose Zeller":
          imageUrl = "/Images/monster-10.jpg";
          break;
        default:
          imageUrl = "/Images/monster-8.jpg";
      }
    }
    currentStudentFrame.innerHTML = `
                  <img src="${imageUrl}" alt="" style="width: 180px; height: 200px;" />

      
      <h3>${studentArray[arrayNumber].name}</h3>
      <p>${studentArray[arrayNumber].house}</p>
      <input type="button" id="remove-btn" onClick="deleteStudent(${arrayNumber})" value="Slett meg!" />`;
  }
}

function fillStudentArray() {
  let randomStudent = 1;
  let studentNumber = "";
  let existingStudent = false;
  let finished = false; // finished if i=10 or existingStudent=true
  let i,
    i2 = 0;

  for (let i = 0; i < 10; i++) {
    existingStudent = false;
    randomStudent = Math.floor(Math.random() * characterArray.length);
    while (!characterArray[randomStudent].hogwartsStudent || existingStudent) {
      randomStudent = Math.floor(Math.random() * characterArray.length);
      for (i2 = 0; i2 < i; i2++) {
        if (studentArray[i2] == characterArray[randomStudent]) {
          existingStudent = true;
          randomStudent = Math.floor(Math.random() * characterArray.length);
        } else {
          existingStudent = false;
        }
      }
    }
    studentArray[i] = characterArray[randomStudent];
    existingStudent = false;
  }
  console.log(studentArray);
}

function deleteStudent(studentArrayNumber) {
  let reallyDelete = confirm(
    "Vil du virkelig slette " + studentArray[studentArrayNumber].name + "?"
  );

  if (reallyDelete) {
    studentArray.splice(studentArrayNumber, 1);

    let randomStudent = 1;

    // and make sure it is someone who is not already there
    existingStudent = false;
    finished = false;
    i = 0;

    randomStudent = Math.floor(Math.random() * characterArray.length);

    while (!finished) {
      while (i <= 10) {
        if (studentArray[i] == characterArray[randomStudent]) {
          existingStudent = true;
          i = -1;
          randomStudent = Math.floor(Math.random() * characterArray.length);
          alert("Vi trakk en eksisterende student - må trekke på nytt!");
        }
        i++;
      }
      if (!existingStudent) {
        finished = true;
      }
    }

    studentArray[9] = characterArray[randomStudent];

    // refresh student view
    showStudents(false);
  }
}
