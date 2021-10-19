 type RecordItem = {
    tagName: string
    note: string
    inOut: string
    amount: number
    time: string
    describe:string
  };
  type Tag = {
    id: number
    name: string
    describe: string
  }
  type RootState = {
    recordList: RecordItem[]
    tagsList: Tag[]
    currentTag: Tag
  }
export {RecordItem, Tag, RootState}