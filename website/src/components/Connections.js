import React from 'react';

const Connections = props => {

    const gitHub = (
        <a class="github-button" href="https://github.com/tri-bit/drizop" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star tri-bit/drizop on GitHub">Star</a>
    )

    const npm = (
        <a href="https://badge.fury.io/js/%40tri-bit%2Fdrizop"><img src="https://badge.fury.io/js/%40tri-bit%2Fdrizop.svg" alt="npm version" height="18" /></a>
    )

    return (
        <div className="connections">
        {gitHub}
        {npm}
        </div>
    );
};

export default Connections;