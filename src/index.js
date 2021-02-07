import React,{useEffect, useRef} from "react";
import { render } from "react-dom";
import { Stage, Layer, Image,Rect } from "react-konva";
import QQ from "./abomasnow.gif";
// gifler will be imported into global window object
import "gifler";
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fasnowflake } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'

import SnowSvg from "./snow_b.svg"

import useImage from 'use-image';

const Element = <FontAwesomeIcon icon={faSnowflake} />

const LionImage = (props) => {

  const rect = useRef(null);

  React.useEffect(() => {
    // save animation instance to stop it on unmount
   console.log(rect.current);
   rect.current.to({
    scaleX: 4,
    scaleY: 4,
    x: props.x+350,
    y: props.y-330,
    // visible: false,
    duration: 2-Math.random()*1.8,
    onFinish: () => {
      rect.current.to({
        // scaleX: 1,
        // scaleY: 1,
        // visible: false,
        opacity: 0,
      });
    },
  });
  }, []);

  const [image] = useImage(SnowSvg);
  return <Image ref={rect} {...props}
  width={20} height={20} image={image} />;
};



// the first very simple and recommended way:
const GIF = ({ src,x,y }) => {
  const imageRef = React.useRef(null);
  const canvas = React.useMemo(() => {
    const node = document.createElement("canvas");
    return node;
  }, []);

  React.useEffect(() => {
    // save animation instance to stop it on unmount
    let anim;
    window.gifler(src).get(a => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    return () => anim.stop();
  }, [src, canvas]);

  
  return <Image x={x} y={y}             scaleX={1.5}
  scaleY={1.5} image={canvas}  ref={imageRef} />;
};

class App extends React.Component {


  state = {
    stageWidth: 1000,
    stageHeight: 700
  };
  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener("resize", this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
  }

  checkSize = () => {
    const width = this.container.offsetWidth;
    const Height = this.container.offsetHeight;
    this.setState({
      stageWidth: width,
      stageHeight: Height
    });
  };

  qq = (x,y,id) => (
    <GIF key={id} x={x} y={y} src={QQ} scaleX={2} scaleY={2} />
  )

  eee = [this.qq(0,400,'A'),this.qq(400,0,'b')];

  eee3 = (props) => {
     //假設有個待辦事項的陣列
     let arrLists = ['打文章','寫程式','耍廢']
        
     //先建立一個空陣列
     let lists = [];
     
     //用迴圈將代辦事項的內容一個個放進空陣列中
     for(let i=0;i<=150;i=i+40){
         //記得在JSX中使用JS變數要用花括號包著
         for(let j=300;j<=500;j=j+40)
         {

            lists.push(<LionImage {...props} key={`D${i}${j}`} x={i} y={j}></LionImage>)
         }
     }

     return (
       <React.Fragment>
              {lists}
            {/* // <LionImage x={0} y={370} ></LionImage> */}
            </React.Fragment>
     )

  }

  render() {    

    var monsterWidth  = this.state.stageWidth/2.5;
    var monsterHeight = this.state.stageHeight/2.5;
    var monster1X = monsterWidth*1.5;
    var monster1Y = monsterHeight/5;
    var monster2X = monsterWidth/4;
    var monster2Y = monsterHeight*1.1;

    console.log(monsterWidth);
    console.log(monsterHeight);

    if( monsterWidth>monsterHeight )
      monsterHeight = monsterWidth;
    else
       monsterWidth = monsterHeight;
   


    return (
      <div
        style={{
          width: "100vmin",
          maxWidth: "1000px",
          maxHeight: "70vh",
          height: "100vmin",
          border: "1px solid grey"
        }}
        ref={(node) => {
          this.container = node;
        }}
      >
     {/* <img src={SnowSvg}></img> */}
      <Stage width={this.state.stageWidth} height={this.state.stageHeight} scaleX={this.state.stageWidth/540} scaleY={this.state.stageWidth/540}>
        <Layer>
          {/* <GIF  src="https://konvajs.org/assets/yoda.gif" /> */}
       
          {/* <GIF x={500} y={0} src={QQ} /> */}
          {/* <Image image={SnowSvg}></Image> */}
         
          {/* {this.eee.map((val) => (val))
        } */}

          <MyRect></MyRect>
          <Portal>
            <img
              style={{
                position: 'absolute',
                top: monster1Y,
                left: monster1X,
                width: monsterWidth,
                height: monsterHeight
              }}
              src={QQ}
            />
          </Portal>
          <Portal>
            <img
              style={{
                position: 'absolute',
                top: monster2Y,
                left: monster2X,
                width: monsterWidth,
                height: monsterHeight
              }}
              src={QQ}
            />
          </Portal>
          {/* <LionImage x={0} y={400} ></LionImage>
          <LionImage x={20} y={360} ></LionImage>
          <LionImage x={0} y={370} ></LionImage>
          <LionImage x={0} y={400} ></LionImage>
          <LionImage x={0} y={400} ></LionImage> */}
          
          {this.eee3()}
          
        </Layer>
      </Stage>
      </div>
    );
  }
}


class MyRect extends React.Component {
  changeSize = () => {
    // to() is a method of `Konva.Node` instances
    this.rect.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2
    });
  };

  componentDidMount() {
    this.rect.to({
      scaleX: 4 + 0.8,
      scaleY: 4 + 0.8,
      x:400,
      y:10,
      // visible: false,
      duration: 2,
      onFinish: () => {
        this.rect.to({
          // scaleX: 1,
          // scaleY: 1,
          // visible: false,
          opacity: 0,
        });
      },
    });

  }

  render() {
    return (
      <Rect
        ref={node => {
          this.rect = node;
        }}
        width={50}
        height={50}
        fill="green"
        draggable
        onDragEnd={this.changeSize}
        onDragStart={this.changeSize}
        x={0}
        y={400}
      />
    );
  }
}

class Portal extends React.Component {
  componentDidMount() {
    this.renderPortal();
  }

  componentDidUpdate(props) {
    this.renderPortal();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.defaultNode || this.props.node);
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  renderPortal(props) {
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    let children = this.props.children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof children.type === 'function') {
      children = React.cloneElement(children);
    }

    ReactDOM.render(children, this.props.node || this.defaultNode);
  }

  render() {
    return null;
  }
}

render(<App />, document.getElementById("root"));
