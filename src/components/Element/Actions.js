import React from 'react';
import PropTypes from 'prop-types';

const Actions = props => {
    return(
        <div className="element__actions">
            {/* toggle Full screen */}
            <span 
                className="element__actions-btn hide-list-screen" 
                onClick={() => props.handleElementFullScreen(props.index)} 
            >
                <svg className="element__full-screen"  pointerEvents="all" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="22 22 57 57" x="0px" y="0px">
                    <g>
                        <path className="path-1" d="M70,42h8V30a8,8,0,0,0-8-8H58v8H70Z"/>
                        <path className="path-2" d="M78,70V58H70V70H58v8H70A8,8,0,0,0,78,70Z"/>
                        <path className="path-3" d="M30,78H42V70H30V58H22V70A8,8,0,0,0,30,78Z"/>
                        <path className="path-4" d="M30,30H42V22H30a8,8,0,0,0-8,8V42h8Z"/>
                    </g>
                </svg>
            </span>
            {/* toggle Settings */}
            <span
                className="element__actions-btn hide-full-screen"
                onClick={() => props.handleDisplayElementSettings(props.index)}
            >
                <svg className="element__settings" height="512pt" viewBox="0 -21 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                    <path className="path-1" d="m448 42.667969h-206.613281c9.28125 19.433593 14.613281 41.066406 14.613281 64 0 22.933593-5.332031 44.5625-14.613281 64h206.613281c17.152344 0 33.257812-6.636719 45.3125-18.6875 12.054688-12.054688 18.6875-28.160157 18.6875-45.3125 0-35.285157-28.714844-64-64-64zm0 0"/>
                    <path className="path-2" d="m213.332031 106.667969c0 58.910156-47.753906 106.664062-106.664062 106.664062-58.910157 0-106.667969-47.753906-106.667969-106.664062 0-58.910157 47.757812-106.667969 106.667969-106.667969 58.910156 0 106.664062 47.757812 106.664062 106.667969zm0 0"/>
                    <path className="path-3" d="m256 362.667969c0-22.933594 5.332031-44.566407 14.613281-64h-206.613281c-35.285156 0-64 28.714843-64 64 0 17.152343 6.632812 33.257812 18.6875 45.3125 12.054688 12.050781 28.160156 18.6875 45.3125 18.6875h206.613281c-9.28125-19.4375-14.613281-41.066407-14.613281-64zm0 0"/>
                    <path className="path-4" d="m512 362.667969c0 58.910156-47.757812 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.910157 0 106.667969 47.757812 106.667969 106.667969zm0 0"/>
                </svg>
            </span>
            {/* Decrements */}
            <span 
                className="element__actions-btn" 
                onClick={() => {
                    props.handleChangeElementCount(props.index, 'decrement');
                    props.handleUpdateHistoryCount(props.index, 'decrement');
                    props.setCountHistoryStats();
                    props.handleChangeCountHistoryGroupByDay();
                    props.callUpdateDates();
                }}
            >
                <span className="element__button element__button--minus">-</span>
            </span>
        </div>
    )
}


Actions.propTypes = {
    index: PropTypes.number.isRequired,
    handleElementFullScreen: PropTypes.func.isRequired,
    handleDisplayElementSettings: PropTypes.func.isRequired,
    handleChangeElementCount: PropTypes.func.isRequired,
}

export default Actions;