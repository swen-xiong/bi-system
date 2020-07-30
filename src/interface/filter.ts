/**
 * 筛选器筛选对象intreface
 * @param name 筛选名称
 * @param value 筛选的值 如数值类型字段筛选时 筛选‘方差’对应的value
 */
export interface ICubeFilter {
  name?: string,
  value?: number
}

/**
 * 数值类型字段筛选条件
 * @param rangeType range-值范围 less-小于，至多  more-大于，至少  special-特殊值
 * @param min 最小值
 * @param max 最大值
 * @param containNull 是否包含Null值
 * @param showType 显示类型 1-仅相关值  2-数据库中的所有值
 * @param specialValue 特殊值 0-null值  1-非null值 2-所有值
 */
export interface INumberFilter extends ICubeFilter {
  rangeType: string,
  min?: number,
  max?: number,
  containNull: boolean,
  showType: number,
  specialValue?: number
}


/**
 * 数值类型字段筛选条件
 * @param rangeType relative-相对日期 range-日期范围 startDate-小于，至多  endDate-大于，至少  special-特殊值
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param containNull 是否包含Null值
 * @param showType 显示类型 1-仅相关值  2-数据库中的所有值
 * @param specialValue 特殊值 0-空日期  1-非空日期 2-所有日期
 */
export interface IDateFilter extends ICubeFilter {
  rangeType: string,
  startDate: string,
  endDate: string,
  containNull: boolean,
  showType: number,
  specialValue?: number
}

/**
 * 普通字段的筛选器对象
 */
export interface ICommonFilter {
  normal: INormal,
  wildcard: IWildcard,
  condition: ICondition,
  limit: ILimit
}

/**
 * 筛选器常规选项卡对象
 * @param checkList 选择的字段对应值的集合
 * @param showType 显示类型 1-仅相关值  2-数据库中的所有值
 * @param chooseType 选择类型 从列表中选择/自定义值列表/使用全部
 * @param isExclude 是否排除
 * @param nullIsAll 为空时是否包含所有
 * @param checkNew 打开工作簿时筛选到最新日期值（筛选字段为日期类型时）
 */
export interface INormal {
  checkList: any[],
  showType: number,
  chooseType: number,
  isExclude: boolean,
  nullIsAll: boolean,
  checkNew?: boolean
}

/**
 * 筛选器通配符选项卡对象
 * @param characters 通配符字符串
 * @param matchRule 匹配规则  包含/开头为/结尾为/精确匹配
 * @param isExclude 是否排除
 * @param nullIsAll 为空时是否包含所有
 */
export interface IWildcard {
  characters: string,
  matchRule: number,
  isExclude: false,
  nullIsAll: true
}

/**
 * 筛选器条件选项卡对象
 * @param type 条件类型  无/按字段/按公式
 * @param fieldId 字段id
 * @param filterFun 匹配方法  计数/计数(不同)/...
 * @param filterType 匹配条件  >, <, =, >=, <=, <>
 * @param filterValue 匹配值
 * @param filterMin 值范围 最小值
 * @param filterMax 值范围 最大值
 * @param formula 公式
 */
export interface ICondition {
  type: number,
  fieldId: string,
  filterFun: string,
  filterType: string,
  filterValue: number,
  filterMin: number | undefined,
  filterMax: number | undefined,
  formula: string
}

/**
 * 筛选器顶部(限制)选项卡对象
 * @param type 条件类型  无/按字段/按公式
 * @param fieldId 字段id
 * @param filterFun 匹配方法  计数/计数(不同)/...
 * @param filterType 匹配条件  顶部/底部
 * @param filterValue 匹配值（由slide中的参数列表中选择或输入）
 * @param formula 公式
 * @param formulaType 公式下 匹配条件  顶部/底部
 * @param formulaValue 公式下 匹配值
 */
export interface ILimit {
  type: number,
  fieldId: string,
  filterFun: string,
  filterType: string,
  filterValue: number,
  formula: string,
  formulaType: string,
  formulaValue: number,
}
