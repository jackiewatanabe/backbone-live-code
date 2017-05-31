import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: 'DEFAULT',
    completed: false
  }

});

export default Task;
