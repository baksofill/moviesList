/* globals describe: false, it: false */

'use strict';

import { expect } from 'chai';
import Main from './../../src/scripts/views/main-view.js';

describe('App', function() {
    it('Render', function() {

        const mainView = new Main();
        const App = $('#app');
        App.append(mainView.render().$el);

        expect(App[0].innerHTML).to.contain('My Title');
    });
});