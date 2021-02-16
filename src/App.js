import React, {Component} from 'react';
import gradients from './data/gradients';
import Element from './components/Element';
import NewElement from './components/NewElement';
import './App.css';

import ClicSound from './assets/clic.mp3'



class App extends Component {

  state = {
    elements: [
      {
        id: 1,
        value: 'Glass of water',
        count: 3,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 2,
        value: 'Pushups',
        count: 50,
        gradient: 3,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 10,
      },
      {
        id: 3,
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
    gradient: 2,
    isMute: false,
    isCondensed: false,
    soundPlaying: 0,
  }
  
  
  audio = [];
  
  componentDidMount() {
    // Create and preload 10 sounds for mobile delay
    for (let i = 0; i < 10; i++) {
      this.audio = [
        ...this.audio,
        new Audio (ClicSound)
      ]
      this.audio[i].preload = 'auto';
    }
    this.modifyColor(2)
  }
  
  handleCountChange = (index, change) => {
    // Play sound
    if (!this.state.isMute) {
      this.audio[this.state.soundPlaying].load();
      this.audio[this.state.soundPlaying].play()
    }
    this.setState({
      soundPlaying: (this.state.soundPlaying +1) % 10
    })

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

  handleCondensing = () => {
    this.setState({
      isCondensed: !this.state.isCondensed
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
  modifyIncrementBy = (newIncrementBy, indexElement, oldIncrementBy) => {
    if ((newIncrementBy !== '') && (newIncrementBy !== '0')) {
      console.log(newIncrementBy);
      this.setStateElement(indexElement, 'incrementBy', newIncrementBy);
    } else if ((newIncrementBy == null) || (newIncrementBy === '0')) {
      this.setStateElement(indexElement, 'incrementBy', oldIncrementBy);
    }
  }

  // Change Element gradient
  modifyColor = (indexGradient) =>{
    this.setState({gradient: indexGradient});
  }

  removeClassByPrefix(node, prefix) {
    var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
    node.className = node.className.replace(regx, '');
    return node;
  }

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

    const isCondensedClass = this.state.isCondensed ? "is-condensed" : '';
    const isGradientClass = "gradient-" + this.state.gradient;

    return (
        <div className={isCondensedClass + " " + isGradientClass +" background-gradient"}>
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
                    gradient={this.state.gradient}
                    gradients={this.state.gradients}
                    appIsMute={this.state.isMute}
                    appIsCondensed={this.state.isCondensed}
                    settingsOpen={element.settingsOpen}
                    changeCount={this.handleCountChange}
                    modifyColor={this.modifyColor}
                    modifyName={this.modifyName}
                    handleMuting={this.handleMuting}
                    handleCondensing={this.handleCondensing}
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
      </div>
    );
  }
}

export default App;