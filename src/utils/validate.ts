function validateEmpty(str: string): boolean {
  return str.replace(/\s+/g, '').length === 0
}

function validateLength(str: string): boolean {
  return str.trim().length > 6
}

export {
  validateEmpty,
  validateLength
}
