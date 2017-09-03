import * as types from './types'

export function allowH5Upload(input: HTMLInputElement): boolean {
    return !!(FileReader && FormData && input.files);
}

export function clearUpload(input: HTMLInputElement) {
    input.value = '';
}

export function walkFiles(files: FileList | File[], callback: (file: File) => any): any[] {
    const filesArray = Array.from(files);
    return filesArray.map(file => callback(file));
}

export function isAcceptedFile(file: File, accept?: string[]) {
    if (!accept || !accept.length) {
        return file.type.indexOf('image/') > -1;
    }
    return accept.indexOf(file.type) > -1;
}

export async function sendFile(
    file: File,
    uploadFunc?: types.IUploadFile,
): Promise<types.ISendResult> {
    // If user defined upload function, call it for uploading. If not, just display the data img (for demo).
    if (uploadFunc) {
        return await uploadFunc(file);
    }
    return { file };
}

export function getImageDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e: types.IFileReaderEvent) => {
            resolve(e.target.result);
        };
        fileReader.onerror = () => reject();
        fileReader.readAsDataURL(file);
    });
}

export function createImg(src: string): string {
    return `<img src=${src} alt="" />`;
}
