import {Router} from '../routingModule/'

    export default class ImageGallery extends HTMLDivElement {

    get displayedImage() {
        return this._displayedimage;
    }

    set displayedImage(image) {
        this._displayedimage = image;
        this.renderDetailedImage();
    }

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
        this.render();
    }

    connectedCallback() {
        this.images = [];
        this.render();
    }

    renderDetailedImage() {
        if (this.displayedImage) {
            // this.imagesContainer.classList.add('side-show')
            this.detailedImage.classList.remove('hidden');
            this.detailedImage.setAttribute('image-content', this.displayedImage.content);
            this.detailedImage.setAttribute('image-title', this.displayedImage.title);
            this.detailedImage.setAttribute('image-date', this.displayedImage.lastModified);
            this.detailedImage.setAttribute('image-description', this.displayedImage.description);
            const currentIndex = this.images.indexOf(this.displayedImage);
            this.detailedImage.setAttribute('prev-disabled', currentIndex === 0);
            this.detailedImage.setAttribute('next-disabled', currentIndex === this.images.length - 1);


        } else {
            // this.imagesContainer.classList.remove('side-show');
            this.detailedImage.classList.add('hidden');
        }
    }








    displayDetailedImage(image) {
        this.displayedImage = image;
    }

    addImageClick() {
        this.toolbarComponent.setAttribute('add-image-disable', 'disable')
        this.galleryContainer.classList.add('hidden')
        this.addImageComponent.classList.remove('hidden');
    }

    get addImageComponent() {
        return this.querySelector('div[is="add-image"]');
    }

    get detailedImage() {
        return this.querySelector('div[is="detailed-image"]');
    }

    get imagesContainer() {
        return this.querySelector('div[is="images-container"]');
    }

    get galleryContainer() {
        return this.querySelector('div.gallery-container');
    }

    get toolbarComponent() {
        return this.querySelector('div[is="gallery-toolbar"]');
    }

    reset() {
       Router.router.navigate('/')
    }

    get addNewImageElement() {
        return this.querySelector('div[is="add-image"]');
    }

    moveImage(forward) {
        const currentIndex = this.images.indexOf(this.displayedImage);
        const nextIndex = forward ? currentIndex + 1 : currentIndex - 1;
        if (isNaN(currentIndex) || nextIndex < 0 || nextIndex >= this.images.length) {
            return
        }
        this.displayDetailedImage(this.images[nextIndex]);
    }


    setEvents() {

        document.addEventListener('keydown', keyEvent => {
            const keyName = keyEvent.key;
            if (keyName === 'Escape') {
                this.reset();
            }
        })
        this.addNewImageElement.addEventListener('image-added', () => {
            this.getImages();
            this.reset();
        })

        this.addNewImageElement.addEventListener('add-image-cancel', () => {
            this.reset();
        })

        this.toolbarComponent.addEventListener('add-image-click', () => {
            this.addImageClick();
        })

    }





    render() {
        this.innerHTML = `<div style="display: flex; align-items: center;"><div><h1>Image Gallery
           </h1></div>
            <div is="gallery-toolbar"></div>
            </div>
            <router-outlet></router-outlet>
            <div class="gallery-container">
            
            <!--<div is="detailed-image" class="hidden"></div>-->
            
            </div>
            <div class="hidden" is="add-image"></div>
            `;


       // this.addImageElements();

        this.setEvents();


    }
}

