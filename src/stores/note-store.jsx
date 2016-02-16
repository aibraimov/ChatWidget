var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getNotes: function() {
  },
  triggerChange: function() {
    this.trigger('change', this.notes);
  }
});
