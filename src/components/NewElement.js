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

        const elements = this.props.elements;
        // Get gradient, select the next one on the list based on the last color displayed
        const nextGradientStyleId = (elements[elements.length - 1].gradient + 1) % this.props.gradients.length;
        
        // Create a new element
        const newElement = {
            value: this.state.value,
            count: 0,
            id: this.props.elements.length + 1,
            gradient: nextGradientStyleId,
            settingsOpen: false,
            incrementBy: 1,
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
                    className="form-element__input" 
                    value={this.state.value}
                    type="text" 
                    placeholder="Enter a new name"
                    onChange={this.handleChange}
                ></input>
                <input
                    type="submit" 
                    className="form-element__btn btn btn-primary"
                    value="Add"
                />
                <span className="bg-btn"></span>
            </form>
        )
    }
}

export default FormElement;