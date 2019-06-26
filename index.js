// BUDGET CONTROLLER
var budgetController = (function(){
        
        //Constructor Function for Expense
        var Expense = function(id,desc,val)
        {
            this.id =id;
            this.description = desc;
            this.value = val;
        };
 
        //Constructor Function for income
        var Income = function(id,desc,val)
        {
            this.id =id;
            this.description = desc;
            this.value = val;
        };
 
        // Data Structure for Budget Controller
        /*
            1. Keeps track of all income and expenses.
 
            2. Keeps track of Budget for month.
 
            3. percentages for income and expenses
 
            4. Overall percentages
        */
        // we will create an object where we will put all the data
 
        var data = {
 
            allItems:{
                    // For keeping track of all expenses
                    exp: [],
                    // For keeping track of all incomes
                    inc: [] 
            },
            totals:{
                    exp: 0,
                    inc: 0
            }
        };
 
        return {
 
            // method to add a new Item
            addItem:function(type,desc,val)
            {
                var newItem,ID;
 
                // 1. Create new ID
                if(data.allItems[type].length > 0)
                {
                        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                }else
                {
                    ID = 0;
                }
                
                // 2. Create new Item based on income or expenses
                if(type === 'exp'){
                        newItem = new Expense(ID,desc,val);
                } else if (type === 'inc'){
                        newItem = new Income(ID,desc,val);
                }
 
                // 3. Push the item into data Structure
                data.allItems[type].push(newItem);
 
                // 4. Return the new Item
                return newItem;
            },
 
            // For testing whether income and expenses are getting added to data structure or not.
            testing:function()
            {
                console.log(data);
            }
        };
})();
 
// UI CONTROLLER
var UIController = (function(){
    
    var DOMStrings = {
            inputType : ".add__type",
            inputDesc : ".add__description",
            inputValue : ".add__value",
            inputBtn : ".add__btn",
            incomeContainer: ".income__list",
            expensesContainer:".expenses__list"
    };
 
    return{
        // method to return object of all the 3 user input in User Interface
        getinput: function(){
           return{
                type : document.querySelector(DOMStrings.inputType).value,
                description : document.querySelector(DOMStrings.inputDesc).value,
                value : document.querySelector(DOMStrings.inputValue).value
           };
        },
 
        // Method to Add List Item to UserInterface
        addListItem:function(obj, type)
        {
            var html,newhtml,element;
            // 1. Create HTML strings with placeholders
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // 2. replace the placeholder text with some actual data
            newhtml = html.replace('%id%', obj.id);
            newhtml = html.replace('%description%', obj.description);
            newhtml = html.replace('%value%',obj.value);
            // 3. Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        },
 
        // method to get DOM Strings
        getDOMStrings: function()
        {
            return DOMStrings;
        }
    };
})();
 
// GLOBAL APP Controller
var controller = (function(budgetCtrl,UICtrl){
    
    // Created a initialization function
    var setupEventListeners = function()
    {
            // Get DOM Strings from UI Controller
            var DOM = UICtrl.getDOMStrings();
 
            // 1. Event Listener for Add button
            // 2. Used DOM string for input Button
    
            document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
 
            // Event Listener for Enter Key Press
            document.addEventListener('keypress',function(event)
            {
                // if enter is pressed.
                if(event.keyCode === 13 || event.which === 13)
                {
                        ctrlAddItem();
                }
                        
            });
    };
 
    // Implemented DRY principle - instead of repeating code for Add button and Enter key, created this function
    var ctrlAddItem = function() {
 
                // 1. Get the data from input Fields
                var input = UICtrl.getinput();
                console.log("User input is "+ input.type,input.description,input.value);
                // 2. Add the items to budget Controller
                var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
                // 3. Add the item to UI
                UICtrl.addListItem(newItem,input.type);
                // 4. Calculate the Budget
                // 5. Display the Budget on the User Interface
    };
 
    return{
        init:function()
        {
            console.log("Application starting point");
            setupEventListeners();
        }
    };
})(budgetController,UIController);
 
 
// used the init method to start application
 
controller.init();
