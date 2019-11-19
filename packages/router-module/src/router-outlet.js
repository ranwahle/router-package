import { Router } from "./router.js"

/**
 * Router-outlet component, this is the compoennt where screens are rendeed into
 * according to their routes
 */
export default class RouterOutlet extends HTMLElement {

    get animationDuration() {
        const durationValue = this.getAttribute('routes-animation-duration');
        if (!durationValue || isNaN(+durationValue)) {
            return 0;
        }
        return +durationValue;
    }

    static get observedAttributes() {
        return ['current-url']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'current-url' || oldValue === newValue) {
            return
        }
        this.changeRoute(newValue)

    }

    /**
     * Clears router-outlet children
     */
    clearChildren() {

        if (!this.childNodes.length) {
            return

        }
        const child = this.firstChild;
        // @ts-ignore

        const clear = () => {
            this.removeChild(this.firstChild)
            this.clearChildren()
        }

        if (!this.animationDuration) {
            clear();
            return;
        }
        // @ts-ignore
        child.animate({opacity: [1, 0]}, {duration: this.animationDuration - 500, easing: 'ease'})
        setTimeout(clear, this.animationDuration)


    }


    /**
     * Changes to the new route
     * @param newRoute
     * @returns {Promise<void>}
     */
    async changeRoute(newRoute) {

        const treeBuilder = Router.router.routingSnapshotTreeBuilder
        const router = Router.router
        const newRouteData = treeBuilder.buildRouteTree(newRoute)

        if (!newRouteData) {
            throw Error(`Could not build tree for ${newRoute}`)
        }

        const canGoOn = await router.canGoOn(window.location.pathname, newRouteData.guard)

        if (!canGoOn) {
            history.back()
            return
        }

        router.currentSnapshot = newRouteData

        this.clearChildren()


        if (!newRouteData.attributes) {
            newRouteData.attributes = {}
        }
        const newElement = document.createElement(newRouteData.element, newRouteData.attributes)
        Object.keys(newRouteData.attributes || {}).forEach(key => {
            newElement.setAttribute(key, newRouteData.attributes[key])
        })

        if (!this.animationDuration) {
            this.appendChild(newElement);
            return;
        }

        // Else animate
        newElement.style.opacity = 0

        setTimeout(() => {

                this.appendChild(newElement)
                newElement.animate({opacity: [0, 1]}, {duration: this.animationDuration, easing: 'ease'})
                newElement.style.opacity = 1
            }
            , this.animationDuration)


    }


    connectedCallback() {
        window.onpopstate = async (e) => {
            const treeBuilder = Router.router.routingSnapshotTreeBuilder
            const prevUrl = history.state && history.state.prev;
            const currentRouteData = treeBuilder.buildRouteTree(prevUrl);
            const router = Router.router
            if (await router.canGoOn(window.location.pathname, null, currentRouteData && currentRouteData.deactivateGuard )) {
                this.changeRoute(window.location.pathname)
            } else {
                history.back();
            }
        }


        this.changeRoute(window.location.pathname)
    }
}
