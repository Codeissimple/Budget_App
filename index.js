//Data module
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on 'inc' or 'exp' type
      if (type === "inc") {
        newItem = new Income(ID, des, val);
      } else if (type === "exp") {
        newItem = new Expense(ID, des, val);
      }
      //push the new item into the data structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    },

    testing: function() { //testing purposes
      console.log(data);
    }
  };
})();

//UI module

var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputvalue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expense__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputvalue).value
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      //create HTML string with placeholder text

      if(type==='inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {   
        element = DOMstrings.expenseContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }

      //Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', odj.description);
      newHtml = newHtml.replace('%value%', odj.value);
        //Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Controller module

var controller = (function(BudgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UIController.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
        budgetController.testing(); // testing purposes
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;
    //1) Get the input data value
    input = UICtrl.getInput();
    //2) Add the item to the budget controller
    budgetController.addItem(input.type, input.description, input.value);
    //3) Add the item to the user interface
    //4) Calculate the budget {}
    //5) Display the budget on the UI
  };

  return {
    init: function() {
      console.log("started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
