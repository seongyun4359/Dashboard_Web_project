import React from 'react'
import "../global.css"
import "./CircleMapSection.css"

type Side = {
  name: string,
  values: number[],
}[]

type Bridge = [[number, number], [number, number]]

const sum = (arr: number[]) => {
  return arr.reduce((acc, cur) => acc + cur, 0)
}

const calcPosition = (side: Side, index: [number, number]) => {
  const [sectionIndex, itemIndex] = index
  const gap = 0.02
  const totalWithoutGap = 1 - gap * (side.length - 1)
  const smallSum = side.map(s => sum(s.values))
  const totalSum = sum(smallSum)
  
  const sectionStart = sum(smallSum.slice(0, sectionIndex)) / totalSum * totalWithoutGap + gap * sectionIndex
  return [
    sectionStart + sum( side[sectionIndex].values.slice(0, itemIndex) ) / totalSum * totalWithoutGap,
    sectionStart + sum( side[sectionIndex].values.slice(0, itemIndex+1) ) / totalSum * totalWithoutGap,
  ] as [number, number]
}

const fillOpacity = 0.8

const CircleMapSection = () => {

  const leftSide: Side = [
    {
      name: "플라스틱 컵",
      values: [8.69, 7.09, 4.95, 3.09].map(v => v*450/23.82),
    },
    {
      name: "플라스틱 빨대",
      values: [1.01, 1.25, 0.35, 0.29].map(v => v*200/2.9),
    },
    {
      name: "플라스틱 수저",
      values: [2.93, 1.02, 0.43, 0.22].map(v => v*200/4.6),
    },
    {
      name: "금속 컵",
      values: [1.81, 0.98, 0.51, 0.42].map(v => v*200/3.72),
    },
    {
      name: "나무 이쑤시개",
      values: [0.32, 0.50, 0.18, 0.12].map(v => v*21/1.12),
    },
    {
      name: "나무 젓가락",
      values: [10.63, 4.81, 2.14, 1.56].map(v => v*20/19.14),
    },
    {
      name: "종이 컵",
      values: [23.67, 17.96, 9.91, 8.17].map(v => v*20/59.71),
    },
  ]

  const rightSide: Side = [
    {
      name: "숙박업",
      values: [0.32, 2.93, 1.01, 10.63, 23.67, 8.69, 1.81],
    },
    {
      name: "음식점업",
      values: [0.50, 1.02, 1.25, 4.81, 17.96, 7.09, 0.98],
    },
    {
      name: "시장・상가",
      values: [0.18, 0.43, 0.35, 2.14, 9.91, 4.95, 0.51],
    },
    {
      name: "서비스업",
      values: [0.12, 0.22, 0.29, 1.56, 8.17, 3.09, 0.42],
    },
  ]

  const bridges: Bridge[] = [
    [[0,0],[0,5]],
    [[1,0],[0,2]],
    [[2,0],[0,1]],
    [[3,0],[0,6]],
    [[4,0],[0,0]],
    [[5,0],[0,3]],
    [[6,0],[0,4]],

    [[0,1],[1,5]],
    [[1,1],[1,2]],
    [[2,1],[1,1]],
    [[3,1],[1,6]],
    [[4,1],[1,0]],
    [[5,1],[1,3]],
    [[6,1],[1,4]],

    [[0,2],[2,5]],
    [[1,2],[2,2]],
    [[2,2],[2,1]],
    [[3,2],[2,6]],
    [[4,2],[2,0]],
    [[5,2],[2,3]],
    [[6,2],[2,4]],

    [[0,3],[3,5]],
    [[1,3],[3,2]],
    [[2,3],[3,1]],
    [[3,3],[3,6]],
    [[4,3],[3,0]],
    [[5,3],[3,3]],
    [[6,3],[3,4]],
  ]

  const colors = ["#f1a180", "#7697c5", "#8bc57c", "#fccd17", "#a88ac2", "#988b6e", "#878a90", "#1ABC9C", "#FFECDB"]

  return (
    <div className="section circlemap-root">
      <div className='circlemap-title'>
        일회용품 부패 시간(년)과 업종별 배출량(g/일/인)
      </div>
      <div className='circlemap-content'>
        <div className='circlemap'>
          <div 
            className='side' 
            style={{ 
              gridTemplateRows: leftSide.map(item => `${sum(item.values)}fr`).join(" "),
              gap: "2%",
            }}
          >
            {
              leftSide.map((sideItem, i) => {
                return (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "5px",
                    minWidth: 0,
                    position: "relative",
                  }}>
                    <span style={{
                      position: "absolute",
                      display: 'flex',
                      flexDirection: "row",
                      gap: '2px',
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      zIndex: 3,
                      fontSize: "10px",
                    }}>
                      <div className='circlemap-label' style={{ backgroundColor: colors[i] + 'CC'}}/>
                      { sideItem.name }
                    </span>
                  </div>
                )
              })
            }
          </div>

          <div className='circlemap-chart'>
            <div
                className='circlemap-start'
                style={{
                  gridTemplateRows: leftSide.map(item => `${sum(item.values)}fr`).join(" "),
                  gap: "2%",
                }}
            >
              {
                leftSide.map((sideItem, i) => {
                  return (
                      <div key={i} style={{
                        display: 'flex',
                        borderLeft: '10px solid black',
                        flexDirection: "column",
                        justifyContent: "center",
                        minWidth: 0,
                        position: "relative",
                      }}/>)
                })
              }
            </div>
            <div className='bridge-container'>
              <svg viewBox='0 0 1 1' width="100%" height="100%" preserveAspectRatio='none'>
                {
                  bridges.map((bridge, i) => {
                    const [leftStart, leftEnd] = calcPosition(leftSide, bridge[0])
                    const [rightStart, rightEnd] = calcPosition(rightSide, bridge[1])
                    return (
                        <path key={i}
                              stroke="none"
                              fill={colors[bridge[0][0]]}
                              opacity={fillOpacity}
                              d={`
                        M 0,${leftStart}
                        C 0.2, ${leftStart}, 0.8, ${rightStart}, 1, ${rightStart}
                        L 1,${rightEnd}
                        C 0.8, ${rightEnd}, 0.2, ${leftEnd}, 0, ${leftEnd} Z
                      `}
                        />
                    )
                  })
                }
              </svg>
            </div>
            <div
                className='circlemap-start'
                style={{
                  gridTemplateRows: rightSide.map(item => `${sum(item.values)}fr`).join(" "),
                  gap: "2%",
                }}
            >
              {
                rightSide.map((sideItem, i) => {
                  return (
                      <div key={i} style={{
                        display: 'flex',
                        borderLeft: '10px solid black',
                        flexDirection: "column",
                        justifyContent: "center",
                        minWidth: 0,
                        position: "relative",
                      }}/>)
                })
              }
            </div>
          </div>

          <div 
            className='side' 
            style={{ 
              gridTemplateRows: rightSide.map(item => `${sum(item.values)}fr`).join(" "),
              gap: "2%",
              width: '45px'
            }}
          >
            {
              rightSide.map((sideItem, sideIndex) => {
                return (
                  <div key={sideIndex} style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                    minWidth: 0,
                    position: "relative",
                  }}>
                    <span style={{
                      position: "absolute",
                      whiteSpace: "nowrap",
                      zIndex: 3,
                      fontSize: "10px",
                      paddingRight: "5px",
                    }}>
                      { sideItem.name }
                    </span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleMapSection