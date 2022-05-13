import { LightningElement, track } from 'lwc';
import fetchAllTasks from "@salesforce/apex/ToDoListController.fetchAllTasks";
import insertTask from "@salesforce/apex/ToDoListController.insertTask";
import deleteTaskFromDatabase from "@salesforce/apex/ToDoListController.deleteTask";


export default class Todo extends LightningElement 
{

    loading=false

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
         this.loading=true

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
        }).finally(()=>
        {
            this.loading=false
        })
     }

     handleAddTask()
     {
         this.loading=true

        insertTask({subject:this.newTask}).then((result)=>{
            if(result)
            {
                console.log("Task insertion has been successful")
                this.toDoTasks.push({id: this.toDoTasks.length, Subject: result.Subject, recordId: result.Id})
                this.template.querySelector('.taskInput').value=null
            }
            else console.log("Task insertion failed")
        }).catch((error)=>{
           
        }).finally(()=>
        {
            this.loading=false
        })
        

    }

    async deleteTask(event)
    {
        this.loading=true

        console.log(event.detail)

        const res = await deleteTaskFromDatabase({id: event.detail})
       
        if(res)
        {
            this.toDoTasks=this.toDoTasks.filter(todo=>todo.recordId!==event.detail)

        }
        else console.error("Deletion failed")

        this.loading=false
  
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