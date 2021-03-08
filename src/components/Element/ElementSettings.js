import React, { Component} from 'react';
import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import PropTypes from 'prop-types';
import Stats from './stats';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import helpers from '../../helpers';
import { Textfit } from 'react-textfit';

class ElementSettings extends Component {
    state = {
        value: '',
        incrementBy: '',
        displayOption: "week",
        formatedDates: [],
    };

    componentDidMount() {
        this.formateDates(this.props.countHistoryGroupByDay);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.countHistoryGroupByDay !== prevProps.countHistoryGroupByDay) && (this.props.countHistoryGroupByDay !== null)) {
            this.formateDates(this.props.countHistoryGroupByDay);
        }
    }
    
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

    // Change display option state
    handleDisplayOption(option) {
        this.setState({displayOption : option}, () => {
            this.formateDates(this.props.countHistoryGroupByDay)
            }
        )
    }
  
    // Filter options, changes number of charts, date format
    formateDates = (data) => {
        let formatedData = []
        
        const datesFromatting = new Promise((resolve, reject) => {
            let numberOfDaysCut = (
                this.state.displayOption === 'week' ? 7 :
                this.state.displayOption === 'month' ? 30 :
                null
            );
            let dateFormat = (
                this.state.displayOption === 'week' ? 'dd D' :
                this.state.displayOption === 'month' ? 'D MMM' :
                null
            );
    
            // Re-order data
            let slicedData;

            if (data) {
                slicedData = data.slice(0, numberOfDaysCut);
                // Applies date format with this.dateFormat
                formatedData = slicedData.map(element => {
                    return {
                        ...element, day: [
                            dayjs(element.day).format(dateFormat),
                        ]
                    };
                });
            } else return slicedData = null;
            resolve("done")
        });
        datesFromatting.then((value) => {
            this.setState({formatedDates : formatedData.reverse()})
        });        
    }
    createMailContent = () => {
        
        dayjs.extend(LocalizedFormat);
        dayjs.extend(utc);
        dayjs.extend(localeData);
        if (this.props.countHistory) {
            let countList = this.props.countHistory.map((count, index) => {
                return dayjs(count.date).utc().local().format('LLL') + "%0D%0A";
            }).join('');
            const mailContent = 
                "Here is your history of " 
                + this.props.value 
                + ":%0D%0A"
                + countList;
            return mailContent
        }
    }
    
    render() {       
        const isSettingsClass = this.props.elementSettingsIsDisplayed ? "is-open" : '';
        const isDisplayOptionWeekClass = this.state.displayOption === "week" ? " is-active" : '';
        const isDisplayOptionMonthClass = this.state.displayOption === "month" ? " is-active" : '';

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
                    <div
                        className="btn btn-action d-block d-sm-none"
                        onClick={() => this.props.handleElementFullScreen(this.props.index)}
                    >
                        <svg className="element__full-screen" pointerEvents="all" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="22 22 57 57" x="0px" y="0px">
                            <g>
                                <path fill={this.props.gradients[this.props.gradient].color2} className="path-1" d="M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"/>
                                <path fill={this.props.gradients[this.props.gradient].color2} className="path-2" d="M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"/>
                                <path fill={this.props.gradients[this.props.gradient].color2} className="path-3" d="M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"/>
                                <path fill={this.props.gradients[this.props.gradient].color2} className="path-4" d="M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"/>
                            </g>
                        </svg>
                        Full screen
                    </div>
                    {/* Stats */}
                    <div className="settings__item is-well">
                        <div className="row">
                            <div className="col-md-7 text-center">
                                <div className="settings__title is-big">{this.props.value}</div>
                                <div className="row">
                                    <div className="col-4 settings__stats-col is-number no-border">
                                        <div className={"settings__stats-col--count "}><Textfit>{this.props.todayCounts}</Textfit></div>
                                        <div className="settings__stats-col--title">Today</div>
                                    </div>
                                    <div className="col-4 settings__stats-col is-number">
                                        <div className={"settings__stats-col--count "}><Textfit>{this.props.lastWeekCounts}</Textfit></div>
                                        <div className="settings__stats-col--title">Last week</div>
                                    </div>
                                    <div className="col-4 settings__stats-col is-number">
                                        <div className={"settings__stats-col--count "}><Textfit>{this.props.lastMonthCounts}</Textfit></div>
                                        <div className="settings__stats-col--title">Last month</div>
                                    </div>
                                </div>                                
                                <a 
                                    className="btn btn-primary d-inline-block mt-2" 
                                    href={"mailto:?subject=Counting history&body=" + this.createMailContent()}
                                >Send me complete history by mail</a>
                            </div>
                            <div className="col-md-5 settings__stats-col no-border">
                                <div className="stats">
                                    <div className="toggle__group">
                                        <span className={"toggle" + isDisplayOptionWeekClass} onClick={() => this.handleDisplayOption("week")}>Last week</span>
                                        <span className={"toggle" + isDisplayOptionMonthClass} onClick={() => this.handleDisplayOption("month")}>Last month</span>
                                    </div>
                                    <div className="square-stats" style={{ width: "100%", height: "200px", }}>
                                        <ParentSize>
                                            {({ width, height }) => {
                                                if (this.props.countHistoryGroupByDayDone) {
                                                    return width < 10 ? null : (
                                                            <Stats 
                                                                width={width} 
                                                                height={height}
                                                                gradient={this.props.gradient}
                                                                gradients={this.props.gradients}
                                                                displayOption={this.state.displayOption}
                                                                formatedDates={this.state.formatedDates}
                
                                                                countHistoryGroupByDay={this.props.countHistoryGroupByDay}
                                                            />
                                                        )
                                                    } 
                                                }
                                            }
                                        </ParentSize>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* Actions */}
                    <div className="settings__item btn-actions">
                        <div
                            className="btn btn-action"
                            onClick={() => this.handleResetElementCount(this.props.index)}
                        >
                            Reset to 0
                        </div>
                        <div
                            className="btn btn-action d-none d-sm-block"
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
                                <span className="btn btn-primary settings__item--save">
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