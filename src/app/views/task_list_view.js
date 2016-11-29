import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Task     from 'app/models/task';
import TaskView from 'app/views/task_view';
import TaskList from 'app/collections/task_list';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    //this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.model.forEach(function(task) {
      this.addTask(task);
    }, this); // bind `this` so it's available inside forEach

    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    this.listenTo(this.model, "update", this.render);

    this.listenTo(this.model, "add", this.addTask);

    this.listenTo(this.model, "remove", this.removeTask);


  }, // End initialize function

  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();
    // reconnects the DOM Event Handlers
    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  },

  events: {
    'click .clear-button': 'clearInput',
    'submit .new-task': 'createTask'
  },

  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  },

  createTask: function(event) {
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = new Task(this.getInput());

    // Add the new task to our list of tasks
    this.model.add(task);

    // Clear the input form so the user can add another task
    this.clearInput();
  }, // end createTast();

  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  }, // end getInput();
  addTask: function(task) {
    var card = new TaskView({
      model: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);
  },
  removeTask: function(model, collection, options) {
    var filteredList = [];
    for(var i = 0; i < this.cardList.length; i++) {
      if(this.cardList[i].model == model) {
        console.log("Found the bugger!");
      } else {
          filteredList.push(this.cardList[i]);
      }
    }
    this.cardList = filteredList;

  }

});


// task_list_view.js
export default TaskListView;
