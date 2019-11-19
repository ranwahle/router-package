const express = require('express');
const router = express.Router();
const imageStorage = require('../image-storage');
const multiparty = require('multiparty');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

router.get('/images', (req, res) => {
    imageStorage.readImageDirectory().then((files) => {
        res.status(200).send(files.map(image => ({...image, fileName: `image-gallery/${image.fileName}`})))
    })
});

router.get('/images/:index', (req, res) => {
    imageStorage.readImageDirectory().then((files) => {
        const image = files[+req.params.index];
        if (image) {
            // res.setHeader('content-type', image.contentType);
            //
            // const regex = /^data:.+\/(.+);base64,(.*)$/;
            //
            // const matches = image.content.match(regex);
            //
            // const data = matches[2];
            // const buffer = new Buffer(data, 'base64');
            // res.status(200).send(buffer).end();
            res.status(200).send(image).end();
        } else {
            res.status(404).end();
        }

    })
})

/**
 * This route will get the image content only
 */
router.get('/image-gallery/:fileName', (req, res) => {
    imageStorage.sendImage(req.params.fileName, res);

})

router.delete('/delete-image/:index', (req, res) => {
    const index = +req.params.index;
    if (isNaN(index)) {
        res.status(400).send('Illigle index');
    }
    imageStorage.deleteImage(index).then(() => {
        res.status(200).send('OK');
    }, () => res.status(400).send(`Of course this is the client's fault`))
})


router.post('/add-image', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        console.log(JSON.stringify(err), fields, files)
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        imageStorage.addimage({
            fileName: fields['fileName'][0],
            title: fields['image-title'][0],
            content: fields.content[0],
            contentType: fields['content-type'][0]
            ,
            lastModified: fields['last-modified'][0],
            description: fields['image-description'][0]
        })

        imageStorage.readImageDirectory().then(images => {
            res.status(200).send(images)
        })

    })


})

router.put('/update-image', (req, res) => {
    const {title, index} = req.body;
    imageStorage.updateImageTitle(title, index)
        .then(() => res.status(200).send('OK'));

})

module.exports = router;
