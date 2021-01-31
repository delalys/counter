import React, {Component} from 'react';
import { render } from "react-dom";
import { motion, useCycle } from "framer-motion";
import gradients from './data/gradients';
import Element from './components/Element';
import FormElement from './components/FormElement';
import './App.css';

console.log(gradients)

class App extends Component {

  state = {
    elements: [
      {
        id: 0,
        value: 'Loremp ipsum dolor',
        count: 0,
        gradient: 1,
        color1: '#9ea2e0',
        color2: '#5a60dd',
      },
      {
        id: 1,
        value: 'Condiscipling dolor et sit',
        count: 0,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
      },
      {
        id: 2,
        value: 'Ame dolamesci',
        count: 0,
        gradient: 3,
        color1: '#9B7286',
        color2: '#A65B7D',
      }
    ],
    gradients: gradients,
  }

  handleCountChange = (index, change) => {
    this.setState( prevState => ({
      count: this.state.elements[index].count += change
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
  
  withMyHook(Component) {
    return function WrappedComponent(props) {
      const [animate, cycleCard] = useCycle(
        {height: '25rem', top: '0', display:'none'},
        {height: '100%', top: '-1rem', display:'block'},
      );
      return <Component {...props} myHookValue={animate} />;
    }
  }

  render(){
    const myHookValue = this.props.myHookValue;
      return (
        <motion.div 
          className="container"
          myHookValue={this.withMyHook}
          animate={myHookValue}
          >
          <div className="element__container">
            {this.state.elements.map( (element, index) =>
              <Element 
                value={element.value}
                count={element.count}
                index={index}
                key={index}
                gradient={element.gradient}
                gradients={this.state.gradients}
                changeCount={this.handleCountChange}
                handleValueChange={this.handleValueChange}
              />
            )}
          </div>
          <div className="element__container element__container--form">
            <FormElement 
              elements={this.state.elements}
              addElement={this.handleAddElement}
              gradients={this.state.gradients}
            />
            
          </div>
        </motion.div>
      );
  }
}

export default App;
