export class ConfirmModal extends HTMLElement {

    static get observedAttributes() {
        return ['confirm-question']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.comfirmQuestion = newValue;
    }

    connectedCallback() {
        this.render()
    }

    createModal() {
        const modal = document.createElement('div')

        // modal.style.backgroundColor = 'ggba(255, 255, 255, 1)'
        modal.style.zIndex = 1001
        modal.style.backgroundColor = 'white';
        modal.style.borderStyle = 'solid'
        modal.style['border-width'] = '1px';
        modal.innerHTML = `<h2>${this.comfirmQuestion}</h2>`;
        return modal
    }


    render() {
        this.wrapperElement = document.createElement('div')
        this.transperantElement = document.createElement('div')
        this.setWrapperElementStyle()
        this.setTransperantElementStyle()


        this.appendChild(this.transperantElement)
        this.appendChild(this.wrapperElement)
        // setTimeout(() => document.querySelector('.modal-wrapper-element').style.minHeight = `${screen.availHeight}px`);
    }

    setAbsoluteWidthHeight(element) {
        element.style.width = '100%'
        element.style.position = 'fixed'
        element.style.top = 0
        element.style.left = 0
        element.style.minHeight = `${screen.availHeight}px`
    }

    setWrapperElementStyle() {
        this.setAbsoluteWidthHeight(this.wrapperElement)
        this.wrapperElement.style.display = 'flex'
        this.wrapperElement.style['justify-content'] = 'center'
        this.wrapperElement.style['align-items'] = 'center'
    }

    setTransperantElementStyle() {
        this.setAbsoluteWidthHeight(this.transperantElement)

        this.transperantElement.style.backgroundColor = 'gray'
        this.transperantElement.style.opacity = 0.3


    }


    async getUserResult() {


        return new Promise((resolve) => {
            const modal = this.createModal()
            this.wrapperElement.appendChild(modal)
            const modalInnerDiv = document.createElement('div')
            modal.appendChild(modalInnerDiv)

            const okButton = document.createElement('button')
            okButton.innerText = 'OK'


            const cancelButton = document.createElement('button')
            cancelButton.innerText = 'Cancel'

            modalInnerDiv.appendChild(okButton)
            modalInnerDiv.appendChild(cancelButton)

            okButton.addEventListener('click', () => {

                resolve(true)
            })
            cancelButton.addEventListener('click', () => {

                resolve(false)
            })
        })


    }
}

customElements.define('confirm-modal', ConfirmModal)
