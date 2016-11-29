var TaskView = Backbone.View.extend({
  //tagName: 'li',
  initialize: function(options) {
    //this.task = options.task;
    this.template = options.template;
    this.listenTo(this.model, "change", this.render);
  },
  events: {
    'click .complete-button': 'completeHandler',
    'click .delete-button': 'deleteTask'
  },
  deleteTask: function() {
    this.model.destroy();
  },
  completeHandler: function() {
    console.log("Handler run!");
    this.model.toggleComplete();
    //this.render();
  },
  render: function() {
    // could use .toJSON() instead of .attributes
    // reconnect all Event Handlers
    this.delegateEvents();

    var html = this.template({task: this.model.attributes});
    this.$el.html(html);

    // Enable chained calls
    // This is important enough that we'll leave it in, but
    // we wont talk about it until later.
    return this;
  }
});


// task_view.js
export default TaskView;
