import React, { useState } from 'react'
import './style.css'
import { gsap, Power2 } from 'gsap';
import { Timeline } from 'gsap/gsap-core';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: '',
      times: 0,
      play: [],
      colorClicked: '',
      toPlay: []

    };
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevStates) {

    if (prevStates.color != this.state.color || prevStates.times != this.state.times) {
      this.game()
    }

    if (prevStates.play != this.state.play) {
      this.showColor()
    }
  }

  addNew=()=> {
    this.setState({ color: Math.floor(Math.random() * 4) + 1 })
    this.setState({ times: Math.floor(Math.random() * 5) + 1 })
  }

  game=()=> {
    if (this.state.color == 1) {
      this.setState({ play: [...this.state.play, ['red', this.state.times]] })
    } else if (this.state.color == 2) {
      this.setState({ play: [...this.state.play, ['blue', this.state.times]] })
    } else if (this.state.color == 3) {
      this.setState({ play: [...this.state.play, ['green', this.state.times]] })
    } else if (this.state.color == 4) {
      this.setState({ play: [...this.state.play, ['yellow', this.state.times]] })
    }
  }

  showColor=()=> {
    let tl = new gsap.timeline({onComplete: ()=>{
      this.setState({toPlay: this.state.play})
    }})
    this.state.play.forEach((timeAndColor, i) => {
      for (let index = 0; index < timeAndColor[1]; index++) {
        tl.to(`#${timeAndColor[0]}`, 0.5, { opacity: 1, filter: 'saturate(5)' })
          .to(`#${timeAndColor[0]}`, 0.5, { opacity: 0.7, filter: 'saturate(1)' })
      }
    });
  }

  selectColor=()=> {
  

    if (this.state.toPlay[0][0] == this.state.colorClicked) {

      if (this.state.toPlay[0][1] > 0) {

        this.state.toPlay[0][1] -= 1

        if (this.state.toPlay[0][1] == 0) {
          this.addNew()
          this.setState({toPlay: this.state.play})
        }

      }
    }

  }

  render() {

    return (
      <>
        <div className='container'>
          <div className="colorswrap">
            <div className="colorsgroup">
              <div onClick={()=>{this.setState({colorClicked: 'green'},()=>{this.selectColor()})}} className="color" id="green"></div>
              <div onClick={()=>{this.setState({colorClicked: 'red'},()=>{this.selectColor()})}}  className="color" id="red"></div>
            </div>

            <div className="colorsgroup">
              <div onClick={()=>{this.setState({colorClicked: 'yellow'},()=>{this.selectColor()})}}  className="color" id="yellow"></div>
              <div onClick={()=>{this.setState({colorClicked: 'blue'},()=>{this.selectColor()})}}   className="color" id="blue"></div>
            </div>
          </div>

          <div onClick={() => { this.addNew() }} id="start">
            START
          </div>
        </div>
      </>
    )
  }
}