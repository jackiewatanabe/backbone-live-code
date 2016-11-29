import $ from 'jquery';

import TaskList from 'app/collections/task_list';
import TaskListView from 'app/views/task_list_view';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon'
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }
];

$(document).ready(function() {
  var taskList = new TaskList(taskData);
  var options = {
    el: $('#application'),
    model: taskList
  };
  var application = new TaskListView(options);
  application.render();
});
