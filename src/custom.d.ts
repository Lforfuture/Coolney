type RecordItem = {
    selectedTag?: string
    note?: string
    inOut: string
    amount: number
    time?: string
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
  