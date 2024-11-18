const addData = document.querySelector("#add-form");
const requestData = document.querySelector("#request-form");
let inventory = [];
let openRequests = [];

function createListItem(itemObj, index, type) {
  const { item, date, amount } = itemObj;

  //create items
  const section = document.createElement("div");
  const listItem = document.createElement("span");
  const deleteButton = document.createElement("button");

  section.classList.add("list-container");
  listItem.classList.add("list-item");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "X";
  listItem.textContent = `${date} | ${item} | ${amount}`;

  // Toggle striked class on click
  listItem.addEventListener("click", () =>
    listItem.classList.toggle("striked")
  );

  // Remove item from list on delete
  deleteButton.addEventListener("click", () => {
    if (type === "inventory") {
      inventory.splice(index, 1);
      displayList(inventory, ".inventory");
    } else {
      openRequests.splice(index, 1);
      displayList(openRequests, ".requests");
    }
  });

  section.appendChild(listItem);
  section.appendChild(deleteButton);
  return section;
}

function displayList(itemsArr, listSelector) {
  const list = document.querySelector(listSelector);
  list.textContent = "";

  itemsArr.forEach((itemObj, index) => {
    const listItem = createListItem(
      itemObj,
      index,
      listSelector === ".inventory" ? "inventory" : "requests"
    );
    list.appendChild(listItem);
  });
  
}

function addItemToList(e, type) {
  e.preventDefault();
  const itemData = document.querySelector(`#${type}-item`);
  const dateData = document.querySelector(`#${type}-date`);
  const amount = document.querySelector(`#${type}-amount`);
  const newObj = {
    item: itemData.value,
    date: dateData.value,
    amount: amount.value,
  };

  if (type === "add") {
    inventory.push(newObj);
    displayList(inventory, ".inventory");
  } else if (type === "request") {
    openRequests.push(newObj);
    displayList(openRequests, ".requests");
  }
  resetFormData(itemData, dateData, amount);
}

// Reset form fields
function resetFormData(item, date, amount) {
  item.value = "";
  date.value = "";
  amount.value = "";
}

// Event Listeners
addData.addEventListener("submit", (e) => addItemToList(e, "add"));
requestData.addEventListener("submit", (e) => addItemToList(e, "request"));
