import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';

import DisplayOption from './DisplayOption';
import Chart from './Chart';
import KeyFigures from './KeyFigures';
import Buttons from './Buttons';
import Form from './Form';
import helpers from '../../helpers';

import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';

import ParentSize from '@visx/responsive/lib/components/ParentSize';


export default class ElementSettings extends PureComponent {
    state = {
        displayOption: "week",
        formatedDates: [],
        stateIncrementBy: '',
        stateValue: '',
    };

    componentDidMount() {
        this.formateDates(this.props.countHistoryGroupByDay);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.countHistoryGroupByDay !== prevProps.countHistoryGroupByDay) && (this.props.countHistoryGroupByDay !== null)) {
            this.formateDates(this.props.countHistoryGroupByDay);
        }
    }
    
    // Change Element name
    handleRenameElement = (e, newValue, indexElement) => {
        e.preventDefault();
        if (newValue !== '') {
            this.props.renameElement(indexElement, 'value', newValue);
        }
    }

    // Change Element IncrementBy
    handleChangeElementIncrementBy = (newIncrementBy, indexElement, oldIncrementBy) => {
        if ((newIncrementBy !== '') && (newIncrementBy !== 0)) {
            this.props.changeElementIncrementBy(indexElement, 'incrementBy', newIncrementBy);
        } else if ((newIncrementBy == null) || (newIncrementBy === 0)) {
            this.props.changeElementIncrementBy(indexElement, 'incrementBy', oldIncrementBy);
        }
    }

    // Set the count back to 0
    handleResetElementCount = (indexElement) =>
    this.props.resetElementCount(helpers.setStateElement(this.props.elements, indexElement, 'count', 0));

    // Change display option state
    handleDisplayOption = (option) => {
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

    // Create and formates the mail content made out of all counts
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

        return(
            <div 
                className={"settings is-element " + isSettingsClass}
                style={{ height: this.props.settingsHeight }}
            >
                <div className="modify-form">
                    
                    {/* Full screen mobile */}
                    <div
                        className="btn btn-action d-block d-md-none d-lg-none"
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
                            
                            {/* Left part */}
                            <div className="col-md-7 text-center">
                                <div className="settings__title is-big">{this.props.value}</div>
                                <KeyFigures 
                                    todayCounts={this.props.todayCounts}
                                    lastWeekCounts={this.props.lastWeekCounts}
                                    lastMonthCounts={this.props.lastMonthCounts}
                                />
                                <a 
                                    className="btn btn-primary d-inline-block mt-2" 
                                    href={"mailto:?subject=Counting history&body=" + this.createMailContent()}
                                >Send me complete history by mail</a>
                            </div>

                            {/* Right chart part */}
                            <div className="col-md-5 settings__stats-col no-border">
                                <div className="stats">

                                    <DisplayOption 
                                        handleDisplayOption={this.handleDisplayOption}
                                        displayOption={this.state.displayOption}
                                    />

                                    <div className="square-stats" style={{ width: "100%", height: "200px", }}>
                                        <ParentSize>
                                            {({ width, height }) => {
                                                if (this.props.countHistoryGroupByDayDone) {
                                                    return width < 10 ? null : (
                                                            <Chart 
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

                    {/* Buttons config */}
                    <Buttons 
                        handleResetElementCount={this.handleResetElementCount}
                        handleElementFullScreen={this.props.handleElementFullScreen}
                        deleteElement={this.props.deleteElement}
                        index={this.props.index}
                    />

                    <hr/>
                    
                    {/* Form fields */}
                    <Form
                        handleChangeElementIncrementBy={this.handleChangeElementIncrementBy}
                        handleDisplayElementSettings={this.props.handleDisplayElementSettings}
                        handleChangeStateIncrementBy={this.handleChangeStateIncrementBy}
                        handleNameChange={this.handleNameChange}
                        handleRenameElement={this.handleRenameElement}
                        index={this.props.index}
                        stateValue={this.state.value}
                        stateIncrementBy={this.state.incrementBy}
                        incrementBy={this.props.incrementBy}
                    />
                    
                </div>
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