import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="container text-xs-center">
                <footer>
                    <p>
                        <small>Todos os direitos reservados - {new Date().getFullYear()}</small>
                    </p>
                </footer>
            </div>
        );
    }
}

export default Footer;
