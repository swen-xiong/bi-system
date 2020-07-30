import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { ICube } from '@/interface'
import CONST from '@/const'
import store from '@/store'
import { Icon } from 'element-ui';

export interface ICubeState {
  curCube: ICube,
  row: ICube[],
  col: ICube[],
  pages: ICube[],
  filters: ICube[],
  signs: ICube[]
}

  /**
   * 验证类型为type的项中是否已包含cube
   * @param cube
   * @param type
   */
  function isCubeExist(cube: ICube, type: string, storeModule: Cube): boolean {
    if (!(type.toUpperCase() in CONST.cube.CUBE_CATEGORY)) {
      console.error('invalid type string, type must be included in CUBE_CATEGORY')
      return false;
    }
    if (type === CONST.cube.CUBE_CATEGORY.ROW && storeModule.row.includes(cube)) { return true }
    if (type === CONST.cube.CUBE_CATEGORY.COL && storeModule.col.includes(cube)) { return true }
    if (type === CONST.cube.CUBE_CATEGORY.PAGES && storeModule.pages.includes(cube)) { return true }
    if (type === CONST.cube.CUBE_CATEGORY.FILTERS && storeModule.filters.includes(cube)) { return true }
    if (type === CONST.cube.CUBE_CATEGORY.SIGNS && storeModule.signs.includes(cube)) { return true }
    return false;
  }

@Module({ dynamic: true, store, name: 'cube' })
class Cube extends VuexModule implements ICubeState {
  public curCube: ICube = {} as ICube;
  public row: ICube[] = [];
  public col: ICube[] = [];
  public pages: ICube[] = [];
  public filters: ICube[] = [];
  public signs: ICube[] = [];

  /**
   * 从类型为type的项目中添加cube
   * @param cube
   * @param type CUBE_CATEGORY中的取值  row|col|pages|filters|signs
   */
  @Mutation
  private ADD_CUBE(params: {cube: ICube, type: string}) {
    if (!params || !params.cube) { return; }
    switch (params.type) {
      case CONST.cube.CUBE_CATEGORY.ROW:
        this.row.push(params.cube);
        break;
      case CONST.cube.CUBE_CATEGORY.COL:
        this.col.push(params.cube);
        break;
      case CONST.cube.CUBE_CATEGORY.PAGES:
        this.pages.push(params.cube);
        break;
      case CONST.cube.CUBE_CATEGORY.FILTERS:
        this.filters.push(params.cube);
        break;
      case CONST.cube.CUBE_CATEGORY.SIGNS:
        this.signs.push(params.cube);
        break;
      default:
        break;
    }
  }

  /**
   * 从类型为type的项目中删除索引为index的cube
   * @param index
   * @param type CUBE_CATEGORY中的取值 row|col|pages|filters|signs
   */
  @Mutation
  private REMOVE_CUBE(params: {index: number, type: string}) {
    switch (params.type) {
      case CONST.cube.CUBE_CATEGORY.ROW:
        this.row.splice(params.index, 1);
        break;
      case CONST.cube.CUBE_CATEGORY.COL:
        this.col.splice(params.index, 1);
        break;
      case CONST.cube.CUBE_CATEGORY.PAGES:
        this.pages.splice(params.index, 1);
        break;
      case CONST.cube.CUBE_CATEGORY.FILTERS:
        this.filters.splice(params.index, 1);
        break;
      case CONST.cube.CUBE_CATEGORY.SIGNS:
        this.signs.splice(params.index, 1);
        break;
      default:
        break;
    }
  }

  @Mutation
  public SET_CUR_CUBE(cube: ICube) {
    this.curCube = cube;
  }

  @Action
  public addRowCube(cube: ICube) {
    if (this.row.indexOf(cube) > -1) {
      return
    };
    this.context.commit('ADD_CUBE', {cube, type: CONST.cube.CUBE_CATEGORY.ROW});
  }

  @Action({ commit: 'ADD_CUBE'})
  public addColCube(cube: ICube) {
    if (this.col.indexOf(cube) > -1) {
      return;
    }
    return {cube, type: CONST.cube.CUBE_CATEGORY.COL};
  }

  @Action({ commit: 'ADD_CUBE'})
  public addCube(params: {cube: ICube, type: string}) {
    if (!isCubeExist(params.cube, params.type, this)) {
      return params;
    }
  }

  @Action
  public removeCube(params: {index: number, type: string}) {
    this.context.commit('REMOVE_CUBE', params);
  }

  @Action
  public updateCube(cube: ICube) {
    this.context.commit('SET_CUR_CUBE', cube);
  }

}

export const CubeModule = getModule(Cube)
