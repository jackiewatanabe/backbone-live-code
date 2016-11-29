import Backbone from 'backbone';

// task.js

var Task = Backbone.Model.extend({
  defaults: {
    title: "Stand-in title",
    description: "Placeholder Description",
    complete: false
  },
  initialize: function(options) {
    console.log("Task Created with: " + this.get("title"));
    //this.set("description", "JavaScript is AWESOME!");
  },
  toggleComplete: function() {
    var comp = this.get("complete");
    this.set("complete", !comp);
  }
});

export default Task;
