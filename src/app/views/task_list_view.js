import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Task from 'app/models/task';
import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // We'll keep track of a list of task models and a list
    // of task views.
    this.modelList = [];
    this.cardList = [];

    options.taskData.forEach(function(rawTask) {
      this.addTask(rawTask);
    }, this); // bind `this` so it's available inside forEach

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };
  },

  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

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
    'submit .new-task': 'createTask',
    'click .clear-button': 'clearInput'
  },

  createTask: function(event) {
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var rawTask = this.getInput();

    this.addTask(rawTask);

    // Re-render the whole list, now including the new card
    this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
  },

  // Turn a raw task into a Task model, add it to our list of tasks,
  // create a card for it, and add that card to our list of cards.
  addTask: function(rawTask) {
    // Create a Task from this raw data
    var task = new Task(rawTask);

    // Add the new task model to our list
    this.modelList.push(task);

    // Create a card for the new task
    var card = new TaskView({
      model: task,
      template: this.taskTemplate
    });

    // Add the card to our card list
    this.cardList.push(card);
  },

  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  },

  clearInput: function(event) {
    console.log("clearInput called!");
    this.input.title.val('');
    this.input.description.val('');
  }
});

export default TaskListView;
