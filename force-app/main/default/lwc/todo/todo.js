import { LightningElement, track } from 'lwc';
import fetchAllTasks from "@salesforce/apex/ToDoListController.fetchAllTasks";
import insertTask from "@salesforce/apex/ToDoListController.insertTask";
import deleteTaskFromDatabase from "@salesforce/apex/ToDoListController.deleteTask";


export default class Todo extends LightningElement 
{

    connectedCallback()
    {

        this.fetchTasksAndPopulate()
    }
     newTask=''
    
     @track
     toDoTasks=[]
    

     resetTasks()
     {
         this.toDoTasks=[]
     }

     fetchTasksAndPopulate()
     {
        fetchAllTasks().then(result=>{
            console.log("Fetched data: "+JSON.stringify(result))
            result.forEach(task => 
                {
                     this.toDoTasks.push({
                         id: this.toDoTasks.length,
                         Subject: task.Subject,
                         recordId: task.Id
                        })
                 });
        }).catch(error=>{
            console.error("Error: ",error)
        })
     }

     handleAddTask()
     {
        insertTask({subject:this.newTask}).then((result)=>{
            if(result)
            {
                console.log("Task insertion has been successful")
                this.toDoTasks.push({id: this.toDoTasks.length, Subject: result.Subject, recordId: result.Id})
                this.template.querySelector('.taskInput').value=null
            }
            else console.log("Task insertion failed")
        }).catch((error)=>{
           
        })
      

    }

    async deleteTask(event)
    {
        console.log(event.detail)

        const res = await deleteTaskFromDatabase({id: event.detail})
        if(res)
        {
            this.toDoTasks=this.toDoTasks.filter(todo=>todo.recordId!==event.detail)

        }
        else console.error("Deletion failed")
    /*   deleteTaskFromDatabase({id: event.detail}).then((result)=>
        {
            console.log("Delete result", result)
       //     console.log("ToDo array after deletion: "+JSON.stringify(this.toDoTasks))

        }).error((error)=>{
            console.error(error)
        })
        */

    }
     onTaskTextChange(event)
     {
         this.newTask=event.target.value
     }

     refreshTodoList()
     {
         this.resetTasks()
         this.fetchTasksAndPopulate()
         
     }

     
     
}