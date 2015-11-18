import Component from "./Component";
import {ComponentClass} from "./Component";

var initBuilder = function(target:any, propKey) {
  target._builders = target._builders || {}
  target._builders[propKey] = target._builders[propKey] || {}
  return target._builders[propKey]
}

export type ComponentType = ComponentClass<any>

interface ComponentOptions {
  css?:string
  qa?:string
  states?:Object
}

interface FieldOptions extends ComponentOptions {
  itemQA?:string
  itemCSS?:string
  itemType?:ComponentType
}

export function field(componentClass:ComponentType, options:FieldOptions = {}){
  return function(target:any, propKey:string){
    var annotation = initBuilder(target, propKey)
    annotation.type = componentClass
    annotation.setters = options
  }
}

export function defaults(options:FieldOptions){
  return function(target:any){
    target.prototype.defaults = options
  }
}
