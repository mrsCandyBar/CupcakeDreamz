import createStore  from  './_store.js';
import Build  from  './_build.js';
import batterDispatcher from './batterDispatcher';

let Store = new createStore();

export default class {

  constructor() {
    this.store    = Store;
    this.container = this.store['$dom']['main'],
    this.actions   = this.store['$dom']['actions']
      this.init();
  }

  init() {
    this.createActions(this.store);
  }

  createActions(store) {
      this.actions = {
          randomize   : this.actions.childNodes[0]
      }

      this.bindUIevents(store);
      this.actions['randomize'].click();
  }

  bindUIevents(store) {
      this.actions['randomize'].onclick = function(event) {
          let returnObj = Build.randomItem(store);
          batterDispatcher.dispatch({
              actionType: 'sent',
              payload: returnObj
          });
      };
  };
};