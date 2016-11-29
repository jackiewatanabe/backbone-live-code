import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
  },

  render: function() {
    console.log(this.model.attributes);
    var html = this.template({task: this.model.attributes});
    this.$el.html(html);

    // Enable chained calls
    return this;
  }
});

export default TaskView;
