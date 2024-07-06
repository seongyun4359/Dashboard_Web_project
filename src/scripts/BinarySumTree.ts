export class BinarySumTree<T> {
  data: T[]
  value: number
  leftChild: BinarySumTree<T> | null
  rightChild: BinarySumTree<T> | null

  constructor(data: T[], valueExtractor: (data: T) => number) {
    if (data.length === 0) throw Error("invalid argument: empty array")
    this.data = data
    this.value = data.map(valueExtractor).reduce((acc, cur) => acc + cur, 0)

    if (data.length === 1) {
      this.leftChild = null
      this.rightChild = null
    }
    else {
      if (valueExtractor(data[0]) * 2 > this.value){
        this.leftChild = new BinarySumTree<T>(data.slice(0, 1), valueExtractor) 
        this.rightChild = new BinarySumTree<T>(data.slice(1), valueExtractor)
      }
      else {
        const midIndex = Math.floor(data.length / 2)
        this.leftChild = new BinarySumTree<T>(data.slice(0, midIndex), valueExtractor)
        this.rightChild = new BinarySumTree<T>(data.slice(midIndex), valueExtractor)
      }
    }
  }


  get isLeaf() {
    return this.leftChild == null && this.rightChild == null
  }
}