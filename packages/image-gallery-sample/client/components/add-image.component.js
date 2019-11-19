import {Router} from '../routingModule/';

export const imageAdded = new CustomEvent('image-added')

export default class AddImage extends HTMLDivElement {
    constructor() {
        super();

        this.render();
        this.setEvents();
    }

    setEvents() {
        this.querySelector('form').onsubmit = () => this.submitImage();
        this.querySelector('[name="upload-image"]').addEventListener('change', (evt) => this.readImage(evt))
        this.cancelButton.onclick = () =>  Router.router.navigate('/') // this.dispatchEvent(new CustomEvent( 'add-image-cancel'));
    }

    readFile() {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = fileRead => {
                return (fileReadEvent => {
                    resolve(fileReadEvent.target.result);
                })(fileRead);
            }
            reader.onerror = err => console.error('error reading file', err);
            reader.readAsDataURL(this.imageFile);
        })
    }

    readImage(evt) {

        this.imageFile = evt.target.files[0];

        if (!this.imageFile) {
            this.submitButton.disable();
            return;
        }

        this.submitButton.disabled = false;


        const reader = new FileReader();
        reader.onload = readFile => {
            return (fileReadEvent => {
                if (this.imageElement) {
                    this.imagePreview.removeChild(this.imageElement);
                }
                this.imageElement = document.createElement('img');
                this.imageElement.src = fileReadEvent.target.result;
                this.imagePreview.appendChild(this.imageElement);
            })(readFile)
        }
        reader.readAsDataURL(this.imageFile);
    }

    get imagePreview() {
        return this.querySelector('div.image-preview');
    }


    submitImage() {
        const formData = new FormData();
        this.statusSection.classList.add('hidden')
        formData.append('fileName', this.imageFile.name);
        formData.append('last-modified', this.imageFile.lastModified);
        formData.append('image-title', this.querySelector('[name="image-title"]').value)
        formData.append('image-description', this.querySelector('[name="image-description"]').value)
        this.readFile().then(fileContent => {
            formData.append('content', fileContent);
            formData.append('content-type', this.imageFile.type)
            fetch('/add-image', {method: 'post', body: formData}).then(
                (response) => {
                    if (response.ok) {
                        Router.router.navigate('/')
                        // this.dispatchEvent(imageAdded);
                    } else {
                       this.presentStatus(response)
                    }
                }
                )
        })
        return false;
    }

    presentStatus(response) {
        this.statusSection.classList.remove('hidden')
        response.text().then(text => this.statusSection.textContent = text);
    }

    get statusSection() {
        return this.querySelector('.status-div');
    }

    get submitButton() {
        return this.querySelector('.add-image-button')
    }

    get cancelButton() {
        return this.querySelector('button.cancel-button');
    }

    render() {
        this.innerHTML = `<form onsubmit="return false"> 
<div>
<h2>Add new Image</h2>
        
        <div>
            <button type="submit" disabled class="add-image-button"> <i class="fas fa-save"></i></button>
            <button type="button" class="cancel-button"><i class="fas fa-window-close"></i></button>
        </div>
         <div class="status-div hidden"></div> 
          <div>
        <input type="file"  name="upload-image" accept="image/*">
        </div>
        <div>
        <input type="text" name="image-title" placeholder="Image title">
        </div>
        <div>
        <textarea name="image-description" placeholder="Image description" ></textarea>
        </div>
        <div class="image-preview"></div>
    
        </form>
        `

        this.setEvents();
    }
}

