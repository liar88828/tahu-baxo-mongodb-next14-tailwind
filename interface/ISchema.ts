export interface ISchema {
  id : any;
  update : any;
  create : any;

  createValid(data : Object) : Object;

  updateValid(data : Object,) : Object;

  // idValid(id : unknown) : unknown
}
