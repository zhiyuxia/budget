import {deleteItemList, DOMStrings, getInput, addItemList, displayBudget, displayPercentage} from './ui';
import { addItem, calculateBudget, deleteItem, calculatePercentage } from "./data";

const updatePercentage = () => {
  let percentageArr = calculatePercentage();
  displayPercentage(percentageArr);
};

const updateBudget = () => {
  let result = calculateBudget(); 
  displayBudget(result);
};

const clearInput = () => {
  document.querySelector(DOMStrings.inputDescription).value = "";
  document.querySelector(DOMStrings.inputValue).value = "";
  document.querySelector(DOMStrings.inputDescription).focus();
};

const ctrlAddItem = () => {
  let inputDetails;
  inputDetails = getInput();
  let {value, description, type} = inputDetails; 
  let newItem = addItem(type, description, value);
  addItemList(type, newItem);
  updateBudget();
  updatePercentage(); 
  clearInput();
};

const ctrlDeleteItem = (event) => {
  let idItem = event.target.parentNode.parentNode.id;
  if (idItem) {
    let idArr = idItem.split("-");
    let type = idArr[0];
    let id = Number(idArr[1]); 
    deleteItem(type, id);
    deleteItemList(idItem);
    updateBudget();
    updatePercentage(); 
  }
};

document.querySelector(DOMStrings.inputBtn).addEventListener("click", ctrlAddItem);
document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) ctrlAddItem();
});
document.querySelector(DOMStrings.bottomContainer).addEventListener("click", ctrlDeleteItem);