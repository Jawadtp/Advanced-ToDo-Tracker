import { LightningElement, api } from 'lwc';

export default class TodoTask extends LightningElement 
{
    @api taskName;
    @api taskId;
    @api recordId;

    error
    stack

    handleDeleteTask()
    {
        console.log("Handle delete task called for id: ", this.recordId)
        const deleteTaskEvent = new CustomEvent('deletetask', { detail: this.recordId });
        this.dispatchEvent(deleteTaskEvent)
    }

    
    errorCallback(error, stack) 
    {
        this.error = error
    }
}