import React, { ReactNode } from 'react'
import "./Treemap.css"
import { BinarySumTree } from '../scripts/BinarySumTree'


type Position = {
  x: number,
  y: number,
}
type Size = {
  width: number, 
  height: number,
}
type LeafElementProps<T> = {
  item: T, 
  position: Position, 
  size: Size,
}

type TreemapProps<T> = {
  tree: BinarySumTree<T>,
  isVertical: boolean,
  position: Position
  size: Size
  LeafElement: (props: LeafElementProps<T>) => JSX.Element,
}
const Treemap = <T,>({ tree, isVertical, position: {x, y}, size: {width, height}, LeafElement }: TreemapProps<T>) => {

  if (tree.leftChild == null || tree.rightChild == null) {
    return (
      <LeafElement item={tree.data[0]} position={{x, y}} size={{width, height}}/>
    )
  }


  const leftRatio = tree.leftChild.value / tree.value
  const rightRatio = tree.rightChild.value / tree.value

  if (isVertical) {
    return (
      <>
        <Treemap
          tree={tree.leftChild} isVertical={!isVertical} LeafElement={LeafElement}
          position={{ x, y }} size={{ width, height: height*leftRatio }}
        />
        <Treemap
          tree={tree.rightChild} isVertical={!isVertical} LeafElement={LeafElement}
          position={{ x, y: y + height*leftRatio }} size={{ width, height: height * rightRatio }}
        />
      </>
    )
  }
  else {
    return (
      <>
        <Treemap
          tree={tree.leftChild} isVertical={!isVertical} LeafElement={LeafElement}
          position={{ x, y }} size={{ width: width*leftRatio, height }}
        />
        <Treemap
          tree={tree.rightChild} isVertical={!isVertical} LeafElement={LeafElement}
          position={{ x: x + width*leftRatio, y }} size={{ width: width*rightRatio, height }}
        />
      </>
    )
  }
}

export default Treemap