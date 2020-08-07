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

/**
 * sql方法类型分类
 * 0-全部  1-数字  2-字符串  3-日期
 * 4-类型转换  5-逻辑  6-聚合  7-计算
 */
export const SQL_FUN_TYPES = {
  ALL: 0,
  NUMBER: 1,
  STRING: 2,
  DATE: 3,
  CAST: 4,
  LOGIC: 5,
  AGGREGATE: 6,
  COMPUTE: 7
}

/** date type */
export enum DataTypes {
  FLOAT = 0,
  INTEGER = 1,
  STRING = 2,
  BOOLEAN = 3,
  DATE = 4,
  DATETIME = 5
}

export const dataTypeList = [
  { label: '浮点', value: DataTypes.FLOAT },
  { label: '整数', value: DataTypes.INTEGER },
  { label: '字符串', value: DataTypes.STRING },
  { label: '布尔', value: DataTypes.BOOLEAN },
  { label: '日期', value: DataTypes.DATE },
  { label: '日期和时间', value: DataTypes.DATETIME },
]
