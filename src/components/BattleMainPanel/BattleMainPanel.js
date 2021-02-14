import React from "react";
import { Stage, Layer } from "react-konva";
import MosterInformation from "./MosterInformation.js"
// gifler will be imported into global window object

import ReactDOM from 'react-dom';


class BattleMainPanel extends React.Component {


  state = {
    stageWidth: 600,
    stageHeight: 600
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

 

  render() {    
   
    const panelWidth  = this.state.stageWidth;
    const panelHeight = this.state.stageHeight;

    const monsterWidth = panelWidth/2;
    const enemyPokePosition = {"x":(panelWidth-monsterWidth-20),"y":(0+20)};
    
    const ourPokePosition   = {"x":(0+20)         ,"y":(panelHeight-monsterWidth+monsterWidth*2/8)};

    const enemyInformationPosition  = {"x":30,"y":(0+20)};
    const ourInformationPosition    = {"x":(350),"y":(450)};

    const {enemyImg,enemyName,enemyCurrentHP,enemyTotalHP} = this.props
    const {ourImg,ourName,ourCurrentHP,ourTotalHP} = this.props

  

    return (
      <div
        style={{    
          width: "100%",
          height: "100%",
          border: "0px solid grey"
        }}
        ref={(node) => {
          this.container = node;
        }}
      >
      <Stage width={panelWidth} height={panelHeight} scaleX={panelWidth/600} scaleY={panelHeight/600}>
        <MosterInformation 
          x={enemyInformationPosition.x} 
          y={enemyInformationPosition.y}
          monsterName={enemyName} currentHP={enemyCurrentHP} totalHP={enemyTotalHP}/>
        <MosterInformation 
          x={ourInformationPosition.x} 
          y={ourInformationPosition.y} 
          monsterName={ourName} currentHP={ourCurrentHP} totalHP={ourTotalHP}/>
        <Layer>
         

         
          <Portal>
            
            <img alt="enemy"
              style={{
                position: 'absolute',
                top: enemyPokePosition.y,
                left: enemyPokePosition.x,
                width: monsterWidth,
              }}
              src={enemyImg}
            />
            <img alt="our"
              style={{
                position: 'absolute',
                top: ourPokePosition.y,
                left: ourPokePosition.x,
                width: monsterWidth,
              }}
              src={ourImg}
            />
          </Portal>
          
        </Layer>
      </Stage>
      </div>
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

export default BattleMainPanel;
