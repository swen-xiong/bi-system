import { INumberFilter, IDateFilter } from './filter';
/**
 * cube intreface定义
 */
export interface ICube {
  id: string,
  name: string,
  // filter?: INumberFilter | IDateFilter,
  filter?: any,
  [propName: string]: any
}
