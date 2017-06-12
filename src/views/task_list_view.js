import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import TaskView from './task_view.js';
import Task from '../models/task.js';

var TaskListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;

    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    console.log("****Yo breadcrumb #3***");
    // clear the todo-items
    this.$('.todo-items').empty();
    // saved a reference to 'this'
    var that = this;

    // looped through collection
    this.model.each(function(task) {
      // created a new view for each task
      var myTaskView = new TaskView({
        model: task,
        template: that.template,
        tagName: 'li'
      });
      // rendered the view and appended it to 'todo-items'
      that.$('.todo-items').append(myTaskView.render().el);
      console.log("****Yo breadcrumb #3xx***");
    });
    // returning this view object so you can chain functions like myView.render().el
    console.log("****Yo breadcrumb #3 end of render in task list view***");
    return this;

  },
  events: {
    "click #add-task": "addTask"
  },

  getFormData: function() {
    var formTitle = this.$("#title").val();
    this.$("#title").val('');

    // get checkbox and find out if it's checked - true/false
    var formDescription = this.$("#description").val();
    this.$("#description").val('');

    // clear checkbox get the property 'checked' and force is to false
    var formCompleted = this.$('#completed-checkbox').is(':checked');
    this.$('#completed-checkbox').prop('checked', false);

    return {
      title: formTitle,
      description: formDescription,
      completed: formCompleted
    };
  },

  addTask: function() {
    var task = new Task(this.getFormData());
     this.model.add(task);
  }
});


export default TaskListView;
