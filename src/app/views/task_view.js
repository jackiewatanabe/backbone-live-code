import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    console.log(this.model.attributes);
    var html = this.template({task: this.model.attributes});
    this.$el.html(html);

    // Re-attach DOM event listeners to our brand-spankin-new HTML
    this.delegateEvents();

    // Enable chained calls
    return this;
  },

  events: {
    "click .complete-button": "completeHandler"
  },

  completeHandler: function(event) {
    console.log("completeHandler called!");
    this.model.toggleComplete();
  }
});

export default TaskView;
