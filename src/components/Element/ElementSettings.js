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
    handleChangeStateIncrementBy = (e) => {
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
            <div 
                className={"settings is-element " + isSettingsClass}
                style={{ height: this.props.settingsHeight }}
            >
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
                                onChange={this.handleChangeStateIncrementBy}
                            />
                    </div>
                    <hr/>
                    {/* Ok and Close */}
                    <div className="settings__item">
                        <label>

                            <input
                                value="Save and close"
                                className="d-none"
                                type="submit"
                                />
                                <span className="btn btn-primary">
                                    <svg className="element__settings" height="512pt" viewBox="0 -21 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                        <path className="path-1" d="m448 42.667969h-206.613281c9.28125 19.433593 14.613281 41.066406 14.613281 64 0 22.933593-5.332031 44.5625-14.613281 64h206.613281c17.152344 0 33.257812-6.636719 45.3125-18.6875 12.054688-12.054688 18.6875-28.160157 18.6875-45.3125 0-35.285157-28.714844-64-64-64zm0 0"/>
                                        <path className="path-2" d="m213.332031 106.667969c0 58.910156-47.753906 106.664062-106.664062 106.664062-58.910157 0-106.667969-47.753906-106.667969-106.664062 0-58.910157 47.757812-106.667969 106.667969-106.667969 58.910156 0 106.664062 47.757812 106.664062 106.667969zm0 0"/>
                                        <path className="path-3" d="m256 362.667969c0-22.933594 5.332031-44.566407 14.613281-64h-206.613281c-35.285156 0-64 28.714843-64 64 0 17.152343 6.632812 33.257812 18.6875 45.3125 12.054688 12.050781 28.160156 18.6875 45.3125 18.6875h206.613281c-9.28125-19.4375-14.613281-41.066407-14.613281-64zm0 0"/>
                                        <path className="path-4" d="m512 362.667969c0 58.910156-47.757812 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.910157 0 106.667969 47.757812 106.667969 106.667969zm0 0"/>
                                    </svg>
                                    Save and close
                                </span>
                            </label>
                    </div>
                </form>
            </div>
        );
    }
}

ElementSettings.propTypes = {
    index: PropTypes.number.isRequired,
    elements: PropTypes.array.isRequired,
    elementSettingsIsDisplayed: PropTypes.bool.isRequired,
    incrementBy: PropTypes.number.isRequired,
    settingsHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,


    handleElementFullScreen: PropTypes.func.isRequired,
    changeElementIncrementBy: PropTypes.func.isRequired,
    resetElementCount: PropTypes.func.isRequired,
    handleDisplayElementSettings: PropTypes.func.isRequired,
    deleteElement: PropTypes.func.isRequired,
    renameElement: PropTypes.func.isRequired,
}

export default ElementSettings;