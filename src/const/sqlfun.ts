import { SQL_FUN_TYPES } from './types'

/** sql functions types */
export const funcTypes = [
  { label: '全部', value: SQL_FUN_TYPES.ALL },
  { label: '数字', value: SQL_FUN_TYPES.NUMBER },
  { label: '字符串', value: SQL_FUN_TYPES.STRING },
  { label: '日期', value: SQL_FUN_TYPES.DATE },
  { label: '类型转换', value: SQL_FUN_TYPES.CAST },
  { label: '逻辑', value: SQL_FUN_TYPES.LOGIC },
  { label: '聚合', value: SQL_FUN_TYPES.AGGREGATE },
  { label: '表计算', value: SQL_FUN_TYPES.COMPUTE }
]

/** sql functions */
export const funcList = [
  {
    name: 'ABS',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'ABS(number)',
    description: '返回给定数字的绝对值。',
    example: 'ABS(-7) = 7'
  },
  {
    name: 'ACOS',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'ACOS(number)',
    description: '返回数字的反余弦。结果以弧度表示。',
    example: 'ACOS(-1) = 3.14159265358979'
  },
  {
    name: 'AND',
    type: SQL_FUN_TYPES.LOGIC,
    expression: 'IF <expr1> AND <expr2> THEN <then> END',
    description: '对两个表达式执行逻辑合取操作。',
  },
  {
    name: 'ASCII',
    type: SQL_FUN_TYPES.STRING,
    expression: 'ASCII(string)',
    description: '返回字符串中第一个字符的 ASCII 代码值。',
    example: 'ASCII("authors") = 97'
  },
  {
    name: 'ASIN',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'ASIN(number)',
    description: '返回数字的反正弦。结果以弧度表示。',
    example: 'ASIN(1) = 1.5707963267949'
  },
  {
    name: 'ATAN',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'ATAN(number)',
    description: '返回数字的反正切。结果以弧度表示。',
    example: 'ATAN(180) = 1.5652408283942'
  },
  {
    name: 'ATAN2',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'ATAN2(y number, x number)',
    description: '返回两个给定数字（x 和 y）的反正切。结果以弧度表示。',
    example: 'ATAN2(2, 1) = 1.10714871779409'
  },
  {
    name: 'ATTR',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'ATTR(expression)',
    description: '如果给定表达式对于组中的所有行仅具有单个值，则返回该表达式的值，否则显示星号(*)。会忽略Null 值。',
    example: 'ATTR([Market])'
  },
  {
    name: 'AVG',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'AVG(expression)',
    description: '返回表达式中所有值的平均值。AVG 只能用于数值字段。会忽略Null 值。',
    example: 'AVG([利润])'
  },
  {
    name: 'CASE',
    type: SQL_FUN_TYPES.LOGIC,
    expression: 'CASE <expr> WHEN <value1> THEN <return1> ... [ELSE <else>] END',
    description: '查找与 <表达式> 匹配的第一个 <值> 并返回对应的 <返回值>。',
    example: 'CASE(-1) = 3.14159265358979'
  },
  {
    name: 'CEILING',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'CEILING(number)',
    description: '将数字舍入为等于或大于值的最接近整数。',
    example: 'CEILING(3.1415) = 4'
  },
  {
    name: 'CHAR',
    type: SQL_FUN_TYPES.STRING,
    expression: 'CHAR(integer)',
    description: '将给定整数 ASCII 代码转换为字符。',
    example: 'CHAR(65) = \'A\''
  },
  {
    name: 'COLLECT',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'COLLECT(空间)',
    description: '对参数字段中的值进行合并的聚合计算。COLLECT 只能与空间字段一起使用。将忽略 null 值。',
    example: 'COLLECT([Geometry])'
  },
  {
    name: 'CONTAINS',
    type: SQL_FUN_TYPES.STRING,
    expression: 'CONTAINS(string, substring)',
    description: '如果字符串包含子字符串，则返回 true.',
    example: 'CONTAINS("Calculation", "alcu") 为 true'
  },
  {
    name: 'CORR',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'CORR(expr1, expr2)',
    description: '返回两个表达式的皮尔森相关系数。',
    example: 'CORR([销售额], [利润])'
  },
  {
    name: 'COS',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'COS(angle)',
    description: '返回角度的余弦。以弧度为单位指定角度。',
    example: 'COS(PI()/4) = 0.707106781186548'
  },
  {
    name: 'COT',
    type: SQL_FUN_TYPES.NUMBER,
    expression: 'COT(angle)',
    description: '返回角度的余切。以弧度为单位指定角度。',
    example: 'COT(PI()/4) = 1'
  },
  {
    name: 'COUNT',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'COUNT(expression)',
    description: '返回组的项数。NULL 值不会计数。',
    example: 'COUNT([Customer ID])'
  },
  {
    name: 'COUNTD',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'COUNTD(expression)',
    description: '返回组中不同项的数量。NULL 值不会计数。每个唯一值仅计数一次。',
    example: 'COUNTD([Region])'
  },
  {
    name: 'COVAR',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'COVAR(expr1, expr2)',
    description: '返回两个表达式的样本协方差。',
    example: 'COVAR([销售额], [利润])'
  },
  {
    name: 'COVARP',
    type: SQL_FUN_TYPES.AGGREGATE,
    expression: 'COVARP(expr1, expr2)',
    description: '返回两个表达式的总体协方差。',
    example: 'COVARP([销售额], [利润])'
  },
  {
    name: 'DATE',
    type: SQL_FUN_TYPES.DATE,
    expression: 'DATE(expression)',
    description: '在给定数字、字符串或日期表达式的情况下返回日期。',
    example: 'DATE("2006-06-15 14:52") = 2016-06-15 \n 请注意，引号是必需的。'
  }
]
