let jsonData;
let selectedQuestsIds = []
let subQuestsIds = []
const table = document.querySelector("tbody");
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
fetch("https://raw.githubusercontent.com/khaled-ashraf-dev/khaled-ashraf-dev.github.io/master/data_new.json")
.then(response => response.json())
.then(data => {
  jsonData = data;
  data.forEach(quest => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="myCheckbox" id="checkbox-${quest.id}" name="checkbox-${quest.id}" value="${quest.id}">
      <span></span></td>
      <td><a href="${quest.url}" title="${quest.name}">${quest.name}
      <a href="${quest.url + "/Quick_guide"}">🗝️</a></a></td>
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
  let questId = parseInt(event.target.value);
  let questName = jsonData[questId].name;
  
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
    
    getSubQuestsIds();
    addRequiredQuests();
    addRequiredItems();
    addRequiredStats();
    

};

// Add event listener to parent element
parentElement.addEventListener("change", function(event) {
  // Check if the event target was a checkbox input and does not have the class "sub-checkbox"
  if (event.target.type === 'checkbox' && !event.target.classList.contains('sub-checkbox')) {
    checkboxChanged(event);
  }
});


function addRequiredItems() {
  requiredItemsUl.innerHTML = ``
  let requiredItemsArr = [];
  for (const i of subQuestsIds) {
    requiredItemsArr = requiredItemsArr.concat(jsonData[i].required_items);
    console.log(requiredItemsArr)
    };
  for (const i of requiredItemsArr) {
    requiredItemsUl.innerHTML += `<li>${i}</li>`;
  }
};

function addRequiredStats() {
  let icons = {
    'Attack': `<img alt="Attack" src="https://oldschool.runescape.wiki/images/thumb/Attack_icon.png/21px-Attack_icon.png?b4bce" decoding="async" srcset="/images/Attack_icon.png?b4bce 2x" data-file-width="25" data-file-height="25" width="16" height="16">`,
    'Strength': `<img alt="Strength" src="https://oldschool.runescape.wiki/images/Strength_icon.png?e6e0c" decoding="async" data-file-width="16" data-file-height="20" width="17" height="21">`,
    'Defence': `<img alt="Defence" src="https://oldschool.runescape.wiki/images/Defence_icon.png?ca0cd" decoding="async" data-file-width="17" data-file-height="19" width="19" height="21">`,
    'Ranged': `<img alt="Ranged" src="https://oldschool.runescape.wiki/images/thumb/Ranged_icon.png/21px-Ranged_icon.png?01b0e" decoding="async" srcset="/images/Ranged_icon.png?01b0e 2x" data-file-width="23" data-file-height="23" width="21" height="21">`,
    'Prayer': `<img alt="Prayer" src="https://oldschool.runescape.wiki/images/thumb/Prayer_icon.png/21px-Prayer_icon.png?ca0dc" decoding="async" srcset="/images/Prayer_icon.png?ca0dc 2x" data-file-width="23" data-file-height="23" width="21" height="21">`,
    'Magic': `<img alt="Magic" src="https://oldschool.runescape.wiki/images/thumb/Magic_icon.png/21px-Magic_icon.png?334cf" decoding="async" srcset="/images/Magic_icon.png?334cf 2x" data-file-width="25" data-file-height="23" width="21" height="19">`,
    'Runecraft': `<img alt="Runecraft" src="https://oldschool.runescape.wiki/images/thumb/Runecraft_icon.png/21px-Runecraft_icon.png?c278c" decoding="async" srcset="/images/Runecraft_icon.png?c278c 2x" data-file-width="25" data-file-height="25" width="21" height="21">`,
    'Hitpoints': `<img alt="Hitpoints" src="https://oldschool.runescape.wiki/images/thumb/Hitpoints_icon.png/21px-Hitpoints_icon.png?a4819" decoding="async" srcset="/images/Hitpoints_icon.png?a4819 2x" data-file-width="23" data-file-height="20" width="21" height="18">`,
    'Crafting': `<img alt="Crafting" src="https://oldschool.runescape.wiki/images/thumb/Crafting_icon.png/21px-Crafting_icon.png?a1f71" decoding="async" srcset="/images/Crafting_icon.png?a1f71 2x" data-file-width="24" data-file-height="22" width="21" height="19">`,
    'Mining': `<img alt="Mining" src="https://oldschool.runescape.wiki/images/thumb/Mining_icon.png/21px-Mining_icon.png?00870" decoding="async" srcset="/images/Mining_icon.png?00870 2x" data-file-width="23" data-file-height="23" width="21" height="21">`,
    'Smithing': `<img alt="Smithing" src="https://oldschool.runescape.wiki/images/Smithing_icon.png?d26c5" decoding="async" data-file-width="19" data-file-height="19" width="21" height="21">`,
    'Fishing': `<img alt="Fishing" src="https://oldschool.runescape.wiki/images/thumb/Fishing_icon.png/21px-Fishing_icon.png?15a98" decoding="async" srcset="/images/Fishing_icon.png?15a98 2x" data-file-width="24" data-file-height="23" width="21" height="20">`,
    'Cooking': `<img alt="Cooking" src="https://oldschool.runescape.wiki/images/Cooking_icon.png?a0156" decoding="async" data-file-width="19" data-file-height="21" width="19" height="21">`,
    'Firemaking': `<img alt="Firemaking" src="https://oldschool.runescape.wiki/images/thumb/Firemaking_icon.png/21px-Firemaking_icon.png?45ea0" decoding="async" srcset="/images/Firemaking_icon.png?45ea0 2x" data-file-width="23" data-file-height="23" width="21" height="21">`,
    'Woodcutting': `<img alt="Woodcutting" src="https://oldschool.runescape.wiki/images/thumb/Woodcutting_icon.png/17px-Woodcutting_icon.png?6ead4" decoding="async" srcset="/images/Woodcutting_icon.png?6ead4 2x" data-file-width="18" data-file-height="22" width="17" height="21">`,
    'Agility': `<img alt="Agility" src="https://oldschool.runescape.wiki/images/thumb/Agility_icon.png/21px-Agility_icon.png?389e0" decoding="async" srcset="/images/Agility_icon.png?389e0 2x" data-file-width="25" data-file-height="25" width="21" height="21">`,
    'Herblore': `<img alt="Herblore" src="https://oldschool.runescape.wiki/images/thumb/Herblore_icon.png/21px-Herblore_icon.png?ffa9e" decoding="async" srcset="/images/Herblore_icon.png?ffa9e 2x" data-file-width="25" data-file-height="17" width="21" height="14">`,
    'Thieving': `<img alt="Thieving" src="https://oldschool.runescape.wiki/images/thumb/Thieving_icon.png/21px-Thieving_icon.png?973fe" decoding="async" srcset="/images/Thieving_icon.png?973fe 2x" data-file-width="25" data-file-height="25" width="21" height="21">`,
    'Fletching': `<img alt="Fletching" src="https://oldschool.runescape.wiki/images/thumb/Fletching_icon.png/21px-Fletching_icon.png?15cda" decoding="async" srcset="/images/Fletching_icon.png?15cda 2x" data-file-width="25" data-file-height="25" width="21" height="21">`,
    'Slayer': `<img alt="Slayer" src="https://oldschool.runescape.wiki/images/thumb/Slayer_icon.png/20px-Slayer_icon.png?cd34f" decoding="async" srcset="/images/Slayer_icon.png?cd34f 2x" data-file-width="23" data-file-height="24" width="20" height="21">`,
    'Farming': `<img alt="Farming" src="https://oldschool.runescape.wiki/images/thumb/Farming_icon.png/21px-Farming_icon.png?558fa" decoding="async" srcset="/images/Farming_icon.png?558fa 2x" data-file-width="25" data-file-height="23" width="21" height="19">`,
    'Construction': `<img alt="Construction" src="https://oldschool.runescape.wiki/images/thumb/Construction_icon.png/21px-Construction_icon.png?f9bf7" decoding="async" srcset="/images/Construction_icon.png?f9bf7 2x" data-file-width="25" data-file-height="25" width="21" height="21">`,
    'Hunter': `<img alt="Hunter" src="https://oldschool.runescape.wiki/images/thumb/Hunter_icon.png/20px-Hunter_icon.png?8762f" decoding="async" srcset="/images/Hunter_icon.png?8762f 2x" data-file-width="22" data-file-height="23" width="20" height="21">`
  }
  console.log(icons['Attack'])

  requiredStatsUl.innerHTML = '';
  let requiredStatsObj = {};
  for (const i of subQuestsIds) {
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

  for (const key of Object.keys(requiredStatsObj)) {
    requiredStatsUl.innerHTML += `<li class="no-bullet">${icons[key]}
    ${key}: ${requiredStatsObj[key]}</li>`;
  };
  console.log(requiredStatsObj)
  
};


function getSubQuestsIds() {
  subQuestsIds = []    
    for (const i of selectedQuestsIds) {
      
      if (!subQuestsIds.includes(i)) {
        subQuestsIds.push(i)}

      for (const j of jsonData[i].required_quests) {
        if (!subQuestsIds.includes(j)) {
          subQuestsIds.push(j)
        }
      }
    };
  console.log(subQuestsIds);
};


function addRequiredQuests() {
  requiredQuestsUl.innerHTML = ``;
  for (const i of selectedQuestsIds) {
    let count = 0
    requiredQuestsUl.innerHTML += `<li class="no-bullet depth-0 bold-li">
      <input type="checkbox" id="required-quest-checkbox-${i}" class="sub-checkbox">
      <label for="required-quest-checkbox-${i}">${jsonData[i].name}</label>
      </li>`;
    for (const j of jsonData[i].required_quests) {
      let currentQuest = jsonData[j].name
      requiredQuestsUl.innerHTML += `<li class="no-bullet depth-${jsonData[i].depths[count] + 1}">
      <input type="checkbox" id="required-quest-checkbox-${j}" class="sub-checkbox">
      <label for="required-quest-checkbox-${j}">${currentQuest}</label>
      </li>`;
      count++;
  }};
}

















// Sort table
function sortTable(colIndex) {
  var table = document.getElementById("myTable");
  var rows = table.tBodies[0].rows;
  var sortedRows = Array.from(rows);

  sortedRows.sort(function(rowA, rowB) {
    var cellA = rowA.cells[colIndex].textContent.trim();
    var cellB = rowB.cells[colIndex].textContent.trim();
    return cellA.localeCompare(cellB);
  });

  if (table.getAttribute("data-sort-order") === "desc") {
    sortedRows.reverse();
    table.setAttribute("data-sort-order", "asc");
  } else {
    table.setAttribute("data-sort-order", "desc");
  }

  for (var i = 0; i < sortedRows.length; i++) {
    table.tBodies[0].appendChild(sortedRows[i]);
  }
}