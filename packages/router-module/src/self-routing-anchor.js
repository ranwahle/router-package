import { Router } from "./router.js"


export default class SelfRoutingAnchor extends HTMLAnchorElement {


    static get observedAttributes() {
        return ['href']
    }


    attributeChangedCallback(name, oldValue, newValue) {
        this.newLocation = newValue

    }

    connectedCallback() {
        const router = Router.router
        this.onclick = evt => {
            evt.preventDefault()
            router.navigate(this.href)
        }
    }

}
