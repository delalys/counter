import React, {PureComponent, Fragment, createRef} from 'react';
import ElementSettings from '../ElementSettings';
import helpers from '../../helpers';
import Actions from './Actions';

import ResizeObserver from 'rc-resize-observer';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import ClicSound from '../../assets/clic.mp3';

interface Props {
    index: number,
    elements: any[],
    gradients: any[],
    gradient: number,
    count: number,
    value: string,
    appIsCondensed: boolean,
    appIsMute: boolean,
    incrementBy: number,
    elementSettingsIsDisplayed: boolean,
    countHistory: any[],
    countHistoryGroupByDay: any[],

    resetElementCount: () => void,
    renameElement: () => void,
    changeElementIncrementBy: () => void,
    deleteElement: () => void,
    displayElementSettings: (indexElement: number, property: string, newState: boolean) => void,
    changeElementCount: (indexElement: number, property: string, newState: number) => void;
    displayElementInFullScreen: (arg0: any) => void,
    changeElementCountHistory: (elements: any[], indexElement: number , property: string, newCount: Object) => void,
    removeOneElementCountHistory: (elements: any[], indexElement: number , property: string, newCount: any[]) => void,
    formateDates: (countHistoryGroupByDay: any[]) => void;
    changeCountHistoryGroupByDay: (index: number, property: string, countHistoryGroupByDay: any[]) => void,
}
interface State {
    isFullScreen: boolean,
    elementSettingsIsDisplayed: boolean,
    isClicked: boolean,
    width: string | number,
    height: string | number,
    top: string,
    left: string,
    position: string,
    zIndex: string,
    soundPlaying: number,
    elementSettingsHeight: string,
    elementSettingsHeightCondensed: string,
    todayCounts: number,
    lastWeekCounts: number,
    lastMonthCounts: number,
    countHistoryGroupByDayDone: boolean,
    displayOption: string,
    formatedDates: [],
}
interface ElementSpaceAttribute {
    left: number,
    top: number,
    right: number,
    bottom: number,
    x: number,
    y: number,
    width: number,
    height: number,
}

class Element extends PureComponent <Props, State> {
    
    state: State = {
        isFullScreen: false,
        elementSettingsIsDisplayed: false,
        isClicked: false,
        width: '',
        height: '',
        top: '',
        left: '',
        position: 'relative',
        zIndex: '3',
        soundPlaying: 0,
        elementSettingsHeight: '',
        elementSettingsHeightCondensed: '',
        todayCounts: 0,
        lastWeekCounts: 0,
        lastMonthCounts: 0,
        countHistoryGroupByDayDone: false,
        displayOption: "week",
        formatedDates: [],
    }
    
    element = createRef() as React.MutableRefObject<HTMLDivElement>;
    elementSettingsComponent = createRef() as any;
    elementSpaceAttribute: ElementSpaceAttribute = {left: 0,top: 0,right: 0,bottom: 0,x: 0,y: 0,width: 0,height: 0};
    audio: HTMLAudioElement[] = [];
    
    componentDidMount() {
        // Initiates dimensions for full screen and settings opening animations
        this.setsWidth();
        this.elementSpaceAttribute = this.element.current!.getBoundingClientRect();

        // Initiaites Key Figures and data for chart
        this.setCountHistoryStats();
        const countHistoryGroupByDayDone = new Promise((resolve, reject) => {
            this.handleChangeCountHistoryGroupByDay();
            resolve("done")
        });
        countHistoryGroupByDayDone.then((value) => {
            this.setState({countHistoryGroupByDayDone: true})
        });
        this.callUpdateDates();
     
        // Create and preload 10 sounds for mobile delay
        for (let i = 0; i < 10; i++) {
            this.audio = [
                ...this.audio,
                new Audio (ClicSound)
            ]
            this.audio[i].preload = 'auto';
        }
        
        // Creates mirror element for settings height
        if (this.props.index === 0) {
            // Wait for mirror to be created then call setsElementSettingsHeight
            let mirrorIsDone = () => {
                return new Promise( () =>{
                    //if (this.elementsDisplayed === 1) {
                        this.createMirrorElement();
                });
            };
            mirrorIsDone().then( () =>{
                // Does it only once in the list
                this.setsElementSettingsHeight()
            });
        }

    }

    setsWidth = () => {
        let widthContainer = document.querySelector('.element__container')!.getBoundingClientRect();
        this.setState({width: widthContainer.width});
        this.element.current!.style.cssText = "width: " + this.state.width + "px;";
    }

    // Create a copy of App Settings to set a natural fixed height to the original element
    createMirrorElement = () => {
        // forces update if new actions have change its state
        let elementSettingsMirror: HTMLElement | null = document.querySelector('.settings.is-mirror.is-element')
        if (elementSettingsMirror) {
            elementSettingsMirror.remove();
        }
        let appSettingsMirror: HTMLElement | null = document.querySelector('.settings.is-element')
        let mirrorElement =  appSettingsMirror!.cloneNode(true) as HTMLDivElement;
        document.querySelector('.element__container')!.appendChild(mirrorElement);
        mirrorElement.classList.add('is-mirror', 'is-open');
    }

    // Gets new settings height and sets it to state
    setsElementSettingsHeight = () => {
        this.createMirrorElement();
        let elementSettingsDOM: HTMLElement | null = document.querySelector('.settings.is-mirror.is-element');
        let appDOM = document.querySelector('.app');
        if (this.props.appIsCondensed && appDOM && elementSettingsDOM) {
            this.setState({elementSettingsHeightCondensed: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
            this.setState({elementSettingsHeight: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
        } else  if (appDOM && elementSettingsDOM) {
            this.setState({elementSettingsHeight: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
            this.setState({elementSettingsHeightCondensed: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
        }
    }

    // Place DOM element in after reference Dom element
    insertAfter(newNode: HTMLElement, referenceNode: HTMLElement) {
        referenceNode.parentNode!.insertBefore(newNode, referenceNode.nextSibling);
    }  

    // Change Element settingsOpen
    handleDisplayElementSettings = (indexElement: number) => {
        this.setsElementSettingsHeight();
        // Toggle settingsOpen boolean
        let newState = !this.props.elements[indexElement].elementSettingsIsDisplayed;
        // Updates store with helper
        this.props.displayElementSettings(indexElement, 'elementSettingsIsDisplayed', newState);
    }

    // Increments / decrements based on App muted or note, inrementBy number
    handleChangeElementCount = (indexElement: number, changeType: string) => {
        // Play sound
        if (!this.props.appIsMute) {
          this.audio[this.state.soundPlaying].load();
          this.audio[this.state.soundPlaying].play()
        }
        // switch between series of preloading sounds
        this.setState({
          soundPlaying: (this.state.soundPlaying +1) % 10
        })
    
        // Check if ressult is a positive number, otherwise sets it to 1
        let incrementBy: any = this.props.elements[indexElement].incrementBy;
        if ((incrementBy === 0) || (incrementBy === '')) {
          incrementBy = 1;
        }

        // Increment or decrement by the new value
        if (typeof incrementBy === 'string') {
            parseInt(incrementBy);
        }
        if (changeType === "increment") {
          let newState = this.props.elements[indexElement].count += incrementBy;
          this.props.changeElementCount(indexElement, 'count', newState);
        } else if (changeType === "decrement") {
            let newState = this.props.elements[indexElement].count -= incrementBy;
            this.props.changeElementCount(indexElement, 'count', newState);
        }
    }

    // Full screen
    handleElementFullScreen = (indexElement: number) => {

        // CLOSING
        if (this.props.elements[indexElement].elementIsInFullScreen) {
            
            // Sets back original positionning
            // Get valeu from state
            this.element.current!.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + this.elementSpaceAttribute.y + "px;"+
                "position: fixed;" + 
                "z-index: 99;";
              
            this.setState({ 
                    width: '' + this.elementSpaceAttribute.width,
                    height: '' + this.elementSpaceAttribute.height,
                    top: '' + this.elementSpaceAttribute.y,
                    left: '' + this.elementSpaceAttribute.x,
                    position: "fixed",
                    zIndex: "99",
                }, () => {
                    this.element.current!.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";"+
                        "z-index:"+ this.state.zIndex;
                }
            )
            
            // Toggle Open state and class
            setTimeout(() => { 
                let newState = ! this.props.elements[indexElement].elementIsInFullScreen;
                this.props.displayElementInFullScreen(helpers.setStateElement(this.props.elements, indexElement, 'elementIsInFullScreen', newState));
            }, 0);
            
            // Fixes once animation is done and Removes mirror element
            setTimeout(() => { 
                this.setState({ 
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: '',
                    left: '',
                    position: "relative",
                    zIndex: '',
                }, () => {
                    this.element.current!.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px"+
                        "left: " + this.state.left + ";"+
                        "top: " + this.state.top + ";"+
                        "position:"+ this.state.zIndex +";";
                }
            )
            // Remove copy in DOM
            document.querySelector('.mirror-element')!.remove();

            }, 300);
        }

        // OPENING
        else {
            this.elementSpaceAttribute = this.element.current!.getBoundingClientRect();

            // Create copy in dom
            let mirrorElement = this.element.current!.cloneNode(true) as HTMLDivElement;
            mirrorElement.style.cssText = "visibility: hidden";
            mirrorElement.classList.add("mirror-element");
            this.insertAfter(mirrorElement, this.element.current!);
            
            // Sets in fixed position
            this.setState({
                    width: '' + this.elementSpaceAttribute.width,
                    height: '' + this.elementSpaceAttribute.height,
                    top: '' + this.elementSpaceAttribute.y,
                    left: '' + this.elementSpaceAttribute.x,
                    position: "fixed",
                }, () => {
                    this.element.current!.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";";
                }
            )

            // Toggle Open state and class
            setTimeout(() => { 
                let newState = ! this.props.elements[indexElement].elementIsInFullScreen;
                this.props.displayElementInFullScreen(helpers.setStateElement(this.props.elements, indexElement, 'elementIsInFullScreen', newState));
            }, 0);
        }
    }

    // Creates and updates Key figures
    setCountHistoryStats = () => {
        dayjs.extend(isToday)
        dayjs.extend(isSameOrAfter);
 
        let element = this.props.elements[this.props.index];
        if ((element.countHistory) && (element.countHistory.length >= 1)) {
            let dateOneWeekBefore = dayjs().subtract(7, 'day');
            let dateOneMonthBefore = dayjs().subtract(1, 'month');

            let todayCounts = 0;
            let lastWeekCounts = 0;
            let lastMonthCounts = 0;
            for (let count of element.countHistory) {
                if (dayjs(count.date).isToday()) {
                    todayCounts += count.incrementBy;
                }
                if (dayjs(count.date).isSameOrAfter(dateOneWeekBefore)) {
                    lastWeekCounts += count.incrementBy;
                }
                if (dayjs(count.date).isSameOrAfter(dateOneMonthBefore)) {
                    lastMonthCounts += count.incrementBy;
                }
            }
            this.setState({ todayCounts: todayCounts, lastWeekCounts: lastWeekCounts, lastMonthCounts: lastMonthCounts})
        }
    }

    // Creates data for chart, organized counts per day for last month.
    handleChangeCountHistoryGroupByDay = () => {
        dayjs.extend(isSameOrAfter);
        
        if (this.props.countHistory) {
            // Reduces this.props.countHistory list to counts within the last 31 days
            let countHistoryOfLastYear = this.props.countHistory.filter(date => dayjs(date.date).isSameOrAfter( dayjs().subtract(31, 'day') ))
    
            // Creates a list of objects for every day of last year, with date and number of Count on that day
            let countHistoryGroupByDay: any[] = [];
            for (let i = 0 ; i < 30; i++) {
                let dayToAdd = dayjs().subtract(i, 'day');
                countHistoryGroupByDay.push({day: dayToAdd, numberOfCount: 0});
            }
    
            // loop sur les dernier count de l'an dernier: countHistoryOfLastYear
            // pour chaque date =>  dayjs(countHistoryGroupByDay.day) add countHistoryOfLastYear.incrementby
            for (let countDate of countHistoryOfLastYear) {
                countHistoryGroupByDay.map((element, index) => { 
                    if (element.day.isSame(dayjs(countDate.date), 'day')) {
                        countHistoryGroupByDay[index].numberOfCount += countDate.incrementBy;
                    }
                    return countHistoryGroupByDay
                })
            }
    
            this.props.changeCountHistoryGroupByDay(this.props.index, 'countHistoryGroupByDay', countHistoryGroupByDay);
        }
    }


    // Adds or remove a count from the .countHistory property
    handleUpdateHistoryCount = (indexElement: number, type: string) => {
        if (type === 'increment') {
            let dateNow = dayjs(new Date());
            let newCount = {date: dateNow, incrementBy: this.props.incrementBy}
            this.props.changeElementCountHistory(this.props.elements, indexElement, 'countHistory', newCount);
        }
        if (type === 'decrement') {
            let newCount = this.props.elements[indexElement].countHistory;
            newCount.shift();
            this.props.removeOneElementCountHistory(this.props.elements, indexElement, 'countHistory', newCount);
        }
    } 

    // Call for updates function in elementSettings child to redraw the chart
    callUpdateDates = () => {
        if (!this.elementSettingsComponent.current) {
          return;
        }
        this.elementSettingsComponent.current.formateDates(this.props.countHistoryGroupByDay);
    }

    render() {

        const {
            index,
            elements,
            count,
            gradient,
            gradients,
            value,
            countHistory,
            incrementBy,
            elementSettingsIsDisplayed,
            appIsCondensed,
            countHistoryGroupByDay,

            resetElementCount,
            renameElement,
            changeElementIncrementBy,
            deleteElement,
        } = this.props;

        // CLasses related variables
        const isFullScreenClass = elements[index].elementIsInFullScreen ? "is-open" : '';
        const isCondensedClass = appIsCondensed ? "is-condensed" : '';
        const isClicked = this.state.isClicked ? "is-clicked" : '';
        let textSizeClass = (count > 9999) ? "reduced-text-1" : '';

        let elementSettingsHeightToGve = !elementSettingsIsDisplayed ? 0 : appIsCondensed ? this.state.elementSettingsHeightCondensed : this.state.elementSettingsHeight;

        return(
            <ResizeObserver onResize={() => {this.setsWidth(); this.setsElementSettingsHeight()}}>
                <Fragment>
                    {/* Settings */}
                    <ElementSettings 
                        ref={this.elementSettingsComponent}
                        key={index}

                        index={index}
                        value={value}
                        gradient={gradient}
                        gradients={gradients}
                        settingsHeight={elementSettingsHeightToGve}
                        elements={elements}
                        incrementBy={incrementBy}
                        elementSettingsIsDisplayed={elementSettingsIsDisplayed}
                        countHistory={countHistory}
                        countHistoryGroupByDay={countHistoryGroupByDay}
                        todayCounts={this.state.todayCounts}
                        lastWeekCounts={this.state.lastWeekCounts}
                        lastMonthCounts={this.state.lastMonthCounts}
                        countHistoryGroupByDayDone={this.state.countHistoryGroupByDayDone}
                        formatedDates={this.state.formatedDates}
                        displayOption={this.state.displayOption}
                        
                        resetElementCount={resetElementCount}
                        renameElement={renameElement}
                        changeElementIncrementBy={changeElementIncrementBy}
                        deleteElement={deleteElement}
                        handleDisplayElementSettings={this.handleDisplayElementSettings}
                        handleElementFullScreen={this.handleElementFullScreen}
                    />
                    
                    {/* ELEMENT */}
                    <div 
                        className={isFullScreenClass + " " + isCondensedClass + " element justify-content-center d-flex animate__animated animate__fadeInDown"} 
                        ref={this.element}
                    >
                        <span className="element__bg"></span>

                        {/* Actions button */}
                        <Actions
                            index={index}

                            handleDisplayElementSettings={this.handleDisplayElementSettings}
                            handleChangeElementCount={this.handleChangeElementCount}
                            handleElementFullScreen={this.handleElementFullScreen}
                            
                            handleUpdateHistoryCount={this.handleUpdateHistoryCount}
                            setCountHistoryStats={this.setCountHistoryStats}
                            handleChangeCountHistoryGroupByDay={this.handleChangeCountHistoryGroupByDay}
                            callUpdateDates={this.callUpdateDates}
                        />
                        
                        {/* Title */}
                        <h6 className="element__title">
                            {value}
                            <span className="element__title--notice"> (+{incrementBy})</span>
                        </h6>
                        
                        {/* Count */}
                        <span className={isClicked + " " + textSizeClass + " element__count"}>
                            {count}
                        </span>

                        {/* Increments */}
                        <span 
                            className="element__button element__button--plus"
                            onClick={() => {
                                this.handleChangeElementCount(index, 'increment'); 
                                this.handleUpdateHistoryCount(index, 'increment');
                                this.setCountHistoryStats();
                                this.handleChangeCountHistoryGroupByDay();
                                this.callUpdateDates();
                            }}
                            onMouseUp={(e) => this.setState({isClicked: false})}
                            onMouseDown={(e) => this.setState({isClicked: true})}
                        >+</span>
                    </div>
                </Fragment>
            </ResizeObserver>
        );
    }
}

export default Element;