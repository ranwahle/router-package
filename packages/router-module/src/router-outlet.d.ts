/**
 * Router-outlet component, this is the compoennt where screens are rendeed into
 * according to their routes
 */
export default class RouterOutlet extends HTMLElement {
    static get observedAttributes(): string[];
    animationDuration: number;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    /**
     * Clears router-outlet children
     */
    clearChildren(): void;
    /**
     * Changes to the new route
     * @param newRoute
     * @returns {Promise<void>}
     */
    changeRoute(newRoute: any): Promise<void>;
    connectedCallback(): void;
}
