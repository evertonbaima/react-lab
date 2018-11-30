import React from 'react';
import ReactDOM from 'react-dom';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';
import { flattenMessages } from './Util';
import messages from './messages';

import App from './App.js';

addLocaleData([...en, ...pt]);

let params = new URLSearchParams(document.location.search.substring(1));
let locale = params.get('lang') || 'pt-BR';

const app = <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}><App /></IntlProvider>;

ReactDOM.render(app, document.getElementById('root'));
