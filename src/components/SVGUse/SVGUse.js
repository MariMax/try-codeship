import React, { PropTypes } from 'react';

function SVGUse(props) {
    let { href, ...restProps } = props;
    return (
        <svg {...restProps}>
            <use xlinkHref={href}/>
        </svg>
    );
}

SVGUse.propTypes = {
    href: PropTypes.string.isRequired
};

SVGUse.defaultProps = {
    className: 'icon'
};

export default SVGUse;