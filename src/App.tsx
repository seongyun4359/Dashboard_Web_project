import React from 'react';
import './App.css';
import TreemapSection from './sections/TreemapSection';
import CircleMapSection from './sections/CircleMapSection';
import IndexSection from './sections/IndexSection';
import KoreanSection from './sections/KoreanSection';

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className='header-title'>일회용품 규제 법안의 타당성 분석</span>
        <div className="small-box"><div className='box-text'>일회용품 법안의 규제 완화, 과연 올바른 행보인가?</div> </div>
        <div className='title-rightside'><div className='day'>2023-12-13</div><div className='dashboard'>DASHBOARD</div></div>
      </div>
      <div className='left-aside'>
        <IndexSection/>
      </div>
      <div>
        <TreemapSection/>
      </div>
      <div>
        <CircleMapSection/>
      </div>
    </div>
  );
}

export default App;
