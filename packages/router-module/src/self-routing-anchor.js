import { Router } from "./router.js"


export default class SelfRoutingAnchor extends HTMLAnchorElement {


    static get observedAttributes() {
        return ['href']
    }


    attributeChangedCallback(name, oldValue, newValue) {
        this.newLocation = newValue

    }

    connectedCallback() {
        this.onclick = evt => {
            const {router} = Router;
            evt.preventDefault()
            router.navigate(this.href)
        }
    }

}
