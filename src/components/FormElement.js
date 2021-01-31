import { render } from '@testing-library/react';
import React, { Component } from 'react';

class FormElement extends Component {

    state = {
        value: '',
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value});
    }

    handleAddElement = (e) => {
        e.preventDefault();

        // Get a random gradient 
        const randomGradientId = Math.floor(Math.random() * this.props.gradients.length);
        
        // Create a new element
        const newElement = {
            value: this.state.value,
            count: 0,
            id: this.props.elements.length + 1,
            gradient: randomGradientId,
        }
        
        // Add a new element to app state
        this.props.addElement(newElement);
        
        // Clear input
        this.setState({ value: '' });
    }

    render() {
        return(
            <form className="form-element mt-3" onSubmit={this.handleAddElement}>
                <input 
                    value={this.state.value}
                    className="form-element__input" 
                    type="text" 
                    placeholder="Enter a new name"
                    onChange={this.handleChange}
                ></input>
                <input
                    type="submit" 
                    className="form-element__btn btn btn-primary"
                    placeholder="Add"
                />
                <span className="bg-btn"></span>
            </form>
        )
    }
}

export default FormElement;