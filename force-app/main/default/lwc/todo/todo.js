import NumberOfFailedLogins from '@salesforce/schema/User.NumberOfFailedLogins';
import { LightningElement, track } from 'lwc';

export default class Todo extends LightningElement 
{
     newTask=''
    test='hello'
     @track
     toDoTasks = [
         {
            id: 0,
            name: "Task 1",
         },
         {
            id: 1,
            name: "Task 2",
         },
         {
            id: 2,
            name: "Task 3",
         },
         {
            id: 3,
            name: "Task 4",
         },
     ]
     handleAddTask()
     {
        this.toDoTasks.push({id: this.toDoTasks.length, name: this.newTask})
        this.template.querySelector('.taskInput').value=null
    }


    deleteTask(event)
    {
        //Note: filter creates a second array. Splice modifies the exisiting array, and is hence faster and more memory efficient.
        this.toDoTasks=this.toDoTasks.filter(todo=>todo.id!==event.detail)
    }
     onTaskTextChange(event)
     {
         this.newTask=event.target.value
     }
}