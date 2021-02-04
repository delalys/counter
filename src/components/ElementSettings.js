import React, { Component } from 'react';

class ElementSettings extends Component {
    state = {
        value: '',
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value});
        // Clear input
        //this.setState({ value: '' });
    }

    
    render() {       
        const isSettingsClass = this.props.settingsOpen ? "is-open" : '';
        
        return(
            <div className={"settings " + isSettingsClass}>
                <div className="settings__item">
                    <span className="settings__title" style={{color: this.props.color1}}>Name:</span>
                    <form
                        className="modify-form"
                        onSubmit={(e) => {
                            this.props.modifyElement(e, this.state.value, this.props.index)
                        }}
                    >
                        <input
                            value={this.state.value}
                            type="text" 
                            placeholder="Enter a new name"
                            onChange={this.handleChange}
                        />
                        <input
                            type="submit" 
                            className="form-element__btn btn btn-primary"
                            value="OK"
                        />
                        <span className="bg-btn"></span>
                    </form>
                </div>
                <div className="settings__item">
                    <span className="settings__title" style={{color: this.props.color1}}>Color:</span>

                    {this.props.gradients.map((element, index) => {
                        let color1 = this.props.gradients[index].color1;
                        let color2 = this.props.gradients[index].color2;
                        let classActiveColor = (index == this.props.gradientIndex) ? 'color-example active' : 'color-example';
                        return <span 
                                    className={classActiveColor}
                                    onClick={ () => this.props.changeColor(this.props.index, index)}
                                    style={{backgroundImage: `linear-gradient(190deg, ${color1} 0%, ${color2} 100%)`}}
                                ></span>
                    })}
                </div>
                <div className="settings__item">
                    <span className="settings__title" style={{color: this.props.color1}}>Delete:</span>
                    <div
                        className="btn btn-danger"
                        onClick={() => this.props.handleRemove(this.props.index)}
                    >
                        Delete
                    </div>
                </div>
            </div>
        );
    }
}

export default ElementSettings;