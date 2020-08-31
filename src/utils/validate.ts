import * as regx from './regx'

function validateEmpty(str: string): boolean {
  return str.replace(/\s+/g, '').length === 0
}

function validateLength(str: string): boolean {
  return str.trim().length > 6
}

function isExcel(file: File): boolean {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

function isTime(time: string): boolean {
  return regx.TIME_REG.test(time)
}

function isDate(dateStr: string): boolean {
  let date = dateStr
  let time
  if (dateStr.length > 11) {
    date = dateStr.substring(0, 10)
    time = dateStr.substring(11)
    return (regx.DATE_REG_KEBAB.test(date) || regx.DATE_REG_VIRGULE.test(date)) && isTime(time)
  } else {
    return regx.DATE_REG_KEBAB.test(date) || regx.DATE_REG_VIRGULE.test(date)
  }
}

function isNumber(value: any): boolean {
  return typeof value === 'number'
}

function isNumberStr(str: string): boolean {
  return regx.NUMBER_REG.test(str)
}

export {
  validateEmpty,
  validateLength,
  isExcel,
  isDate,
  isNumberStr
}
