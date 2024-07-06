import React from "react"
import "../global.css"

const IndexSection = () => {
  const iframePart = () => {
    return {
      __html: '<iframe src="./indexSection.html" width="100%" height="100%" style="transform:scale(1);width:150%;height:150%;transform-origin:0 0;"></iframe>',
    };
  };

  return (
    <div
      className="section"
      style={{overflow: "hidden"}}
      dangerouslySetInnerHTML={iframePart()}
    />
  )
}

export default IndexSection