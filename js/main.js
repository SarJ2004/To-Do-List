import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();


// LAUNCH APP
document.addEventListener("readystatechange", (event)=>{
    if(event.target.readyState === "complete")//dom is fully loaded
    {
        initApp();//if we get to this point, we are going to launch the initApp function
    }
});

const initApp = ()=>{
    //ADD LISTENERS
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event)=>{
        event.preventDefault();//prevents the default behaviour of the form to submit the form.
        // PROcEDURAL FUNC
        processSubmission();
    })

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event)=>{
        const list = toDoList.getList();
        if(list.length){
            const confirmed = confirm("Are you sure you want to clear the entire list?");
            if(confirmed)
            {
                toDoList.clearList();
                //UPDATE PERSISITENT DATA.
                updatePersistentData(toDoList.getList());
                refreshThePage();
            }
        }
    })
    // PROCEDURAL STEPS
    // load list object
    //we have to load the locally stored list object right when the app starts.
    loadListObject();
    // refresh the page
    refreshThePage();
};

const loadListObject = ()=>{
    const storedList = localStorage.getItem("myToDoList");
    if(typeof storedList != "string"){
        return;
    }
    const parsedList = JSON.parse(storedList);
    parsedList.forEach((itemObj)=>{
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem);//we do this dor each item on the list.
    })
}

const refreshThePage = ()=>{
    clearListDisplay();
    //Render List
    renderList();
    // clear item entry field
    clearItemEntryField();
    //setfocuson item entry field
    setFocusOnItemEntry();
};

const clearListDisplay= ()=>{
    const parentElement = document.getElementById("listItems");
    //delete the contents of parent element.
    deleteContents(parentElement);
};

const deleteContents = (parentElement)=>{
    //will delete all of the  child elements of the parent element
    let child = parentElement.lastElementChild;
    while(child){//it is going to remove childs till there is a child.
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = ()=>{
    const list = toDoList.getList();//getting a list(currently empty)
    list.forEach((item)=>{
        buildListItem(item);//for each list, we have to call a helper function whicjh builds list items from taking lists as input.
    });
};

const buildListItem  = (item)=>{
    //we are creating dom elements like divs and setting attributes.
    // we will treat the below code as a prototype
//     <div class="item">
//     <input type="checkbox" id="2" tabindex="0">
//     <label for="1">sleep</label>
//     </div>

const div = document.createElement("div");
div.className = "item";
const check = document.createElement("input");
check.type = "checkbox";
check.id = item.getId();
check.tabIndex = 0;
//ADD CLICK LISTENER TO CLICK LISTNER TO CHECKBOX, AND PASS IN CHECK AS INPUT
addClickListenerToCheckbox(check);//when user clicks on that checkbox, something happpens
const label = document.createElement("label");
label.htmlFor = item.getId();//since we want the for attribute to be the id of teh checkbxo.
label.textContent = item.getItem();
div.appendChild(check);//we appended a child to the div element.
div.appendChild(label);//we appended another child to teh div element
const container = document.getElementById("listItems");
//we have to enclose the div in a container whith the id  listItems.
container.appendChild(div);

};

const addClickListenerToCheckbox= (checkbox)=>{
    checkbox.addEventListener("click", (event)=>{
        toDoList.removeItemFromList(checkbox.id);
        updatePersistentData(toDoList.getList());
        setTimeout(()=>{
            refreshThePage();
        }, 1000);
    });
};

const updatePersistentData = (listArray)=>{
localStorage.setItem("myToDoList", JSON.stringify(listArray));//stores the string data in the json form.
};

// CLEAR ITEM ENTRY FIELD
const clearItemEntryField = ()=>{
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = ()=>{
    document.getElementById("newItem").focus();//when the page loads, it will automatically set the focus on the itementry box.
};

const processSubmission = ()=>{
    const newEntryText = getNewEntry();
    if(!newEntryText.length)
    {
        return;
    }
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItemToList(toDoItem);
    // UPDATE PERSISTENT DATA
    updatePersistentData(toDoList.getList());
    refreshThePage();
    //the page needs to be refreshed and it will show the new item in the list
};

const getNewEntry = ()=>{
    return document.getElementById("newItem").value.trim();//we dont want the whitespaces to tshe left or to the right of the value
};

const calcNextItemId = ()=>{
    let nextItemId =1;//since we are starting the id from 1.
    const list = toDoList.getList();
    if(list.length>0)
    {
        nextItemId = list[list.length-1].getId()+1;//id of last item on teh list +1
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText)=>{
    const toDo = new ToDoItem();//created a new object from our todoitem class.
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;//we have to return this new item we created.
}