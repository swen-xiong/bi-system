// convert date format letter to text
export const dateText = (str: string) => {
  if (str === 'year') {
    return '年'
  } else if (str === 'quarter') {
    return '季度'
  } else if (str === 'month') {
    return '月'
  } else if (str === 'week') {
    return '周'
  } else if (str === 'day') {
    return '天'
  }
  return str
}

/**
 * get a new array filterby keywords
 * @param array target to be filter
 * @param keywords filter keywords
 * @param key match attribute name
 */
export const filterBy = (array: any[], keywords: string, key: string = 'name'): any[] => {
  return array.filter((item: any) => {
    return item[key].toString().toLowerCase().indexOf(keywords.toLowerCase()) !== -1;
  })
}
