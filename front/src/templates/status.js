import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { Button, Modal } from 'react-bootstrap';

import { mapStateToProps, mapDispatchToProps } from '../Util';

class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const { status } = this.props;
        let mensagem = Array.isArray(status.message) ? status.message : [status.message];

        return (
            <div>
                <Modal show={status.showModal} backdrop={status.className === 'alert-info' ? 'static' : true} onHide={() => this.props.action.status.hideModal()}>
                    <Modal.Header className={status.className}>
                        <Modal.Title><FontAwesome {...(status.icon || { name: '' })} /> {status.title ? <FormattedMessage id={status.title} /> : null}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul style={mensagem.length === 1 ? { listStyle: 'none' } : {}}>
                            {mensagem.map((item, index) => <li key={index}><FormattedMessage id={item} defaultMessage={item} /></li>)}
                        </ul>
                    </Modal.Body>
                    {status.className !== 'alert-info' ?
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={() => this.props.action.status.hideModal()}><FormattedMessage id="status__fechar" /></Button>
                        </Modal.Footer>
                        :
                        null}
                </Modal>
            </div>
        );
    }
}

Status.contextTypes = {
    router: PropTypes.object,
    intl: intlShape.isRequired
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Status));
