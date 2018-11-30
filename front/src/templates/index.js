import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Status from './status';

/**
 * Main page que carrega cabeçalho, conteúdo, rodapé e a modal loading
 */
class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <div id="main" className="container" style={{ marginTop: 32 }}>
                    {this.props.children}
                </div>
                <Footer />
                <Status />
            </div>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
};

export default connect()(Index);
