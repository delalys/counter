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
      },
      {
        id: 2,
        value: 'Condiscipling dolor et sit',
        count: 0,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
      },
      {
        id: 3,
        value: 'Ame dolamesci',
        count: 0,
        gradient: 3,
        color1: '#9B7286',
        color2: '#A65B7D',
        settingsOpen: false,
      }
    ],
    gradients: gradients,
  }

  handleCountChange = (index, change) => {
    this.setState( prevState => ({
      count: prevState.elements[index].count += change
    }));
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
  }

  modifyElement = (event, newValue, index) => {
    event.preventDefault();
    this.setState( prevState => {
      // New 'players' array – a copy of the previous `players` state
      const updatedElements = [ ...prevState.elements ];
      // A copy of the player object we're targeting
      const updatedElement = { ...updatedElements[index] };

      // Update the target player's score
      updatedElement.value = newValue;
      // Update the 'players' array with the target player's latest score
      updatedElements[index] = updatedElement;

      // Update the `players` state without mutating the original state
      return {
        elements: updatedElements
      };
    });
}
  

  changeColor = (index, indexColor) => {
    // 1. Make a shallow copy of the items
    let elementsCopy = this.state.elements;
    // 2. Make a shallow copy of the item you want to mutate and Replace the property you're intested in
    let elementCopy = {
      ...elementsCopy[index],
      gradient: indexColor
    }
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    elementsCopy[index] = elementCopy;
    // 5. Set the state to our new copy
    this.setState({elementsCopy});
  }

  toggleSettings = (idElement) => {

    const currentState = this.state.elements.find( element => element.id === idElement).settingsOpen;
    const newState = !currentState;
    // 1. Make a shallow copy of the items
    let elementsCopy = this.state.elements;
    // 2. Make a shallow copy of the item you want to mutate and Replace the property you're intested in
    let elementCopy = {
      ...elementsCopy.find(o => o.id === idElement),
      settingsOpen: newState
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    const result = elementsCopy.find( element => element.id === idElement);
    const resultIndex = elementsCopy.indexOf(result);

    elementsCopy[resultIndex] = elementCopy;   
    // 5. Set the state to our new copy
    this.setState({elementsCopy});
  }

  handleRemove = (index) => {
    let elements = this.state.elements;
    elements.splice(index, 1);
    this.setState({elements});
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        elements: prevState.elements.filter(p => p.id !== id)
      };
    });
  }

  render(){

    return (
        <div className="container">

            <div className="element__container">
              {this.state.elements.map( (element, index) =>
                <Element 
                  value={element.value}
                  count={element.count}
                  index={index}
                  id={element.id}
                  key={element.id}
                  gradientIndex={element.gradient}
                  gradients={this.state.gradients}
                  settingsOpen={element.settingsOpen}
                  changeCount={this.handleCountChange}
                  changeColor={this.changeColor}
                  modifyElement={this.modifyElement}
                  toggleSettings={this.toggleSettings}
                  handleRemove={this.handleRemove}
                />
              )}
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
