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
        incrementBy: '',
      },
      {
        id: 2,
        value: 'Condiscipling dolor et sit',
        count: 0,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        settingsOpen: false,
        incrementBy: '',
      },
      {
        id: 3,
        value: 'Ame dolamesci',
        count: 0,
        gradient: 3,
        color1: '#9B7286',
        color2: '#A65B7D',
        settingsOpen: false,
        incrementBy: '',
      }
    ],
    gradients: gradients,
  }

  handleCountChange = (index, change) => {
    let incrementBy = parseInt(this.state.elements[index].incrementBy);
    if (change === "increment") {
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

  modifyName = (event, newValue, index) => {
    event.preventDefault();
    console.log(newValue)
    if (newValue !== '') {
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
  }

  modifyIncrementBy = (e, newIncrementBy, idElement) => {
    // 1 Make a copy of the items
    let elementsCopy = this.state.elements;
    // 2 Make a shallow copy of one item to mutate it and Replace the property desired
    let elementCopy = {
      ...elementsCopy.find(o => o.id === idElement),
      incrementBy: newIncrementBy
    };
    // 3 Put it back into the array
    let result = elementsCopy.find( element => element.id === idElement);
    let resultIndex = elementsCopy.indexOf(result);
    elementsCopy[resultIndex] = elementCopy;   
    // 4 Set the state to new copy
    this.setState({elementsCopy});
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

    let currentState = this.state.elements.find( element => element.id === idElement).settingsOpen;
    let newState = !currentState;
    // 1. Make a shallow copy of the items
    let elementsCopy = this.state.elements;
    // 2. Make a shallow copy of the item you want to mutate and Replace the property you're intested in
    let elementCopy = {
      ...elementsCopy.find(o => o.id === idElement),
      settingsOpen: newState
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    let result = elementsCopy.find( element => element.id === idElement);
    let resultIndex = elementsCopy.indexOf(result);

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
                  changeColor={this.changeColor}
                  modifyName={this.modifyName}
                  modifyIncrementBy={this.modifyIncrementBy}
                  toggleSettings={this.toggleSettings}
                  handleRemove={this.handleRemove}
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
