import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
// import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../../Util';

class InicioPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <p>Hello!</p>
                </Col>
            </Row>
        );
    }
}

InicioPage.contextTypes = {
    router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(InicioPage);
