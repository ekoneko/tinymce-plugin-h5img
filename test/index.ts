require('tinymce');
require('tinymce/plugins/image');
require('tinymce/themes/modern');
require('tinymce/skins/lightgray/skin.min.css');

require('../src')

interface Window {
    describe: any;
    it: any;
    mocha: any;
    tinyMCE: any;
}

const tinyMCE = window.tinyMCE;

window.tinyMCE.init({
    selector: '#editor',
    width: 1000,
    theme: 'modern',
    skin: false,
    menubar: false,
    statusbar: false,
    plugins: ['h5img'],
    toolbar: 'undo redo | h5img',
    init_instance_callback: ed => {

    },
})
