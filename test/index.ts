require('tinymce');
require('tinymce/plugins/image');
require('tinymce/themes/modern');
require('tinymce/skins/lightgray/skin.min.css');

const chai = require('chai');
const expect = chai.expect;

require('../src')

interface Window {
    describe: any;
    it: any;
    mocha: any;
    tinyMCE: any;
}

const mocha = window.mocha;
const tinyMCE = window.tinyMCE;

window.tinyMCE.init({
    selector: '#editor',
    width: 1000,
    theme: 'modern',
    skin: false,
    menubar: false,
    statusbar: false,
    plugins: ['image', 'h5img'],
    toolbar: 'undo redo | image',
    init_instance_callback: ed => {

    },
})

mocha.setup('bdd');
