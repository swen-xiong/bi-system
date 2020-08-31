import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import { WorkBook, WorkSheet, WBProps } from 'xlsx'

export interface ISheetState extends WorkBook {
  curSheet: WorkSheet,
  curSheetFormat: any[],
  curSheetHeader: string[],
  bookName: string
}

@Module({ dynamic: true, store, name: 'sheet' })
class Sheet extends VuexModule implements ISheetState {
  public bookName: string = ''
  public SheetNames: string[] = []
  public Sheets: { [sheet: string]: WorkSheet } = {}
  public curSheet: WorkSheet = {}
  public curSheetFormat: any[] = [[]]
  public curSheetHeader: string[] = []

  /**
   * set sheetData
   * @param data
   */
  @Mutation
  public SET_SHEET(data: ISheetState) {
    this.bookName = data.bookName;
    this.SheetNames = data.SheetNames;
    this.Sheets = data.Sheets;
    this.curSheet = data.curSheet;
    this.curSheetFormat = data.curSheetFormat;
    this.curSheetHeader = data.curSheetHeader;
  }
}

export const SheetModule = getModule(Sheet)
