var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },

  render: function() {
    var html = this.template({task: this.task});
    this.$el.html(html);

    // Enable chained calls
    // This is important enough that we'll leave it in, but
    // we wont talk about it until later.
    return this;
  }
});


// task_view.js
export default TaskView;
