import React, {Component} from 'react';

class Element extends Component {
    
    state = {
        isOpen: false
    }
    
    element = React.createRef();
    elementSpaceAttribute = '';
    
    componentDidMount() {
        this.setsWidth();
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
    }
    
    setsWidth = () => {
        this.elementSpaceAttribute = this.element.current.getBoundingClientRect();
        this.element.current.style.cssText = "width: " + this.elementSpaceAttribute.width + "px;";
    }

    // Place DOM element in after reference Dom element
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }  
    
    toggleFullScreen = () => {


        
        // CLOSING
        if (this.state.isOpen) {

            
            console.log('is open, closing...')
            
            // Sets back original positionning
            const marginAdjustedTop = this.elementSpaceAttribute.y - 16;
            this.element.current.style.cssText = 
            "width: " + this.elementSpaceAttribute.width + "px;"+
            "height: " + this.elementSpaceAttribute.height + "px;"+
            "left: " + this.elementSpaceAttribute.x + "px;"+
            "top: " + marginAdjustedTop + "px;"+
            "position: fixed;" + 
            "z-index: 99;";
            
            // Toggle Open state and class
            const that = this; 
            setTimeout(function(){ 
                const currentState = that.state.isOpen;
                that.setState({ isOpen: !currentState });
            }, 0);
            
            const thisElement = this; 
            setTimeout(function(){ 
                thisElement.element.current.style.cssText = 
                    "position: relative" +
                    "z-index: ;";
                
                // Remove copy in DOM
                document.querySelector('.mirror-element').remove();
            }, 300);
        }
        // OPENING
        else {
            console.log('is close, opening...')
            // Create copy in dom
            const mirrorElement = this.element.current.cloneNode(true);
            mirrorElement.style.cssText = "visibility: hidden";
            mirrorElement.classList.add("mirror-element");
            this.insertAfter(mirrorElement, this.element.current);
            
            // Sets in fixed position
            const marginAdjustedTop = this.elementSpaceAttribute.y - 16;
            this.element.current.style.cssText = 
                "width: " + this.elementSpaceAttribute.width + "px;"+
                "height: " + this.elementSpaceAttribute.height + "px;"+
                "left: " + this.elementSpaceAttribute.x + "px;"+
                "top: " + marginAdjustedTop + "px;"+
                "margin: 0 !important;"+
                "position: fixed;";

            // Toggle Open state and class
            const thisElement = this; 
            setTimeout(function(){ 
                const currentState = thisElement.state.isOpen;
                thisElement.setState({ isOpen: !currentState });
            }, 0);
        }

    }

    render() {
        
        const {
            value,
            count,
            index,
            gradient,
            gradients,
            changeCount,
        } = this.props;
        
        const newGradient = gradients[gradient];

        const isOpenClass = this.state.isOpen ? "is-open" : '';
    
        const elementStyle = {
            background: `linear-gradient(190deg, ${newGradient.color1} 0%, ${newGradient.color2} 100%)`,
        };

        return(
            <div 
                className={isOpenClass +" element my-3 justify-content-center d-flex animate__animated animate__fadeInDown"} 
                ref={this.element}
            >
                <span className="element__bg" style={elementStyle}></span>
                <svg 
                    onClick={() => this.toggleFullScreen()} 
                    className="element__full-screen" 
                    pointerEvents="all"
                    xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="22 22 57 57" x="0px" y="0px"><g><path d="M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"/><path d="M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"/><path d="M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"/><path d="M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"
                /></g></svg>
                <h6 className="element__title">{value}</h6>
                <span className="element__count">{count}</span>
                <button className="element__button element__button--plus" onClick={() => changeCount(index, +1)}>+</button>
                <button className="element__button element__button--minus" onClick={() => changeCount(index, -1)}>-</button>
            </div>
        );
    }
}

export default Element;