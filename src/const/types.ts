// cube类型
export const CUBE_TYPES = {
  NUMBER: 'number',           // 数值类型
  DATE: 'date',               // 日期
  AGGREGATE: 'aggregate',     // 聚合
  NORMAL: 'normal',           // 普通
}

/**
 * 筛选器常规选项卡下 选择类型
 * 1-从列表中选择
 * 2-自定义值列表
 * 3-使用全部
 */
export const CHOOSE_TYPES = {
  FROM_LIST: 1,
  CUSTOM_LIST: 2,
  ALL: 3
}

/**
 * 筛选器显示类型
 * 0-仅相关值
 * 1-数据库中所有值
 */
export const SHOW_TYPES = {
  RELATIVE: 0,
  ALL: 1
}
