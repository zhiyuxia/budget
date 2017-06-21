const DOMStrings = {
  inputType: ".add-type",
  inputDescription: ".add-description",
  inputValue: ".add-value",
  inputBtn: ".add-btn",
  incomeList: ".income-list",
  expenseList: ".expense-list",
  incValue: ".inc-value",
  expValue: ".exp-value",
  budgetValue: ".value",
  expPercentage: ".exp-percentage",
  bottomContainer: ".bottom-container",
  itemPercentage: ".item-percentage",
};

const formatNumber = (type, num) => {
  num = num.toFixed(2);
  num = num.toString().replace(/(^|\s)\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
  if (type === "inc") {
    num = `+ ${num}`;
  } else {
    num = `- ${num}`;
  }
  return num;
};

const getInput = () => {
  let inputDetails = {
    type: document.querySelector(DOMStrings.inputType).value,
    description: document.querySelector(DOMStrings.inputDescription).value,
    value: Number(document.querySelector(DOMStrings.inputValue).value),
  };
  return inputDetails;
};

const addItemList = (type, obj) => {
  let value;
  if (type === "inc") {
    value = formatNumber(type, obj.value); 
    document.querySelector(DOMStrings.incomeList).insertAdjacentHTML("beforeend",
      `<div class="item clearfix" id="inc-${obj.id}">
     <div class="item-description">${obj.description}</div>
     <div class="item-right clearfix">
     <div class="item-value">${value}</div>
     <div class="item-delete">
     删除
     </div>
     </div>
     </div>`,
    );
  } else if (type === "exp") {
    value = formatNumber(type, obj.value); 
    document.querySelector(DOMStrings.expenseList).insertAdjacentHTML("beforeend",
      `   <div class="item clearfix" id="exp-${obj.id}">
                        <div class="item-description">
                            ${obj.description}
                        </div>
                        <div class="right clearfix">
                            <div class="item-value">${value}</div>
                            <div class="item-percentage">-10%</div>
                            <div class="item-delete">删除</div>
                        </div>
                    </div>`);
  }
};

const displayBudget = (obj) => {
  obj.budget = Math.abs(obj.budget);
  let type;
  if (obj.expTotal > obj.incTotal) {
    type = "exp";
  } else {
    type = "inc";
  }
  document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(type, obj.budget);
  document.querySelector(DOMStrings.incValue).textContent = formatNumber("inc", obj.incTotal);
  document.querySelector(DOMStrings.expValue).textContent = formatNumber("exp", obj.expTotal);
  if (obj.percentage === -1) {
    document.querySelector(DOMStrings.expPercentage).textContent = "--";
  } else {
    document.querySelector(DOMStrings.expPercentage).textContent = `${obj.percentage}%`;
  }
};
const deleteItemList = (id) => {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
};

const displayPercentage = (arr) => {
  let arrLike = document.querySelectorAll(DOMStrings.itemPercentage);
  let arrList = Array.from(arrLike);
  arrList.forEach((curr, index) => {
    if (arr[index] === -1) {
      curr.textContent = `--`;
    } else {
      curr.textContent = `${arr[index]}%`;
    }
  });
};
export {
  deleteItemList,
  displayBudget,
  DOMStrings,
  getInput,
  addItemList,
  displayPercentage,
};