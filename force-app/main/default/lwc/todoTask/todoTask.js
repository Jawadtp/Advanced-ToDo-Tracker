import { LightningElement, api } from 'lwc';

export default class TodoTask extends LightningElement 
{
    @api taskName;
    @api taskId;

    handleDeleteTask()
    {

        const deleteTaskEvent = new CustomEvent('deletetask', { detail: this.taskId });
        this.dispatchEvent(deleteTaskEvent)
    }
}