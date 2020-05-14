import React from 'react';

const Connections = props => {

    const gitHub = (
        <a class="github-button" href="https://github.com/tri-bit/drizop" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star tri-bit/drizop on GitHub">Star</a>
    )

    return (
        <div>
        {gitHub}
        </div>
    );
};

export default Connections;