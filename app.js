const addData = document.querySelector("#add-form");
const requestData = document.querySelector("#request-form");
let inventory = [];
let openRequests = [];


function displayRequests(requestsArr) {
    const list = document.querySelector(".requests");
    //reset the list to re-render with new items
    list.textContent = '';

    requestsArr.forEach((itemObj, index) => {
        let {item, date, amount} = itemObj;
        

        //create items
        const section = document.createElement("div");
        const listItem = document.createElement("span");
        const deleteButton = document.createElement("button");

        section.classList.add("list-container")
        listItem.classList.add("list-item");
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = "X"
        listItem.textContent = `${date} | ${item} | ${amount}`;

        listItem.addEventListener('click', () => listItem.classList.toggle('striked'));
        deleteButton.addEventListener('click', () => {
            openRequests.splice(index, 1)
            displayRequests(openRequests);
        });

        section.appendChild(listItem);
        section.appendChild(deleteButton);
        list.appendChild(section);
    });
};
////////////////////
///////////////////

function displayInventory(inventoryArr) {

    const list = document.querySelector(".inventory");
    //reset the list to re-render with new items
    list.textContent = '';

    inventoryArr.forEach((itemObj, index) => {
        let {item, date, amount} = itemObj;
        

        //create items
        const section = document.createElement("div");
        const listItem = document.createElement("span");
        const deleteButton = document.createElement("button");

        section.classList.add("list-container")
        listItem.classList.add("list-item");
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = "X"
        listItem.textContent = `${date} | ${item} | ${amount}`;

        listItem.addEventListener('click', () => listItem.classList.toggle('striked'));
        deleteButton.addEventListener('click', () => {
            inventory.splice(index, 1)
            displayInventory(inventory);
        });

        section.appendChild(listItem);
        section.appendChild(deleteButton);
        list.appendChild(section);
    });
};



function addItemToInventory(e, type) {
    if (type === "add") {
        e.preventDefault();
        const itemData = document.querySelector("#item");
        const dateData = document.querySelector("#date");
        const amount = document.querySelector('#add-amount');
        const newObj = {
            "item": itemData.value,
            "date": dateData.value,
            "amount": amount.value,
        };

        inventory.push(newObj);
        displayInventory(inventory);
        resetFormData(itemData, dateData, amount);
        
    } else if (type === "request") {
        e.preventDefault();
        const itemData = document.querySelector('#request-item');
        const dateData = document.querySelector('#request-date');
        const amount = document.querySelector('#request-amount');
        const newObj = {
            "item": itemData.value,
            "date": dateData.value,
            "amount": amount.value,
        };

        openRequests.push(newObj)
        displayRequests(openRequests);
        resetFormData(itemData, dateData, amount);
    }

}

function resetFormData(item, date, amount) {
    item.value = "";
    date.value = "";
    amount.value = "";
}

addData.addEventListener('submit', e => addItemToInventory(e, "add"));
requestData.addEventListener('submit', e => addItemToInventory(e, "request"));


