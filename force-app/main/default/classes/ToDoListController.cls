public with sharing class ToDoListController 
{
    @AuraEnabled
    public static List<Task> fetchAllTasks()
    {
        System.debug('Fetching tasks');
        List<Task> tasks = [SELECT Subject, Id FROM Task WHERE OwnerId=:UserInfo.getUserId()];
        System.debug('Tasks: '+tasks);
        return tasks;
    }

    
    @AuraEnabled
    public static Task insertTask(String subject)
    {
        System.debug('Attempting to insert task');

        try 
        {
            Task task = new Task(
                Subject=subject, 
                OwnerId = UserInfo.getUserId(),
                Status='Not Started',
                Priority='Normal'
                );

            insert task;
            return task;
        } catch (Exception e) {
            System.debug(e.getMessage());
        }

        return null;

    }

    @AuraEnabled
    public static Boolean deleteTask(Id id)
    {
        try 
        {
            Database.delete(id);
            return true;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return false;
        }
    }

}
