import $ from 'jquery';
import _ from 'underscore';
import Task from './models/task.js';
import TaskList from './collections/task_list.js';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon',
    completed: true
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer',
    completed: false
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???',
    completed: true
  }
];

var myTask = new Task({
  title: "Create a Model!",
  description: "Need to extend Backbone.Model",
  completed: false
});

var otherTask = new Task({
  title: "Blaaa",
  description: "blablbalba",
  completed: false
});

var anotherTask = new Task({
  title: "New task, yo",
  description: "weee",
  completed: true
});

var myTaskList = new TaskList(taskData);

var getFormData = function() {
  var formTitle = $("#title").val();
  $("#title").val('');

  // get checkbox and find out if it's checked - true/false
  var formDescription = $("#description").val();
  $("#description").val('');

  // clear checkbox get the property 'checked' and force is to false
  var formCompleted = $('#completed-checkbox').is(':checked');
  $('#completed-checkbox').prop('checked', false);

  return {
    title: formTitle,
    description: formDescription,
    completed: formCompleted
  };
};

var render = function(task) {
  // get the template using jQuery
  var templateText = $('#taskItemTemplate').html();

  // create an underscore template object
  var templateObject = _.template(templateText);

  // Fill in the ERB wth data from our task
  var compiledHTML = templateObject(task.toJSON());

// append the result to the DOM
  $('.todo-items').append(compiledHTML);
};

var renderList = function(taskList) {
  $(".todo-items").empty();
  taskList.each(function(task){
    render(task);
  });
};

$(document).ready(function() {
  // render(myTask);
  // render(otherTask);
  // render(anotherTask);

  $("#add-task").click(function() {
    var formData = getFormData();
    var newTask = new Task(formData);
    // console.log(formData.completed);
    render(newTask);
    console.log(newTask.get("completed"));
  });

  // myTaskList.each(function(task) {
  //   render(task);
  // });

  renderList(myTaskList);
  renderList(myTaskList);

});



// console.log(myTask);
//
// console.log(
//   myTask.get("title")
// );
//
// myTask.set("completed", true);
//
// myTask.set({
//   title: "This is Backbone!",
//   description: "Great!"
// });
//
// console.log("Completed? " + myTask.get("completed"));
// console.log(myTask);
// console.log("Yippee!!");
// $('#test-area').append($('<p>Hello World!</p>'));
