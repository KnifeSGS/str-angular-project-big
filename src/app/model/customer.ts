import { Address } from './address';
export class Customer {
  id: number=0;
  firstName: string='';
  lastName: string='';
  email: string='';
  address: Address=new Address();
  active: boolean=false;
}
export class Attribute {
  title:string='';
  type:string='';
  obj:string='';
  order:string='';
  headOrder:number;
}

export const CustomerAttributesArray = [
  {key:'id',        title:"ID",        type:"text",  obj:"",         order:"", columnOrder_kk:0},
  {key:'firstName', title:"Firstname", type:"text",  obj:"",         order:"", columnOrder_kk:1},
  {key:'lastName',  title:"Lastname",  type:"text",  obj:"",         order:"", columnOrder_kk:2},
  {key:'email',     title:"Email",     type:"text",  obj:"",         order:"", columnOrder_kk:3},
  {key:'zip',       title:"Zip",       type:"text",  obj:"address",  order:"", columnOrder_kk:4},
  {key:'country',   title:"Country",   type:"text",  obj:"address",  order:"", columnOrder_kk:5},
  {key:'city',      title:"City",      type:"text",  obj:"address",  order:"", columnOrder_kk:6},
  {key:'street',    title:"Street",    type:"text",  obj:"address",  order:"", columnOrder_kk:7},
  {key:'notes',     title:"Notes",     type:"text",  obj:"address",  order:"", columnOrder_kk:8},
  {key:'active',    title:"Active",    type:"check", obj:"",         order:"", columnOrder_kk:9},
]

export class Statistic {
  totalNumber: number = 0;
  activeNumber: number = 0;
  inactiveNumber: number = 0;
}