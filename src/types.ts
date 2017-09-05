declare global {
    interface Window {
        tinyMCE: any;
        tinymce: any;
    }
}

export interface ISendResult {
    file: File;
    url?: string;
}

export type IUploadFile = (file: File) => Promise<ISendResult>;

/**
 * tinymce.settings.uploadConfig
 */
export interface IUploadConfig {
    // Define a function to upload HTML5 `File` object to web server
    uploadFile?: IUploadFile;
    // Accept upload image's type, e.g: ['image/jpeg','image/png',...], default is jpg / png / gif
    accept?: string[];
    // Toolbar icon, default is 'image'
    icon?: string;
    // Background color when drag img into editor
    dragColor?: string;
}

// https://stackoverflow.com/questions/35789498/new-typescript-1-8-4-build-error-build-property-result-does-not-exist-on-t
export interface IFileReaderEventTarget extends EventTarget {
    result: string;
}

export interface IFileReaderEvent extends Event {
    target: IFileReaderEventTarget;
    getMessage(): string;
}
