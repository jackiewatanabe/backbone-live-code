import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.taskData.forEach(function(task) {
      var cardOptions = {
        task: task,
        template: this.taskTemplate
      };
      var card = new TaskView(cardOptions);
      this.cardList.push(card);
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
      this.listElement.append(card.$el.html());
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
    var task = this.getInput();

    // Add the new task to our list of tasks
    this.taskData.push(task);

    // Create a card for the new task, and add it to our card list
    var card = new TaskView({
      task: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);

    // Re-render the whole list, now including the new card
    this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
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
