export default class SelfRoutingAnchor extends HTMLAnchorElement {
    static get observedAttributes(): string[];
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    newLocation: any;
    connectedCallback(): void;
}
