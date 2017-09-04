import * as utils from './utils';
import * as types from './types';

declare global {
    interface Window {
        tinyMCE: any;
        tinymce: any;
    }
}

const DEFAULT_ACCEPT = [
    'image/jpeg',
    'image/png',
    'image/gif',
];

async function handleInputChange(editor, input: HTMLInputElement, uploadConfig: types.IUploadConfig) {
    if (!input.files || !input.files.length) {
        return;
    }
    const files = input.files;
    // 用户上传图片完成后的回调
    const promises = utils.walkFiles(files,  async file => {
        if (utils.isAcceptedFile(file)) {
            const result = await utils.sendFile(file, uploadConfig.uploadFile);
            return await displayImg(editor, result)
        }
    });
    try {
        await Promise.all(promises);
    } catch (e) {
        console.error(e);
    }
    utils.clearUpload(input);
}

async function displayImg(editor, result: types.ISendResult): Promise<any> {
    const { file, url } = result;
    if (url) {
        const img = utils.createImg(url);
        editor.insertContent(img);
    } else {
        const src = await utils.getImageDataUrl(file);
        const img = utils.createImg(src);
        editor.insertContent(img);
    }
}

window.tinyMCE.PluginManager.add('h5img', function(editor) {
    const uploadConfig: types.IUploadConfig = editor.settings.uploadConfig || {};
    const { accept = DEFAULT_ACCEPT, dragColor = '#f8ffe5' } = uploadConfig;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', accept.join(','));

    // 目前仅支持 html5 方式上传
    if (!utils.allowH5Upload(input)) {
        return;
    }

    input.addEventListener('change', () => {
        handleInputChange(editor, input, uploadConfig);
    });

    const dragEnter = () => {
        editor.getBody().style.background = dragColor;
    }

    const dragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const dragLeave = (e) => {
        const body = editor.getBody();
        if (e.x < 30 || e.x > body.clientWidth - 30 || e.y < 30 || e.y > body.clientHeight - 30) {
            body.style.background = 'none';
        }
    }

    const drop = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        editor.getBody().style.background = 'none';

        const file = e.dataTransfer.files[0];
        if (utils.isAcceptedFile(file)) {
            const result = await utils.sendFile(file, uploadConfig.uploadFile);
            return await displayImg(editor, result)
        }
    }

    editor.on('init', () => {
        const body = editor.getBody();
        body.addEventListener('dragenter', dragEnter, false);
        body.addEventListener('dragover', dragOver, false);
        body.addEventListener('drop', drop, false);
        body.addEventListener('dragleave', dragLeave, false);
    })

    editor.addButton('h5img', {
        icon: uploadConfig.icon || 'image',
        tooltip: 'Upload image',
        onclick: () => input.click(),
    });
});
