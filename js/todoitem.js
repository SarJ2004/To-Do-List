export default class ToDoItem{
    constructor(){//2 properties in the constructor 
        this._id = null;//initially
        this._item = null;//initially no item no id
    }

    getId(){
        return this._id;
    }

    setId(id){
        this._id = id;
    }
    getItem(){
        return this._item;
    }

    setItem(item){
        this._item = item;
    }
}