import React, {Component} from 'react';
import gradients from './data/gradients';
import Element from './components/Element';
import NewElement from './components/NewElement';
import './App.css';
import ResizeObserver from 'rc-resize-observer';

import ClicSound from './assets/clic.mp3'



class App extends Component {

  state = {
    elements: [
      {
        id: 1,
        value: 'Full hour focused',
        count: 1,
        gradient: 1,
        color1: '#9ea2e0',
        color2: '#5a60dd',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 2,
        value: 'Glass of water drunk today',
        count: 3,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 3,
        value: 'Hit the gym',
        count: 3,
        gradient: 3,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 4,
        value: 'Day without smoking',
        count: 17,
        gradient: 4,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 1,
      }
    ],
    gradients: gradients,
    isMute: false,
  }
  
  
  handleCountChange = (index, change) => {
    // Play sound
    if (!this.state.isMute)  {
      let audio = new Audio (ClicSound);
      audio.play()
    }
    
    // Check if resuslt is a positive number, otherwise sets it to 1
    let incrementBy = this.state.elements[index].incrementBy;
    if ((incrementBy === 0) || (incrementBy === '')) {
      incrementBy = parseInt(1);
    }
    // Increment or decrement by the new value
    if (change === "increment") {
      parseInt(incrementBy);
      this.setState( prevState => ({
        count: prevState.elements[index].count +=  incrementBy
      }));
    } else if (change === "decrement") {
      this.setState( prevState => ({
        count: prevState.elements[index].count -=  incrementBy
      }));
    }
  }

  handleMuting = () => {
    this.setState({
      isMute: !this.state.isMute
    })
  }


  handleAddElement = (el) => {
    this.setState( prevstate => {
      return{
        elements: [
          ...prevstate.elements,
          el
        ]
      }
    });
    this.scrollToListTop();
  }
  handleRemoveElement = (index) => {
    let elements = this.state.elements;
    elements.splice(index, 1);
    this.setState({elements});
  }

  //--------//
  // Helper //  Eases value changes in an element, takes in: index (number) | property to change (string) | new value
  //--------//
  setStateElement = (indexElement, property, newValue) => 
    this.setState(({elements}) => ({
      elements: [
          ...elements.slice(0,indexElement),
          {
              ...elements[indexElement],
              [property]: newValue,
          },
          ...elements.slice(indexElement+1)
        ]
    }));

  // Change Element name
  modifyName = (event, newValue, indexElement) => {
    event.preventDefault();
    if (newValue !== '') {
      this.setStateElement(indexElement, 'value', newValue);
    }
  }

  // Change Element IncrementBy
  modifyIncrementBy = (newIncrementBy, indexElement) => {
    if (newIncrementBy !== ('' || 0)) {
      this.setStateElement(indexElement, 'incrementBy', newIncrementBy);
    }
  }

  // Change Element gradient
  modifyColor = (indexElement, indexColor) =>
    this.setStateElement(indexElement, 'gradient', indexColor);

  // Change Element gradient
  handleReinitElement = (indexElement) =>
    this.setStateElement(indexElement, 'count', 0);


  // Change Element settingsOpen
  toggleSettings = (indexElement) => {
    // Toggle settingsOpen boolean
    let currentState = this.state.elements[indexElement].settingsOpen;
    let newState = !currentState;

    this.setStateElement(indexElement, 'settingsOpen', newState);
  }


  scrollToListTop = () => this.container.current.scrollIntoView();
  
  container = React.createRef();

  
  render(){
    

    return (
        <div className="container">
            <div 
              className="element__container"
            >
              {this.state.elements.map( (element, index) =>
                <Element 
                  value={element.value}
                  count={element.count}
                  index={index}
                  key={index}
                  id={element.id}
                  incrementBy={element.incrementBy}
                  gradientIndex={element.gradient}
                  gradients={this.state.gradients}
                  appIsMute={this.state.isMute}
                  settingsOpen={element.settingsOpen}
                  changeCount={this.handleCountChange}
                  modifyColor={this.modifyColor}
                  modifyName={this.modifyName}
                  handleMuting={this.handleMuting}
                  modifyIncrementBy={this.modifyIncrementBy}
                  toggleSettings={this.toggleSettings}
                  handleReinitElement={this.handleReinitElement}
                  handleRemoveElement={this.handleRemoveElement}
                />
              )}
              <div 
                ref={this.container} 
                className="anchor"
              ></div>
            </div>
            <div className="element__container element__container--form">
              <NewElement 
                elements={this.state.elements}
                addElement={this.handleAddElement}
                gradients={this.state.gradients}
              />
            </div>
      </div>
    );
  }
}

export default App;