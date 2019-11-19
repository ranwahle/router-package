const imageClick = new CustomEvent('image-click')

export default class SmallImage extends HTMLDivElement {


    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['image-title', 'image-content', 'file-name']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'image-content') {
            if (this.imageElement) {
                this.imageElement.setAttribute('src', newValue || '');
            }
        }

        if (name === 'image-title') {
            if (this.titleElement) {
                this.titleElement.textContent = newValue;
            }
        }
    }

    get imageContent() {
        return this.getAttribute('image-content')
    }

    get imageTitle() {
        return this.getAttribute('image-title');
    }


    get titleElement() {
        return this.querySelector('div.image-title');
    }


    get imageElement() {
        return this.querySelector('img');
    }


    render() {
        this.innerHTML = `<div  class="small-image-container">
        <div class="image-title"></div> 
        <img class="hidden">
   
    </div>`;

        this.imageElement.onload = () => {
            this.style.width = this.imageElement.width;
            this.style.height = this.imageElement.height;
        }
        this.imageElement.src = this.imageContent;
        this.style['background-image'] = `url(${this.imageContent})`;
        this.style['background-size'] = '100%';
        this.titleElement.innerText = this.imageTitle;


        this.onclick = () => this.dispatchEvent(imageClick)
    }

}

