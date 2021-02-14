import React from "react";
import {  Layer,Rect,Text } from "react-konva";

// gifler will be imported into global window object


const MosterInformation= (props) =>{

  const {x,y,monsterName,currentHP,totalHP} = props;
  const w = 200;
  const h = 100;
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
