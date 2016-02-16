'use strict';

import Reflux from 'reflux';

import Actions from '../actions';

module.exports = Reflux.createStore({
  listenables: [Actions],
  getNotes: function() {
  },
  triggerChange: function() {
    this.trigger('change', this.notes);
  }
});
