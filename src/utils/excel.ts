import XLSX, { WorkBook, WorkSheet } from 'xlsx'

interface ICell {
  v: Date | number | boolean | string
  t: string
  z: string
}

class Workbook implements WorkBook {
  public SheetNames: string[] = []
  public Sheets: { [sheet: string]: WorkSheet } = {}
}

const generateArray = (table: HTMLElement) => {
  const out = []
  const rows = table.querySelectorAll('tr')
  const ranges = []
  for (let R = 0; R < rows.length; ++R) {
    const outRow = []
    const row = rows[R]
    const columns = row.querySelectorAll('td')
    for (const cell of columns) {
      const colspanStr = cell.getAttribute('colspan')
      const rowspanStr = cell.getAttribute('rowspan')
      let colspan
      let rowspan
      if (colspanStr) {
        colspan = parseInt(colspanStr, 10)
      }
      if (rowspanStr) {
        rowspan = parseInt(rowspanStr, 10)
      }
      const cellValue = cell.innerText
      // Skip ranges
      ranges.forEach((range) => {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) {
            outRow.push(null)
          }
        }
      })
      // Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1
        colspan = colspan || 1
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        })
      }
      // Handle Value
      outRow.push(cellValue !== '' ? cellValue : null)
      // Handle Colspan
      if (colspan) {
        for (let k = 0; k < colspan - 1; ++k) {
          outRow.push(null)
        }
      }
    }
    out.push(outRow)
  }
  return [out, ranges]
}

const datenum = (date: Date) => {
  return (+date - +new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

const sheetFromDataArray = (data: any) => {
  const ws: { [key: string]: any } = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) { range.s.r = R }
      if (range.s.c > C) { range.s.c = C }
      if (range.e.r < R) { range.e.r = R }
      if (range.e.c < C) { range.e.c = C }
      const cell: ICell = {
        v: data[R][C],
        t: '',
        z: ''
      }
      if (cell.v == null) { continue }
      const cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R
      })
      if (typeof cell.v === 'number') { cell.t = 'n' } else if (typeof cell.v === 'boolean') { cell.t = 'b' } else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF.get_table()[14]
        cell.v = datenum(cell.v)
      } else { cell.t = 's' }
      ws[cellRef] = cell
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }
  return ws
}

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    // tslint:disable-next-line:no-bitwise
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

export const getHeaderRow = (sheet: { [key: string ]: any }) => {
  const headers: string[] = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  const R = range.s.r
  // start in the first row
  for (let C = range.s.c; C <= range.e.c; ++C) { // walk every column in the range
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    // find the cell in the first row
    let hdr = ''
    if (cell && cell.t) {
      hdr = XLSX.utils.format_cell(cell)
    }
    if (hdr === '') {
      hdr = 'UNKNOWN ' + C // replace with your desired default
    }
    headers.push(hdr)
  }
  return headers
}
