import React, { Component} from 'react';
import PropTypes from 'prop-types';
import helpers from '../../helpers';

class ElementSettings extends Component {
    state = {
        value: '',
        incrementBy: '',
    };

    // State changes for Name input
    handleNameChange = (e) => {
        this.setState({ value: e.target.value});
    }

    // State changes for IncrementBy input
    handleIncrementByChange = (e) => {
        if (e.target.value !== '') {
            this.setState({ incrementBy: parseInt(e.target.value)});
        }
    }


    // Set the count back to 0
    handleResetElementCount = (indexElement) =>
    this.props.resetElementCount(helpers.setStateElement(this.props.elements, indexElement, 'count', 0));

    // Change Element name
    handleRenameElement = (e, newValue, indexElement) => {
        e.preventDefault();
        if (newValue !== '') {
            this.props.renameElement(indexElement, 'value', newValue);
        }
    }

    // Change Element IncrementBy
    handleChangeElementIncrementBy = (newIncrementBy, indexElement, oldIncrementBy) => {
        if ((newIncrementBy !== '') && (newIncrementBy !== '0')) {
            this.props.changeElementIncrementBy(indexElement, 'incrementBy', newIncrementBy);
        } else if ((newIncrementBy == null) || (newIncrementBy === '0')) {
            this.props.changeElementIncrementBy(indexElement, 'incrementBy', oldIncrementBy);
        }
    }

    render() {       
        const isSettingsClass = this.props.elementSettingsIsDisplayed ? "is-open" : '';

        return(
            <div className={"settings " + isSettingsClass}>
                <form
                    className="modify-form"
                    onSubmit={(e) => {
                        this.handleRenameElement(e, this.state.value, this.props.index)
                        this.handleChangeElementIncrementBy(this.state.incrementBy, this.props.index, this.props.incrementBy)
                        this.setState({ incrementBy: '' });
                        this.setState({ value: '' });
                        this.props.handleDisplayElementSettings(this.props.index);
                    }}
                >
                    {/* Actions */}
                    <div className="settings__item btn-actions">
                        <div
                            className="btn btn-action"
                            onClick={() => this.handleResetElementCount(this.props.index)}
                        >
                            Reset to 0
                        </div>
                        <div
                            className="btn btn-action"
                            onClick={() => this.props.handleElementFullScreen(this.props.index)}
                        >
                            Full screen
                        </div>
                        <div
                            className="btn btn-action btn-danger"
                            onClick={() => this.props.deleteElement(this.props.index)}
                        >
                            Delete
                        </div>
                    </div>
                    <hr/>
                    {/* Name */}
                    <div className="settings__item">
                        <span className="settings__title">Name:</span>
                            <input
                                value={this.state.value}
                                type="text" 
                                placeholder="Enter a new name"
                                onChange={this.handleNameChange}
                            />
                    </div>
                    {/* Increment by */}
                    <div className="settings__item">
                        <span className="settings__title">Step: <span className="settings__title--notice">Now {this.props.incrementBy} by {this.props.incrementBy}</span></span>
                            <input
                                value={this.state.incrementBy}
                                type="number"
                                placeholder="How much you want to add every count up ?"
                                onChange={this.handleIncrementByChange}
                            />
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
    renameElement: PropTypes.func.isRequired,
    modifyIncrementBy: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    deleteElement: PropTypes.func.isRequired,
    gradients: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
}

export default ElementSettings;