const readSaveFile = (ts, saveFile) => {
    console.log(ts, saveFile);
};

const handleImage = (ts, image) => {
    [...document.querySelectorAll('.screenshot > *')].forEach(e=>e.remove());
    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = image.width;
    tmpCanvas.height = image.height;
    let ctx = tmpCanvas.getContext('2d');
    let data = ctx.getImageData(0,0,tmpCanvas.width,tmpCanvas.height);
    for (let offset = 0; offset < image.pixels.length; ++offset) {
        const pixel = image.pixels[offset];
        data.data[(offset*4)] = pixel.r;
        data.data[(offset*4)+1] = pixel.g;
        data.data[(offset*4)+2] = pixel.b;
        data.data[(offset*4)+3] = 255;
    }
    ctx.putImageData(data, 0, 0);
    document.querySelector('.screenshot').append(tmpCanvas);
    console.log(image);
};

document.addEventListener('DOMContentLoaded', () => {
    const ignoreEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Handle drag+drop of files. Have to ignore dragenter/dragover for compatibility reasons.
    document.body.addEventListener('dragenter', ignoreEvent);
    document.body.addEventListener('dragover', ignoreEvent);

    /**
     * @param {DragEvent} e 
     */
    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt) {
            const files = dt.files;
            for (const file of files) {
                const ucFilename = file.name.split('/').pop().toUpperCase();
                if (ucFilename === 'SAVETREE.DAT') {
                    void file.arrayBuffer().then((b) => {
                        let ts = Date.now();
                        console.log(`Starting SAVETREE.DAT parse at ${ts}`);
                        const saveFile = new window.reader.SaveTree.SaveTree.default();
                        saveFile.deserializeFrom(Buffer.Buffer.from(b));
                        let ts2 = Date.now();
                        console.log(`SAVETREE.DAT parse done, elapsed ${ts2 - ts}`);
                        ts = ts2;
                        readSaveFile(ts, saveFile);
                    });
                } else if (ucFilename === 'IMAGE.RAW') {
                    void file.arrayBuffer().then((b) => {
                        let ts = Date.now();
                        console.log(`Starting IMAGE.RAW parse at ${ts}`);
                        const image = window.reader.Image.Image.RawImageToImage(Buffer.Buffer.from(b));
                        let ts2 = Date.now();
                        console.log(`IMAGE.RAW parse done, elapsed ${ts2 - ts}`);
                        ts = ts2;
                        handleImage(ts, image);
                    });
                }
            }
        }
    };

    document.body.addEventListener('drop', dropHandler);
});
