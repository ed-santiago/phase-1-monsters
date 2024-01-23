const monsterContainer = document.querySelector("#monster-container");
const forwardButton = document.querySelector("#forward");
const backButton = document.querySelector("#back")

//Index counters
let startOfIndex = 0;
let endOfIndex = 50;

fetch("http://localhost:3000/monsters")
  .then(res => res.json())
  .then(monsters => renderMonsters(monsters))

function renderMonsters(monsters) {
  console.log(monsters.slice(-1))
  let slicedMonsters = monsters.slice(startOfIndex, endOfIndex);
  slicedMonsters.forEach(renderMonster)

  //Forward button
  forwardButton.addEventListener("click", () => {
    
    if (endOfIndex === 1050) {
      alert("Ain't no monsters here");
    } else {
      monsterContainer.innerHTML = "";
      slicedMonsters = (monsters.slice(startOfIndex += 50, endOfIndex += 50));
      console.log(startOfIndex, endOfIndex)
      slicedMonsters.forEach(renderMonster);
    }
  })

  //Back button
  backButton.addEventListener("click", () => {
    
    if (startOfIndex === 0) {
      alert("Ain't no monsters here");
    } else {
      monsterContainer.innerHTML = "";
      slicedMonsters = (monsters.slice(startOfIndex -= 50, endOfIndex -= 50));
      console.log(startOfIndex, endOfIndex)
      slicedMonsters.forEach(renderMonster);
    }
  })

  //Submit new monster
  const submitForm = document.querySelector("form")
  submitForm.addEventListener("submit", (e) => {
    const newMonster = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value
    }
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
  })
}

//Render Monsters
function renderMonster(monster) {
  const monsterCard = document.createElement("div");
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <h3>Age: ${monster.age}</h3>
    <p>${monster.description}</p>
  `
  monsterContainer.append(monsterCard);
}