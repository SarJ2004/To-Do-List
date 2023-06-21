//we are going to create a class for our todo list.

export default class ToDoList {
    constructor(){
        this._list=[];//empty array.
    }

    getList(){//getter
        return this._list;
    }

    clearList(){//to empty out the contents of a list.
        this._list = [];
    }

    addItemToList(itemObj){
        this._list.push(itemObj);
    }

    removeItemFromList(id) {
        const list = this._list;
        for(let i =0;i<list.length;i++){
            if(list[i]._id == id){//if  list item's id is equal  to this id, we are grabbing the id  from the DOM. it will probably be a string value at that point.
            // == means same vallue
            // === means same type
                list.splice(i,1);//remove one array element at ith position.
                // the splice array method is used to add/remove lements at any position in an array.
                break;
                //did this because we will click on a  specific item in the list, and we will grab the id, which will undergo this looping, which will find the list item by id and splice it from the array.

            }
        }
    }
}