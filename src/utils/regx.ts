// regx for date when date format with kebab
export const DATE_REG_KEBAB = /^[1-2]\d{3}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/g

// regx for date when date format with virgule
export const DATE_REG_VIRGULE = /^[1-2]\d{3}\/([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$/g

// regx for time
export const TIME_REG = /^(0?[1-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):([0-5][0-9])$/g

// regx for number especially including scientific notation
export const NUMBER_REG = /^-?([1-9]\d*|0)(\.?\d+)?(e-?[1-9]\d*)?$/
