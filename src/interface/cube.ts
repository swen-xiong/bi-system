import { INumberFilter, IDateFilter } from './filter';
/**
 * cube intreface定义
 */
export interface ICube {
  id: string | number,
  name: string,
  // filter?: INumberFilter | IDateFilter,
  filter?: any,
  [propName: string]: any
}

/**
 * defined project data
 */
export interface IProjectData {
  id: string,
  name: string,
  dimension: ICube[],
  measurement: ICube[],
  collection?: ICube[],
  parameters?: ICube[]
}
