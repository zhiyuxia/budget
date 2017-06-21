let data = {
  allItems: {
    inc: [],
    exp: [],
  },
  totals: {
    incTotal: 0,
    expTotal: 0,
  },
  budget: 0,
  percentage: -1,
};
window.data = data;
class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }
  calPercentage() {
    if (data.totals.incTotal === 0) {
      this.percentage = -1;
    } else {
      this.percentage = Math.round((this.value / data.totals.incTotal) * 100); 
    }
  }
}

class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

}


const addItem = (type, description, value) => {
  let newItem;
  let id;
  if (data.allItems[type].length === 0) {
    id = 0; 
  } else {
    id = data.allItems[type][data.allItems[type].length - 1].id + 1;
  }
  if (type === "inc") {
    newItem = new Income(id, description, value);
  } else {
    newItem = new Expense(id, description, value);
  }
  data.allItems[type].push(newItem);
  return newItem;
};

const calculateBudget = () => {
  let incomeTotal = data.allItems.inc.reduce((acc, curr) => acc + curr.value, 0); 
  let expenseTotal = data.allItems.exp.reduce((acc, curr) => acc + curr.value, 0); 
  data.totals.incTotal = incomeTotal;
  data.totals.expTotal = expenseTotal;
  data.budget = incomeTotal - expenseTotal;
  if (incomeTotal === 0) {
    data.percentage = -1;
  } else {
    data.percentage = Math.round((expenseTotal / incomeTotal) * 100);
  }
  return {
    incTotal: data.totals.incTotal,
    expTotal: data.totals.expTotal,
    budget: data.budget,
    percentage: data.percentage,
  };
};

const deleteItem = (type, id) => {
  let index = data.allItems[type].findIndex(curr => curr.id === id);
  data.allItems[type].splice(index, 1);
};
const calculatePercentage = () => {
  let percentageArr = data.allItems.exp.map((curr) => {
    curr.calPercentage();
    return curr.percentage;
  });
  return percentageArr;
};


export {
  calculateBudget,
  addItem, 
  deleteItem,
  calculatePercentage,
};