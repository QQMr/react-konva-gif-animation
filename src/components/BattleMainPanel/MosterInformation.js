import React, { useEffect, useRef } from "react";
import {  Layer,Rect,Text } from "react-konva";
import Konva from "konva";
// gifler will be imported into global window object


// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


const MosterInformation= (props) =>{

  React.useEffect(() => {
    // if (!blink) {
    //   return;
    // }
    var period = 200;
    var cnt = 0;
    var anim = new Konva.Animation(frame => {

      cnt ++;
      console.log(frame.time)
      if( cnt*2  > period )
      {
        anim.stop();
        return;
      }
      rectRef.current.opacity((Math.sin(cnt/ period) + 1) / 2);
      rectRef.current.width( 96 - 96*( cnt / period) );
      textRef.current.text(cnt);
    }, rectRef.current.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  }, [currentHP]);

  
  const {x,y,monsterName,currentHP,totalHP} = props;
  const w = 200;
  const h = 100;
  const rectRef = React.useRef();
  const textRef = React.useRef();


  return(
    <Layer x={x} y ={y}>
         <Rect
            x={0}
            y={0}
            width={w}
            height={h}
            fill='rgba(255,255,82,1)'
            shadowBlur={10}
          />
            <Text  
            x= {w/10}
            y= {h/5}
            text= {monsterName}
            fontSize= {20}
            fontFamily= "Calibri"
            fill= 'green'
            ref={textRef}
          />

          <Rect
            x={30}
            y={50}
            width={150}
            height={30}
            fill='rgba(255,82,82,1)'
            shadowBlur={1}
            cornerRadius= {15}
          />

          <Rect
            x={30+35}
            y={50+2}
            width={100}
            height={22}
            fill='red'
            shadowBlur={1}
            cornerRadius= {15}
            strokeWidth={4} // border width
            stroke="white" // border color
          />
          <Rect
            x={30+35+2}
            y={50+4}
            width={96*currentHP/totalHP}
            height={18}
            fill='blue'
            shadowBlur={1}
            cornerRadius= {15}
            ref={rectRef}
            // strokeWidth={1} // border width
            // stroke="" // border color
          />

          <Text  
            x= {30+10}
            y= {50+5}
            text= "HP"
            fontSize= {20}
            fontFamily= "Calibri"
            fill= 'yellow'
          />
    </Layer>
  )
}


export default MosterInformation;
