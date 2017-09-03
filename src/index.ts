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
    const { accept = DEFAULT_ACCEPT } = uploadConfig;

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

    /**
     * 添加插入图片的按钮
     */
    editor.addButton('h5img', {
        icon: uploadConfig.icon || 'image',
        tooltip: 'Upload image',
        onclick: () => input.click(),
    });
});
