import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Task from '../models/task.js';

console.log("****Yo breadcrumb #004***");

var TaskView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;

    this.$el.addClass("task-item column column-block");
// no parentheses on this.render because you're not calling it here... just telling listener, when 'change' happens, to call this.render
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {

    console.log("****Yo breadcrumb #4 in task_view***");
    var compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.alert': 'deleteTask',
    'click button.success': 'toggleComplete'

    // $(".button success").click(function() {
    // //   task.toggleComplete();
    // // });
  },

  toggleComplete: function(){
    // calling from toggleComplete function defined in task.js
    this.model.toggleComplete1();
    // if (this.model.get("completed")) {
    //   this.model.set("completed", false);
    // } else {
    //   this.model.set("completed", true);
    // }
    // this.render();
  },

  deleteTask: function() {
    this.model.destroy();
  }

});

export default TaskView;
