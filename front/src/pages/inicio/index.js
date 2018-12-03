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

    componentWillMount() {
        this.props.action.posts.getPosts();
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    {this.props.posts.allPosts.map((item, index, array) =>
                        <div key={index}>
                            <h2>{item.title} <small>by {item.author}</small></h2>
                            <p>{item.content}</p>
                        </div>
                    )}
                </Col>
            </Row>
        );
    }
}

InicioPage.contextTypes = {
    router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(InicioPage);
