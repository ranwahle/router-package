export default class ImagesContainer extends HTMLDivElement {

    get images() {
        return this._images || [];
    }

    set images(images) {
        this._images = images || [];
        this.renderImagesContainer();
    }

    getImages() {
        fetch('/images/').then(resp => resp.json()).then(images => this.images = images);
    }


    renderImagesContainer() {
        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('images-container');
        if (!this.images || this.images.left === 0) {
            imagesContainer.textContent = 'No Images';
        } else {

        }
        this.addImageElements(imagesContainer)

        this.appendChild(imagesContainer);

    }

    addImageElements(imagesContainer) {
       //  this.imagesContainer.innerHTML = '';
        this.images.forEach(
            (image, index) => {
                const anchorElement = document.createElement('a', {is: 'self-routing-anchor'});
                anchorElement.setAttribute('href',`image/${index}`);

                const imageElement = document.createElement(
                    'div', {is: 'small-image'});
                imageElement.style.margin = '2px';
                imageElement.setAttribute('image-content', image.content);
                imageElement.setAttribute('image-title', image.title);
              //  imageElement.addEventListener('image-click',
              //      () => this.displayDetailedImage(image));
                anchorElement.appendChild(imageElement);
                imagesContainer.appendChild(anchorElement);
            }
        )
    }

    connectedCallback() {
        this.getImages();
    }
}
