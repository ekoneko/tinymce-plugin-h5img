# tinymce-plugin-h5img

A tinyMCE plugin for upload image on HTML5(input[type=file] or drag and drop)

## install

```
npm install tinymce-plugin-h5img
```

## usage

### import

You can import the plugin easily as `commonjs` / `es6` modules. (with `tsc`, `webpack`, etc)

```
import 'tinymce-plugin-h5img'
require('tinymce-plugin-h5img')
```

Also, you can use some tools like `gulp` or `grunt` to copy `lib/index.js` to anywhere you can visit by browser.

Of course, you can `Ctrl + C` `Ctrl +V` by yourself.

### setup

````js
window.tinyMCE.init({
    plugins: ['h5img', /* and other plugins */],
    toolbar: 'h5img',
    uploadConfig: {
        // configure
    }
});
````

The `uploadConfig` has theese attributes:

#### uploadFile

Define a function to upload HTML5 `File` object to web server.

The function will get a [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object and return a promise.

The type define is:

````ts
interface ISendResult {
    file: File;
    url?: string;
}
type IUploadFile = (file: File) => Promise<ISendResult>
````

If `uploadConfig.uploadFile` is not defined, it will only display local image, without post file.

#### accept

Accept upload image's type, e.g: ['image/jpeg','image/png',...], default scene allowed jpg, png and gif.

#### icon

Icon on toolbar, default value is 'image' (same to tinymce image icon)

#### dragColor

Background color when drag img into editor, default is `#f8ffe5`.
