import React, {Component, Fragment} from 'react';
import ElementSettings from './ElementSettings';
import Actions from './Actions';
import PropTypes from 'prop-types';
import ResizeObserver from 'rc-resize-observer';
import helpers from '../../helpers';
import ClicSound from '../../assets/clic.mp3'


class Element extends Component {
    
    state = {
        isFullScreen: false,
        elementSettingsIsDisplayed: false,
        isClicked: false,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        position: 'relative',
        zIndex: 3,
        soundPlaying: 0,
        elementSettingsHeight: null,
        elementSettingsHeightCondensed: null,
    }
    
    element = React.createRef();
    elementSpaceAttribute = '';
    audio = [];
    
    componentDidMount() {
        this.setsWidth();
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
     
        // Create and preload 10 sounds for mobile delay
        for (let i = 0; i < 10; i++) {
            this.audio = [
                ...this.audio,
                new Audio (ClicSound)
            ]
            this.audio[i].preload = 'auto';
        }
        
        if (this.props.index === 0) {
            // Wait for mirror to be created then call setsElementSettingsHeight
            let mirrorIsDone = function functionOne(){
                return new Promise(()=>{
                    //if (this.elementsDisplayed === 1) {
                        this.createMirrorElement();
                });
            }.bind(this);
                mirrorIsDone().then(()=>{
                    // Does it only once in the list
                    this.setsElementSettingsHeight()
            });
        }
    }

    setsWidth = () => {
        let widthContainer = document.querySelector('.element__container').getBoundingClientRect()
        this.setState({width: widthContainer.width});
        this.element.current.style.cssText = "width: " + this.state.width + "px;";
    }

    // Create a copy of App Settings to set a natural fixed height to the original element
    createMirrorElement = () => {
        // forces update if new actions have change its state
        if (document.querySelector('.settings.is-mirror.is-element')) {
            document.querySelector('.settings.is-mirror.is-element').remove();
        }
        var mirrorElement = document.querySelector('.settings.is-element').cloneNode(true);
        document.querySelector('.element__container').appendChild(mirrorElement);
        mirrorElement.classList.add('is-mirror', 'is-open');
    }

    // Gets new settings height and sets it to state
    setsElementSettingsHeight = () => {
        this.createMirrorElement();
        let elementSettingsDOM = document.querySelector('.settings.is-mirror.is-element');
        let appDOM = document.querySelector('.app');
        if (this.props.appIsCondensed) {
            this.setState({elementSettingsHeightCondensed: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
            this.setState({elementSettingsHeight: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
        } else {
            this.setState({elementSettingsHeight: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.add('is-condensed');
            this.setState({elementSettingsHeightCondensed: elementSettingsDOM.offsetHeight + "px"});
            appDOM.classList.remove('is-condensed');
        }
    }

    // Place DOM element in after reference Dom element
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }  

    // Change Element settingsOpen
    handleDisplayElementSettings = (indexElement) => {
        this.setsElementSettingsHeight();
        // Toggle settingsOpen boolean
        let newState = !this.props.elements[indexElement].elementSettingsIsDisplayed;
        // Updates store with helper
        this.props.displayElementSettings(indexElement, 'elementSettingsIsDisplayed', newState);
    }

    handleChangeElementCount = (indexElement, changeType) => {
        // Play sound
        if (!this.props.appIsMute) {
          this.audio[this.state.soundPlaying].load();
          this.audio[this.state.soundPlaying].play()
        }
        this.setState({
          soundPlaying: (this.state.soundPlaying +1) % 10
        })
    
        // Check if resuslt is a positive number, otherwise sets it to 1
        let incrementBy = this.props.elements[indexElement].incrementBy;
        if ((incrementBy === 0) || (incrementBy === '')) {
          incrementBy = parseInt(1);
        }
        // Increment or decrement by the new value
        parseInt(incrementBy);
        if (changeType === "increment") {
          let newState = this.props.elements[indexElement].count +=  incrementBy;
          this.props.changeElementCount(indexElement, 'count', newState);
        } else if (changeType === "decrement") {
            let newState = this.props.elements[indexElement].count -=  incrementBy
            this.props.changeElementCount(indexElement, 'count', newState);
        }
      }

    handleElementFullScreen = (indexElement) => {

        // CLOSING
        if (this.props.elements[indexElement].elementIsInFullScreen) {
            
            // Sets back original positionning
            // Get valeu from state
            this.element.current.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + this.elementSpaceAttribute.y + "px;"+
                "position: fixed;" + 
                "z-index: 99;";
              
            this.setState({ 
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: this.elementSpaceAttribute.y,
                    left: this.elementSpaceAttribute.x,
                    position: "fixed",
                    zIndex: "99",
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";"+
                        "z-index:"+ this.state.zIndex;
                }
            )
            
            // Toggle Open state and class
            setTimeout(function(){ 
                let newState = ! this.props.elements[indexElement].elementIsInFullScreen;
                this.props.displayElementInFullScreen(helpers.setStateElement(this.props.elements, indexElement, 'elementIsInFullScreen', newState));
            }.bind(this), 0);
            
            // Fixes once animation is done and Removes mirror element
            setTimeout(function(){ 
                this.setState({ 
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: '',
                    left: '',
                    position: "relative",
                    zIndex: '',
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px"+
                        "left: " + this.state.left + ";"+
                        "top: " + this.state.top + ";"+
                        "position:"+ this.state.zIndex +";";
                }
            )
            // Remove copy in DOM
            document.querySelector('.mirror-element').remove();

            }.bind(this), 300);
        }

        // OPENING
        else {
            this.elementSpaceAttribute = this.element.current.getBoundingClientRect();

            // Create copy in dom
            let mirrorElement = this.element.current.cloneNode(true);
            mirrorElement.style.cssText = "visibility: hidden";
            mirrorElement.classList.add("mirror-element");
            this.insertAfter(mirrorElement, this.element.current);
            
            // Sets in fixed position
            this.setState({
                    width: this.elementSpaceAttribute.width,
                    height: this.elementSpaceAttribute.height,
                    top: this.elementSpaceAttribute.y,
                    left: this.elementSpaceAttribute.x,
                    position: "fixed",
                }, () => {
                    this.element.current.style.cssText = 
                        "width: " + this.state.width + "px;"+
                        "height: " + this.state.height + "px;"+
                        "left: " + this.state.left + "px;"+
                        "top: " + this.state.top + "px;"+
                        "position:"+ this.state.position +";";
                }
            )

            // Toggle Open state and class
            setTimeout(function(){ 
                let newState = ! this.props.elements[indexElement].elementIsInFullScreen;
                this.props.displayElementInFullScreen(helpers.setStateElement(this.props.elements, indexElement, 'elementIsInFullScreen', newState));
            }.bind(this), 0);
        }
    }

    render() {
        
        const {
            index,
            elements,
            count,
            value,
            incrementBy,
            elementSettingsIsDisplayed,

            resetElementCount,
            renameElement,
            changeElementIncrementBy,
            deleteElement,
        } = this.props;

        const isFullScreenClass = this.props.elements[index].elementIsInFullScreen ? "is-open" : '';

        const isCondensedClass = this.props.appIsCondensed ? "is-condensed" : '';
        
        const isClicked = this.state.isClicked ? "is-clicked" : '';

        let textSizeClass = (this.props.count > 9999) ? "reduced-text-1" : '';

        let elementSettingsHeightToGve = !this.props.elementSettingsIsDisplayed ? 0 : this.props.appIsCondensed ? this.state.elementSettingsHeightCondensed : this.state.elementSettingsHeight;

        return(
            <ResizeObserver onResize={() => {this.setsWidth(); this.setsElementSettingsHeight()}}>
                <Fragment>
                    {/* Settings */}
                    <ElementSettings                   
                        key={index}

                        index={index}
                        settingsHeight={elementSettingsHeightToGve}
                        elements={elements}
                        incrementBy={incrementBy}
                        elementSettingsIsDisplayed={elementSettingsIsDisplayed}
                        
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
                        />
                        
                        {/* Title */}
                        <h6 className="element__title">
                            {value}
                            <span className="element__title--notice"> (+{incrementBy})</span>
                        </h6>
                        
                        {/* Count */}
                        <span className={isClicked + " " + textSizeClass + " element__count"}>{count}</span>

                        {/* Increments */}
                        <span 
                            className="element__button element__button--plus"
                            onClick={() => this.handleChangeElementCount(index, 'increment') }
                            onMouseUp={(e) => this.setState({isClicked: false})}
                            onMouseDown={(e) => this.setState({isClicked: true})}
                        >+</span>
                    </div>
                </Fragment>
            </ResizeObserver>
        );
    }
}

Element.propTypes = {     
    index: PropTypes.number.isRequired,
    elements: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    incrementBy: PropTypes.number.isRequired,
    elementSettingsIsDisplayed: PropTypes.bool.isRequired,

    resetElementCount: PropTypes.func.isRequired,
    renameElement: PropTypes.func.isRequired,
    changeElementIncrementBy: PropTypes.func.isRequired,
    deleteElement: PropTypes.func.isRequired,
    displayElementSettings: PropTypes.func.isRequired,
    displayElementInFullScreen: PropTypes.func.isRequired,
}

export default Element;