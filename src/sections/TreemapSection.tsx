import React, {useState} from 'react'
import styled from 'styled-components'
import Treemap from '../components/Treemap'
import { BinarySumTree } from '../scripts/BinarySumTree'
import "./TreemapSection.css"
import "../global.css"
// @ts-ignore
import ScaleText from "react-scale-text";

type OuterEntry = { name: string; tree: BinarySumTree<InnerEntry>; fontSize?: number };
type InnerEntry = { name: string; amount: number; fontSize?: number; amountFontSize?: number; nameStyle?: React.CSSProperties; amountStyle?: React.CSSProperties };

const outerExtractor = (entry: OuterEntry) => entry.tree.value;
const innerExtractor = (entry: InnerEntry) => entry.amount;



const TreeMapSection = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ name: '', amount: '' });
  const [tooltipPosition, setTooltipPosition] = useState({ positionY: 0, positionX: 0 });
  
 
  const tree = new BinarySumTree<OuterEntry>(
      [
        {
          name: "숙박업 (40.27)",
          tree: new BinarySumTree([
            { name: "일회용 컵", amount: 25.48, fontSize: 45, amountFontSize: 40,nameStyle: { color: 'black' }, amountStyle: { color: 'black' }},
            { name: "일회용 젓가락(목재)", amount: 10.63, fontSize: 22, amountFontSize: 20, nameStyle: { color: 'black' }, amountStyle: { color: 'black' }},
            { name: "일회용 수저⋅포크⋅나이프(플라스틱)", amount: 2.93, fontSize: 8, amountFontSize: 8 },
            { name: "일회용 빨대", amount: 1.01, fontSize: 10, amountFontSize: 6 },
            { name: "일회용 이쑤시개", amount: 0.32, fontSize: 8, amountFontSize: 4 },
          ], innerExtractor)
        },
        {
          name: "음식점업 (26.52)",
          tree: new BinarySumTree([
            { name: "일회용 컵", amount: 18.94, fontSize: 35, amountFontSize: 30, nameStyle: { color: 'black' }, amountStyle: { color: 'black' } },
            { name: "일회용 젓가락(목재)", amount: 4.81, fontSize: 15, amountFontSize: 13, nameStyle: { color: 'black' }, amountStyle: { color: 'black' }},
            { name: "일회용 빨대", amount: 1.25, fontSize: 10, amountFontSize: 6 },
            { name: "일회용 수저⋅포크⋅나이프(플라스틱)", amount: 1.02, fontSize: 8, amountFontSize: 4 },
            { name: "일회용 이쑤시개", amount: 0.50, fontSize: 8, amountFontSize: 4 },
          ], innerExtractor)
        },
        {
          name: "시장・상가 (13.52)",
          tree: new BinarySumTree([
            { name: "일회용 컵", amount: 10.42, fontSize: 28, amountFontSize: 23,nameStyle: { color: 'black' }, amountStyle: { color: 'black' } },
            { name: "일회용 젓가락(목재)", amount: 2.14, fontSize: 4, amountFontSize: 4, nameStyle: { color: 'black' }, amountStyle: { color: 'black' } },
            { name: "일회용 수저⋅포크⋅나이프(플라스틱)", amount: 0.43, fontSize: 4, amountFontSize: 4 },
            { name: "일회용 빨대", amount: 0.35, fontSize: 4, amountFontSize: 4 },
            { name: "일회용 이쑤시개", amount: 0.18, fontSize: 4, amountFontSize: 4 },
          ], innerExtractor)
        },
        {
          name: "서비스업 (10.78)",
          tree: new BinarySumTree([
            { name: "일회용 컵", amount: 8.59, fontSize: 25, amountFontSize: 20, nameStyle: { color: 'black' }, amountStyle: { color: 'black' } },
            { name: "일회용 젓가락(목재)", amount: 1.56, fontSize: 4, amountFontSize: 4, nameStyle: { color: 'black' }, amountStyle: { color: 'black' }},
            { name: "일회용 빨대", amount: 0.29, fontSize: 1, amountFontSize: 1 },
            { name: "일회용 수저⋅포크⋅나이프(플라스틱)", amount: 0.22, fontSize: 1, amountFontSize: 1 },
            { name: "일회용 이쑤시개", amount: 0.12, fontSize: 1, amountFontSize: 1 },
          ], innerExtractor)
        },
      ], 
      outerExtractor
    )

  return (
    <div className='section' style={{ display: "grid", gridTemplateRows: "30px 2fr", gridGap: "0px 20px"}}>
      <div className="flex-center">
        <div className='treemap-title'>업종별 일회용품 배출량</div>
        <div className="unit-text">(g/일/인)</div>
      </div>

      <div className='treemap-outline' onMouseLeave={() => setTooltipVisible(false)} 
        style={{
          position: "relative",
          marginTop: "10px",
          border: "1px solid white", // 트리맵 컨테이너에 테두리 추가
          borderRadius: "10px", // 둥근 외관을 위한 테두리 반경 추가
          boxShadow: "0px 4px 29px rgba(0,0,0,0.25)", // 그림자 추가 box-shadow : 0 2px 10px 1px rgba(0,0,0,.2);
          overflow: "hidden", // 내용이 테두리를 넘어가지 않도록 오버플로우 숨김
          width: "99%", // 부모 요소에 대한 상대적인 너비
          height: "90%", // 부모 요소에 대한 상대적인 높이
          backgroundColor: "white"
        }}
      >
          
        <Treemap
          tree={tree}
          isVertical={false}
          position={{ x: 0.6, y: 1.8 }}
          size={{ width: 98, height: 95 }}
          LeafElement={({ item, position, size }) => {
            const outerEntryName = item.name; // 외부 엔트리의 이름

            // getInnerEntryBackgroundColor 함수 내부에서 외부 엔트리의 이름에 따라 배경색 지정
            const getInnerEntryBackgroundColor = (innerEntryName: string) => {
              if (outerEntryName.includes('숙박업')) {
                // 외부 엔트리 이름에 '숙박'이 포함된 경우
                if (innerEntryName.includes('컵')) {
                  return '#F6C3AE'; // 컵에 대한 배경색
                } else if (innerEntryName.includes('젓가락')) {
                  return '#AAD59F'; // 젓가락에 대한 배경색
                } else if (innerEntryName.includes('플라스틱')) {
                  return '#AAD59F'; //플라스틱 수저에 대한 배경색
                } else if (innerEntryName.includes('빨대')) {
                  return '#9AB2D4'; //빨대에 대한 배경색
                } else if (innerEntryName.includes('이쑤시개')) {
                  return '#FDD849'; //이쑤시개에 대한 배경색
                } else {return 'white'}
                

                // 기타 경우에 대한 배경색 설정 추가
              } else if (outerEntryName.includes('시장')) {
                if (innerEntryName.includes('컵')) {
                  return '#F6C3AE'; // 컵에 대한 배경색
                } else if (innerEntryName.includes('젓가락')) {
                  return '#AAD59F'; // 젓가락에 대한 배경색
                } else if (innerEntryName.includes('플라스틱')) {
                  return '#AAD59F';  //플라스틱 수저에 대한 배경색
                } else if (innerEntryName.includes('빨대')) {
                  return '#9AB2D4'; //빨대에 대한 배경색
                } else if (innerEntryName.includes('이쑤시개')) {
                  return '#FDD849';//이쑤시개에 대한 배경색
                } else {return 'white'}

              } else if (outerEntryName.includes('음식점')) {
                if (innerEntryName.includes('컵')) {
                  return '#F6C3AE';  // 컵에 대한 배경색
                } else if (innerEntryName.includes('젓가락')) {
                  return '#AAD59F'; // 젓가락에 대한 배경색
                } else if (innerEntryName.includes('빨대')) {
                  return '#9AB2D4';  //빨대에 대한 배경색
                } else if (innerEntryName.includes('플라스틱')) {
                  return '#AAD59F';//플라스틱 수저에 대한 배경색
                } else if (innerEntryName.includes('이쑤시개')) {
                  return '#FDD849'; //이쑤시개에 대한 배경색
                } else {return 'white'}


              }else if (outerEntryName.includes('서비스업')) {
                if (innerEntryName.includes('컵')) {
                  return '#F6C3AE';  // 컵에 대한 배경색
                } else if (innerEntryName.includes('젓가락')) {
                  return '#AAD59F'; // 젓가락에 대한 배경색
                } else if (innerEntryName.includes('빨대')) {
                  return '#9AB2D4'; //빨대 대한 배경색
                } else if (innerEntryName.includes('플라스틱')) {
                  return '#AAD59F'; //플라스틱 수저에 대한 배경색
                } else if (innerEntryName.includes('이쑤시개')) {
                  return '#FDD849'; //이쑤시개에 대한 배경색
                } else {return 'white'}
              }
              // 기본값: 흰색
              return 'white';

              
            };

            const showInnerEntryTooltip = (event: React.MouseEvent<HTMLDivElement>, outerEntryName: string, innerEntryName: string) => {
              // 특정 조건에 따라 위치와 내용을 설정
              let tooltipStyle: React.CSSProperties = {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
              };
              let tooltipContent = { name: '', amount: '' };

              if (outerEntryName.includes('숙박업')) {
                // 외부 엔트리 이름에 '숙박'이 포함된 경우
              if (innerEntryName.includes('컵')) {
                tooltipStyle.opacity = 0;
              } else if (innerEntryName.includes('젓가락')) {
                tooltipStyle.opacity = 0;
              } else if (innerEntryName.includes('플라스틱')) {
                tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-20%, -20%)', opacity: 1 };
                tooltipContent = { name: '일회용 수저⋅포크⋅나이프(플라스틱)', amount: '2.93' };
              }else if (innerEntryName.includes('빨대')) {
                tooltipStyle = { top: '45%', left: '70%', transform: 'translate(50%, 50%)', opacity: 1 };

                tooltipContent = { name: '일회용 빨대', amount: '1.01' };
              } else if (innerEntryName.includes('이쑤시개')) {
                tooltipStyle = { top: '48%', left: '70%', transform: 'translate(-50%, -50%)', opacity: 1 };
                tooltipContent = { name: '일회용 이쑤시개', amount: '0.32' };
              } else {tooltipStyle.opacity = 0;}
                

                
              } else if (outerEntryName.includes('시장')) {
                if (innerEntryName.includes('컵')) {
                  tooltipStyle.opacity = 0;
                } else if (innerEntryName.includes('젓가락')) {
                  tooltipStyle = { top: '30%', left: '90%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 젓가락(목재)', amount: '2.14' };
                } else if (innerEntryName.includes('플라스틱')) {
                  tooltipStyle = { top: '40%', left: '85%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 수저⋅포크⋅나이프(플라스틱)', amount: '0.43' };
                }else if (innerEntryName.includes('빨대')) {
                  tooltipStyle = { top: '40%', left: '95%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 빨대', amount: '0.35' };
                } else if (innerEntryName.includes('이쑤시개')) {
                  tooltipStyle = { top: '45%', left: '95%', transform: 'translate(-50%, -50%)', opacity: 1 };
                    tooltipContent = { name: '일회용 이쑤시개', amount: '0.18' };
                } else {setTooltipVisible(false);}

              } else if (outerEntryName.includes('음식점')) {
                if (innerEntryName.includes('컵')) {
                  setTooltipVisible(false);
                } else if (innerEntryName.includes('젓가락')) {
                  tooltipStyle = { top: '65%', left: '62%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 젓가락(목재)', amount: '4.81' };
                } else if (innerEntryName.includes('플라스틱')) {
                  tooltipStyle = { top: '80%', left: '63%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 수저⋅포크⋅나이프(플라스틱)', amount: '1.02' };
                }else if (innerEntryName.includes('빨대')) {
                  tooltipStyle = { top: '81%', left: '57%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 빨대', amount: '1.25' };
                } else if (innerEntryName.includes('이쑤시개')) {
                  tooltipStyle = { top: '87%', left: '67%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 이쑤시개', amount: '0.5' };
                } else {setTooltipVisible(false);}

              }else if (outerEntryName.includes('서비스업')) {
                if (innerEntryName.includes('컵')) {
                  setTooltipVisible(false);
                } else if (innerEntryName.includes('젓가락')) {
                  tooltipStyle = { top: '65%', left: '92%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 젓가락(목재)', amount: '1.56' };
                } else if (innerEntryName.includes('플라스틱')) {
                  tooltipStyle = { top: '82%', left: '87%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 수저⋅포크⋅나이프(플라스틱)', amount: '0.22' };
                }else if (innerEntryName.includes('빨대')) {
                  tooltipStyle = { top: '82%', left: '92%', transform: 'translate(-50%, -50%)', opacity: 1 };
                  tooltipContent = { name: '일회용 빨대', amount: '0.29' };
                } else if (innerEntryName.includes('이쑤시개')) {
                  tooltipStyle = { top: '88%', left: '93.2%', transform: 'translate(-50%, -50%)', opacity: 1 };
                    tooltipContent = { name: '일회용 이쑤시개', amount: '0.12' };
                } else {setTooltipVisible(false);}
              }
              
              else{ tooltipStyle.opacity = 0;}

              
              return { content: tooltipContent, style:tooltipStyle };

              
            };
          
            

            return (
              <div
                className='leaf outer'
                style={{
                  top: position.y + '%',
                  left: position.x + '%',
                  width: size.width + '%',
                  height: size.height + '%',
                }}
              >
                <div className='inner-title'>
                  <div className='absolute-center' style={{ fontSize: item.fontSize }}>
                    {item.name}
                  </div>
                </div>
                <div className='inner-content'>
                  <Treemap
                    tree={item.tree}
                    isVertical={false}
                    position={{ x: 0, y: 0 }}
                    size={{ width: 100, height: 100 }}
                    LeafElement={({ item, position, size }) => (
                      <div className='leaf inner'
                      onMouseOver={(event: React.MouseEvent<HTMLDivElement>) => {
                        const { style, content } = showInnerEntryTooltip(event, outerEntryName, item.name);
                
                        const positionY = style.top ? parseFloat(style.top as string) : 0;
                        const positionX = style.left ? parseFloat(style.left as string) : 0;
                        setTooltipPosition({
                          positionY: positionY,
                          positionX: positionX,
                        });
                    
                        setTooltipContent(content);
                        setTooltipVisible(style.opacity === 1);
                      }}
                      onMouseOut={() => setTooltipVisible(false)}
                      style={{
                        top: position.y + '%',
                        left: position.x + '%',
                        width: size.width + '%',
                        height: size.height + '%',
                        backgroundColor: getInnerEntryBackgroundColor(item.name),
                      }}
                    >
                        <div className='absolute-center' style={{ fontSize: item.fontSize }}>
                          <div className='inner-text' style={{...item.nameStyle, fontSize: item.amountFontSize }}>
                            {item.name}
                          </div>
                          <div className='inner-text' style={{...item.amountStyle,fontSize: item.amountFontSize }}>
                            {item.amount}
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            );
          }}
        />
        {tooltipVisible && (
           <div
           className='tooltip'
           style={{
            position: 'absolute',
            top: `${tooltipPosition.positionY}%`,
            left: `${tooltipPosition.positionX}%`,
            transform: 'translate(-50%, -50%)',
           }}
         >
            <div>{tooltipContent.name}</div>
            <div>{tooltipContent.amount}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeMapSection;