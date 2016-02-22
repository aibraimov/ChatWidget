import Reflux from 'reflux';

import Actions from '../Actions';

const NoteStore = Reflux.createStore({
  listenables: [Actions],
  getNotes() {
  },
  triggerChange() {
    this.trigger('change', this.notes);
  }
});

export default NoteStore;
