
const images = [];

module.exports = {
    readImageDirectory : function() {
      return new Promise((resolve) => {

         resolve(images);
        })
    },

    sendImage: function(imageFileName, res) {
        res.sendFile(`${__dirname}/assets/${imageFileName}`);
    },

    addimage: function(image) {
        return new Promise(resolve => {
            images.push(image);
            resolve(images);
        })
    },
    updateImageTitle: function(title, index) {
        return new Promise(resolve =>  {
            images[index].title = title;
            resolve();
        });
    },
    deleteImage: function(index) {
        return new Promise((resolve, reject) =>{
            if (isNaN(index) || index < 0 || index > images.length) {
                reject(index);
            } else {
                images.splice(index, 1);
                resolve();
            }
        });
    }
}

