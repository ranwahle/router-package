const addImageClick = new CustomEvent('add-image-click');

export default class GalleryToolbar extends HTMLDivElement {

    connectedCallback() {
        this.render();

    }



    get addImageButton() {
        return this.querySelector('a[functional-id="add-image"]');
    }

    static get observedAttributes() {
        return ['add-image-disable'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'add-image-disable') {
            if (newValue === 'disable') {
                this.addImageButton.classList.add('disabled')
            } else {

                this.addImageButton.classList.remove('disabled')
            }
        }
    }

    render() {
        this.innerHTML = `<div class="toolbar">
          <a title="Add image" functional-id="add-image" is="self-routing-anchor" href="/addImage"> <i class="fas fa-plus"></i> </a>
          
    </div>`

    }
}
