import React, { PropTypes } from 'react'

export const CoreLayout = ({ children }) => (
    <div>
        {children}
    </div>
);

CoreLayout.propTypes = {
    children : PropTypes.element.isRequired
};

export default CoreLayout
