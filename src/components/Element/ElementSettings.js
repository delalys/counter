import React, { Component} from 'react';
import PropTypes from 'prop-types';

class ElementSettings extends Component {
    state = {
        value: '',
        incrementBy: '',
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value});
    }

    handleIncrementByChange = (e) => {
        if (e.target.value !== '') {
            this.setState({ incrementBy: parseInt(e.target.value)});
        } else {
            this.setState({ incrementBy: e.target.value});
        }
    }
    
    render() {       
        const isSettingsClass = this.props.settingsOpen ? "is-open" : '';
        const isMuteLabel = this.props.appIsMute ? "Unmute app" : 'Mute app';

        return(
            <div className={"settings " + isSettingsClass}>
                <form
                    className="modify-form"
                    onSubmit={(e) => {
                        this.props.modifyName(e, this.state.value, this.props.index)
                        this.props.modifyIncrementBy(this.state.incrementBy, this.props.index)
                        this.setState({ value: '' });
                        this.setState({ incrementBy: '' });
                        this.props.toggleSettings(this.props.id)
                    }}
                >
                    {/* Delete */}
                    <div className="settings__item btn-actions">
                        <div
                            className="btn btn-action"
                            onClick={() => this.props.handleReinitElement(this.props.index)}
                        >
                            Reinitialise
                        </div>
                        <div
                            className="btn btn-action"
                            onClick={() => this.props.handleMuting()}
                        >
                            {isMuteLabel}
                        </div>
                        {/* <div
                            className="btn btn-action"
                            onClick={() => this.props.handleRemoveElement(this.props.index)}
                        >
                            Tap anywhere to count up
                        </div> */}
                        <div
                            className="btn btn-action btn-danger"
                            onClick={() => this.props.handleRemoveElement(this.props.index)}
                        >
                            Delete
                        </div>
                    </div>
                    {/* Name */}
                    <div className="settings__item">
                        <span className="settings__title">Name:</span>
                            <input
                                value={this.state.value}
                                type="text" 
                                placeholder="Enter a new name"
                                onChange={this.handleChange}
                            />
                    </div>
                    {/* Increment by */}
                    <div className="settings__item">
                        <span className="settings__title">Step: <span className="settings__title--notice">(now {this.props.incrementBy} by {this.props.incrementBy})</span></span>
                            <input
                                value={this.state.incrementBy}
                                type="number"
                                placeholder="How much you want to add every count up ?"
                                onChange={this.handleIncrementByChange}
                            />
                    </div>
                    {/* Color */}
                    <div className="settings__item">
                        <span className="settings__title">Color:</span>
                        {this.props.gradients.map((element, index) => {
                            let color1 = this.props.gradients[index].color1;
                            let color2 = this.props.gradients[index].color2;
                            let classActiveColor = (index === this.props.gradientIndex) ? 'color-example active' : 'color-example';
                            return <span 
                                        className={classActiveColor}
                                        key={index}
                                        onClick={ () => this.props.modifyColor(this.props.index, index)}
                                        style={{backgroundImage: `linear-gradient(190deg, ${color1} 0%, ${color2} 100%)`}}
                                    ></span>
                        })}
                    </div>
                    <hr/>
                    {/* Ok and Close */}
                    <div className="settings__item">
                        <input
                            value="Save and close"
                            className="btn btn-primary"
                            style={{background: this.props.color1}}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

ElementSettings.propTypes = {
    modifyName: PropTypes.func.isRequired,
    modifyIncrementBy: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    handleRemoveElement: PropTypes.func.isRequired,
    color1: PropTypes.string.isRequired,
    gradients: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
}

export default ElementSettings;