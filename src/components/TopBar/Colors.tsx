import React from 'react'

interface Props {
    gradients: [{color1: string, color2: string}],
    gradient: number,
    colorizeApp: (index: number) => void,
}

const Colors: React.FC<Props> = props =>  {   
    return (
        <div className="settings__item col-lg-7 d-flex">

            <span className="settings__title">Color:</span>

            {props.gradients.map((el, index) => {
                let classActiveColor = (index === props.gradient) ? 'color-example active' : 'color-example';
                let color1 = props.gradients[index].color1;
                let color2 = props.gradients[index].color2;
                
                return (
                    <span 
                        className={classActiveColor}
                        key={index}
                        onClick={ () => props.colorizeApp(index)}
                    >
                        <span 
                            className="color-example__background d-block"
                            style={{backgroundImage: `linear-gradient(190deg, ${color1} 0%, ${color2} 100%)`}}
                        ></span>
                    </span>
                )
            })}
        </div>
    )
}

export default Colors;