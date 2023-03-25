let jsonData;
let selectedQuestsIds = []
const table = document.querySelector("tbody");
const infoDiv = document.querySelector("#quest-info")
const infoUl = document.createElement("div");
const selectedQuestsUl = document.querySelector("#selected-quests-ul")
const requiredQuestsUl = document.querySelector("#required-quests-ul")
const requiredItemsUl = document.querySelector("#required-items-ul")
const recommendedItemsUl = document.querySelector("#recommended-items-ul")
const requiredStatsUl = document.querySelector("#required-stats-ul")
const awardsUl = document.querySelector("#awards-ul")


// Get a parent element that contains the checkboxes
const parentElement = document.getElementById('parent-element');

// get data from JSON file
fetch("https://raw.githubusercontent.com/khaled-ashraf-dev/khaled-ashraf-dev.github.io/master/quests.json")
.then(response => response.json())
.then(data => {
  jsonData = data;
  data.forEach(quest => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="myCheckbox" id="checkbox-${quest.id}" name="checkbox-${quest.id}" value="${quest.id}">
      <span></span></td>
      <td><a href="${quest.url}" title="${quest.name}">${quest.name}</a></td>
      <td>${quest.difficulty}</td>
      <td>${quest.length}</td>
      <td>${quest.members ? "No" : "Yes"}</td>
      
    `;
    table.appendChild(row);
  });
})
.catch(error => console.log(error));  



// Define a function to be called when a checkbox is checked
function checkboxChanged(event) {
  // Do something here when a checkbox is checked
  let questId = event.target.value;
  let questName = jsonData[questId].name;
  let required = jsonData[questId].required_quests;
  
  if (event.target.checked) 
    {
      selectedQuestsUl.innerHTML += `<li id="selected-li-${questId}">${questName}</li>`;
      selectedQuestsIds.push(questId);
    }
    else
    {
      let selected_li = document.getElementById(`selected-li-${questId}`);
      selected_li.remove();
      selectedQuestsIds.splice(selectedQuestsIds.indexOf(questId), 1);
    };
    
    addRequiredItems();
    addRequiredStats();
    

};

// Add event listener to parent element
parentElement.addEventListener("change", function(event) {
  // Check if the event target was a checkbox input
  if (event.target.type === 'checkbox') {
    checkboxChanged(event);
  }
});


function addRequiredItems() {
  requiredItemsUl.innerHTML = ``
  let requiredItemsArr = [];
  for (const i of selectedQuestsIds) {
    requiredItemsArr = requiredItemsArr.concat(jsonData[i].required_items);
    for (const j of jsonData[i].required_quests) {
      requiredItemsArr = requiredItemsArr.concat(jsonData[j].required_items);
    }
  };
  for (const i of requiredItemsArr) {
    requiredItemsUl.innerHTML += `<li>${i}</li>`;

  }
  
};

function addRequiredStats() {
  requiredStatsUl.innerHTML = '';
  let requiredStatsObj = {};
  for (const i of selectedQuestsIds) {
    let statsDict = jsonData[i].required_stats;
    for (const key of Object.keys(statsDict)) {
      if (key in requiredStatsObj) {
        if (requiredStatsObj[key] < statsDict[key]) {
          requiredStatsObj[key] = statsDict[key];
        }
      } else {
        requiredStatsObj[key] = statsDict[key];
      }
    }
  }
  for (const i of selectedQuestsIds) {
    for (const j of jsonData[i].required_quests) {
      let statsDict = jsonData[j].required_stats;
      for (const key of Object.keys(statsDict)) {
        if (key in requiredStatsObj) {
          if (requiredStatsObj[key] < statsDict[key]) {
            requiredStatsObj[key] = statsDict[key];
          }
        } else {
          requiredStatsObj[key] = statsDict[key];
        }
      }
    }
  }
  for (const key of Object.keys(requiredStatsObj)) {
    requiredStatsUl.innerHTML += `<li>${key}: ${requiredStatsObj[key]}</li>`;
  }
  console.log(requiredStatsObj);
};