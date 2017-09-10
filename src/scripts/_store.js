import BuildOptions from './_store_builder.js';
import DOMLocations from './_store_locations.js';

export default class {

  constructor() {
    this.items    = [];
    this.brief    = {};
    this.active   = 0;
    this.builder  = BuildOptions,
    this.$dom     = DOMLocations
  }

};