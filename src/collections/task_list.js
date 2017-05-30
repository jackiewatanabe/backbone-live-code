// collections/task_list.js
// imports
import Backbone from 'backbone';
import Task from '../models/task.js';

// Create a collection type
var TaskList = Backbone.Collection.extend({
  model: Task
});


// don't forget this line or else nothing will work!!!
export default TaskList;
