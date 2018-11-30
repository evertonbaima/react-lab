import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../Util';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect className="navbar-fixed-top navbar-dark bg-primary" fluid>
                <Navbar.Header >
                    <Navbar.Brand>
                        <Link id="go-home" to="/">
                            <img src="images/logo-branca.png" style={{ maxHeight: 24 }} alt="presentation" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle>
                        <FontAwesome name="bars" style={{ color: '#FFF' }} />
                    </Navbar.Toggle>
                </Navbar.Header>
            </Navbar >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
