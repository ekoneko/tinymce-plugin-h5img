(function () {
    'use strict';

    tinymce.PluginManager.add('html5image', function (editor) {
        var init, drag, paste, body, render;
        drag = {
            enter: function () {
                body.setAttribute('style', 'background:#f8ffe5;');
            },
            over: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            drop: function (e) {
                var file;
                e.stopPropagation();
                e.preventDefault();
                body.setAttribute('style', '');

                file = e.dataTransfer.files[0];
                if (!file.type || !/image\/((jpeg)|(png)|(gif)|(jpg))/.test(file.type)) {
                    return;
                }
                render(file);
            },
            leave: function (e) {
                if (e.x < 30 || e.x > body.clientWidth - 30 || e.y < 30 || e.y > body.clientHeight - 30) {
                    body.setAttribute('style', '');
                }
            }
        };
        paste = function (e) {
            var type, file;
            if (typeof e.clipboardData.types === 'undefined' || e.clipboardData.types.length === 0) {
                return;
            }
            type = e.clipboardData.types[0];
            if (type !== 'Files') {
                return;
            }

            file = e.clipboardData.items[0].getAsFile();
            render(file);
            
            e.stopPropagation();
            e.preventDefault();
        };

        render = function (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // typesetting or others
                editor.insertContent('<img src="' + e.target.result + '" />');
            }
            reader.readAsDataURL(file);
        };
        init = function () {
            body = editor.dom.doc.body;
            body.addEventListener('dragenter', drag.enter, false);
            body.addEventListener('dragover', drag.over, false);
            body.addEventListener('drop', drag.drop, false);
            body.addEventListener('dragleave', drag.leave, false);
            body.addEventListener('paste', paste, false);
        };

        if (typeof ImageData !== 'undefined') {
            setTimeout(init, 0);
        }
   });
}());