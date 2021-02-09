import React, {Component} from 'react';
import gradients from './data/gradients';
import Element from './components/Element';
import NewElement from './components/NewElement';
import './App.css';


class App extends Component {

  state = {
    elements: [
      {
        id: 1,
        value: 'Loremp ipsum dolor',
        count: 0,
        gradient: 1,
        color1: '#9ea2e0',
        color2: '#5a60dd',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 2,
        value: 'Condiscipling dolor et sit',
        count: 0,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: 1,
      },
      {
        id: 3,
        value: 'Ame dolamesci',
        count: 0,
        gradient: 3,
        color1: '#9B7286',
        color2: '#A65B7D',
        settingsOpen: false,
        incrementBy: 1,
      }
    ],
    gradients: gradients,
  }

  handleCountChange = (index, change) => {
    // Check if resuslt is a positive number, otherwise sets it to 1
    let incrementBy = this.state.elements[index].incrementBy;
    if ((incrementBy === 0) || (incrementBy === '')) {
      incrementBy = parseInt(1);
    }
    // Increment or decrement by the new value
    if (change === "increment") {
      console.log(incrementBy);
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


  // Helper to easily change value in elements, takes in its index(number), its property to change(string) and new value
  setStateElement = (indexElement, property, newValue) => {
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
  }


  modifyName = (event, newValue, indexElement) => {
    event.preventDefault();
    if (newValue !== '') {
      this.setStateElement(indexElement, 'value', newValue);
    }
  }

  modifyIncrementBy = (newIncrementBy, indexElement) => {
    if (newIncrementBy !== ('' || 0)) {
      this.setStateElement(indexElement, 'incrementBy', newIncrementBy);
    }
  }
  
  modifyColor = (indexElement, indexColor) => {
    this.setStateElement(indexElement, 'gradient', indexColor);
  }


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
                  key={element.id}
                  id={element.id}
                  gradientIndex={element.gradient}
                  gradients={this.state.gradients}
                  settingsOpen={element.settingsOpen}
                  changeCount={this.handleCountChange}
                  modifyColor={this.modifyColor}
                  modifyName={this.modifyName}
                  modifyIncrementBy={this.modifyIncrementBy}
                  toggleSettings={this.toggleSettings}
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