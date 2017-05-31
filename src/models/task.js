import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: 'DEFAULT',
    completed: false
  },
  logStatus: function() {
    console.log("Model: " + this.cid);
    console.log("Title: " + this.get("title"));
    console.log("Completed: " + this.get("completed"));
  },

  initialize: function(params) {
    console.log("Starting", params);
    this.logStatus();
  },

  toggleComplete: function() {
    if (this.get("completed")) {
      this.set("completed", false);
    } else {
      this.set("completed", true);
    }

    // var completed = this.get("completed");
    // this.set("completed", !completed);

  }

});

export default Task;
