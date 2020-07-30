/** 筛选器常量 */
export const FILTER_NUMBER_V = {
  ALL: 0,                                // 所有值

  SUM: 1,                                // 总和
  AVG: 2,                                // 平均值
  MEDIAN: 3,                             // 中位数
  COUNT: 4,                              // 计数
  COUNT_DIFF: 5,                         // 计算（不同）
  MIN: 6,                                // 最小值
  MAX: 7,                                // 最大值

  STANDARD_DEVIATION: 8,                 // 标准差
  STANDARD_DEVIATION_TOTAL: 9,           // 标准差（总体）
  VARIANCE: 10,                          // 方差
  VARIANCE_TOTAL: 11,                    // 方差（总体）
  ATTR: 12                               // 属性
}

// 筛选器筛选对象数组
export const FILTER_NUMBER_ARRAY = [
  [{ name: '所有值', value: FILTER_NUMBER_V.ALL, bold: true }],
  [
    { name: '总和', value: FILTER_NUMBER_V.SUM },
    { name: '平均值', value: FILTER_NUMBER_V.AVG },
    { name: '中位数', value: FILTER_NUMBER_V.MEDIAN },
    { name: '计数', value: FILTER_NUMBER_V.COUNT },
    { name: '计数（不同）', value: FILTER_NUMBER_V.COUNT_DIFF },
    { name: '最小值', value: FILTER_NUMBER_V.MIN },
    { name: '最大值', value: FILTER_NUMBER_V.MAX }
  ],
  [
    { name: '标准差', value: FILTER_NUMBER_V.STANDARD_DEVIATION },
    { name: '标准差（总体）', value: FILTER_NUMBER_V.STANDARD_DEVIATION_TOTAL },
    { name: '方差', value: FILTER_NUMBER_V.VARIANCE },
    { name: '方差（总体）', value: FILTER_NUMBER_V.VARIANCE_TOTAL },
  ],
  [{ name: '属性', value: FILTER_NUMBER_V.ATTR }]
]

export const FILTER_DATE_V = {
  RELATIVE: 0,                            // 所有值
  RANGE: 1,                               // 日期范围

  YEAR: 2,                                // 年
  SEASON: 3,                              // 季度
  MONTH: 4,                               // 月
  DAY: 5,                                 // 天
  WEEK: 6,                                // 周数
  WEEKDAY: 7,                             // 工作日
  YEAR_MONTY: 8,                          // 年/月
  YEAR_MONTH_DAY: 9,                      // 年/月/日
  SPECIAL_DAY: 10,                        // 单个日期

  COUNT: 11,                              // 计数
  COUNT_DIFF: 12,                         // 计算（不同）
  MIN: 13,                                // 最小值
  MAX: 14,                                // 最大值

  ATTR: 12                                // 属性
}

// 筛选器筛选对象数组
export const FILTER_DATE_ARRAY = [
  [
    { name: '相对日期', value: FILTER_DATE_V.RELATIVE },
    { name: '日期范围', value: FILTER_DATE_V.RANGE, bold: true },
  ],
  [
    { name: '年', value: FILTER_DATE_V.YEAR },
    { name: '季度', value: FILTER_DATE_V.SEASON },
    { name: '月', value: FILTER_DATE_V.MONTH },
    { name: '天', value: FILTER_DATE_V.DAY },
    { name: '周数', value: FILTER_DATE_V.WEEK },
    { name: '工作日', value: FILTER_DATE_V.WEEKDAY },
    { name: '年/月', value: FILTER_DATE_V.YEAR_MONTY },
    { name: '年/月/日', value: FILTER_DATE_V.YEAR_MONTH_DAY },
    { name: '单个日期', value: FILTER_DATE_V.SPECIAL_DAY },
  ],
  [
    { name: '计数', value: FILTER_DATE_V.COUNT },
    { name: '计数（不同）', value: FILTER_DATE_V.COUNT_DIFF },
    { name: '最小值', value: FILTER_DATE_V.MIN },
    { name: '最大值', value: FILTER_DATE_V.MAX }
  ],
  [{ name: '属性', value: FILTER_DATE_V.ATTR }]
]

/**
 * 通配符匹配规则
 * 0-包含 1-开头为  2-结尾为  3-精确匹配
 */
export const MATCH_RULES_V = {
  INCLUDE: 0,
  BEGIN_WITH: 1,
  END_WITH: 2,
  EXACT_MATCH: 3
}
export const MATCH_RULES = [
  {name: '包含', value: MATCH_RULES_V.INCLUDE},
  {name: '开头为', value: MATCH_RULES_V.BEGIN_WITH},
  {name: '结尾为', value: MATCH_RULES_V.END_WITH},
  {name: '精确匹配', value: MATCH_RULES_V.EXACT_MATCH},
]

