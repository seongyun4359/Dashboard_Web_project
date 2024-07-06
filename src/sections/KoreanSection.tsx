import React from "react"

const KoreanSection = () => {
  const iframePart = () => {
    return {
      __html: '<iframe src="/한국.html" width="100%" height="100%"></iframe>',
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

export default KoreanSection