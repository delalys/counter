import React, {Component, Fragment} from 'react';
import ElementSettings from './ElementSettings';
import Actions from './Actions';
import PropTypes from 'prop-types';
import ResizeObserver from 'rc-resize-observer';


class Element extends Component {
    
    state = {
        isFullScreen: false,
        settingsOpen: false,
        isClicked: false,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        position: 'relative',
        zIndex: 3,
    }
    
    element = React.createRef();
    elementSpaceAttribute = '';

    componentDidMount() {
        this.setsWidth();
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
    }

    setsWidth = () => {
        let testWidthContainer = document.querySelector('.element__container').getBoundingClientRect()
        this.setState({width: testWidthContainer.width});
        this.element.current.style.cssText = "width: " + this.state.width + "px;";
    }

    // Place DOM element in after reference Dom element
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }  

    handleSettings = () => {
        this.setState(
            (prevState, props) => ({ settingsOpen: !this.state.settingsOpen })
        )
        this.props.toggleSettings(this.props.index);
      };

    toggleFullScreen = () => {

        // CLOSING
        if (this.state.isFullScreen) {
            
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
            let that = this; 
            setTimeout(function(){ 
                const currentState = that.state.isFullScreen;
                that.setState({ isFullScreen: !currentState });
            }, 0);
            
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
            let thisElement = this; 
            setTimeout(function(){ 
                const currentState = thisElement.state.isFullScreen;
                thisElement.setState({ isFullScreen: !currentState });
            }, 0);
        }
    }

    render() {
        
        const {
            value,
            count,
            index,
            id,
            gradientIndex,
            gradients,
            incrementBy,
            changeCount,
        } = this.props;
        
        const newGradient = gradients[gradientIndex];

        const isFullScreenClass = this.state.isFullScreen ? "is-open" : '';

        const isClicked = this.state.isClicked ? "is-clicked" : '';
    
        const elementStyle = {
            background: `linear-gradient(190deg, ${newGradient.color1} 0%, ${newGradient.color2} 100%)`,
        };

        return(
            <ResizeObserver onResize={() => this.setsWidth()}>
                <Fragment>
                    {/* Settings */}
                    <ElementSettings 
                        color1={gradients[gradientIndex].color2}
                        gradients={gradients}
                        gradientIndex={gradientIndex}
                        index={index}
                        key={index}
                        id={id}
                        appIsMute={this.props.appIsMute}
                        incrementBy={incrementBy}
                        modifyName={this.props.modifyName}
                        modifyIncrementBy={this.props.modifyIncrementBy}
                        settingsOpen={this.props.settingsOpen}
                        modifyColor={this.props.modifyColor}
                        handleMuting={this.props.handleMuting}
                        handleReinitElement={this.props.handleReinitElement}
                        handleRemoveElement={this.props.handleRemoveElement}
                        toggleSettings={this.handleSettings}
                    />
                    
                    {/* ELEMENT */}
                    <div 
                        className={isFullScreenClass +" element justify-content-center d-flex animate__animated animate__fadeInDown"} 
                        ref={this.element}
                    >
                        <span className="element__bg" style={elementStyle}></span>

                        {/* Actions button */}
                        <Actions
                            toggleFullScreen={this.toggleFullScreen}
                            handleSettings={this.handleSettings}
                            index={index}
                            changeCount={changeCount}
                        />
                        
                        {/* Title */}
                        <h6 className="element__title">{value}</h6>
                        
                        {/* Count */}
                        <span className={isClicked + " element__count"}>{count}</span>

                        {/* Increments */}
                        <span 
                            className="element__button element__button--plus"
                            onClick={() => changeCount(index, 'increment') }
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
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    gradients: PropTypes.array.isRequired,
    gradientIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    modifyName: PropTypes.func.isRequired,
    modifyIncrementBy: PropTypes.func.isRequired,
    settingsOpen: PropTypes.bool.isRequired,
    appIsMute: PropTypes.bool.isRequired,
    modifyColor: PropTypes.func.isRequired,
    handleRemoveElement: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    changeCount: PropTypes.func.isRequired,
}

export default Element;