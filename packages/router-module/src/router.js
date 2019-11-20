import RoutingSnapshotTreeBuilder from './routing-snapshot-tree-builder.js';


const routerCreatedCallback = [];

export class Router {

    static _router;

    static get router() {
        return Router._router;
    }

    /**
     * Gets the router instance
     * @returns {Promise<Router> | Router }
     */
    static getRouter() {
        if (Router.router) {
            return Router.router;
        }
        return new Promise(resolve => {
            routerCreatedCallback.push(() => {
                resolve(Router.router);
            } )
        })
    }



    static appRouter(routes) {
        Router._router = new Router(routes);
        routerCreatedCallback.forEach(cb => cb());
        return Router.router;
    }

    constructor(routes) {
        this.routingSnapshotTreeBuilder = new RoutingSnapshotTreeBuilder(routes);
    }

    /**
     * Gets the router outlet element
     * @returns {Element}
     */
    get routerOutlet() {
        return document.querySelector('router-outlet');
    }

    /**
     * This function detemrmine whether the user can go on to the route, according to the guard finction
     * @param routeData
     * @param {(any) => Promise<boolean> | boolean} guard
     * @param {(any) => Promise<boolean> | boolean = }oldGuard
     * @returns {Promise<boolean>}
     */
    async canGoOn(routeData, guard, oldGuard) {

        let result = true;
        if (oldGuard) {
            result = await oldGuard(routeData);
        }
        if (guard && result) {
            result = await guard(routeData)
        }

        return result;
    }

    /**
     * Navigates to the new URL
     * @param url
     * @returns {Promise<void>}
     */
    async navigate(url) {
        // Check if you may exit the current URL

        const oldRouteData =  this.routingSnapshotTreeBuilder.buildRouteTree(window.location.pathname);


        try {
            url = url === '/' ? url :  new URL(url).pathname;
        } catch (err) {
            throw Error(`Cannot construct url from ${url}`)
        }



        this.currentSnapshot = this.routingSnapshotTreeBuilder.buildRouteTree(url);

        const canGoOn = await this.canGoOn(url, this.currentSnapshot.guard, oldRouteData && oldRouteData.deactivateGuard);

        if (!canGoOn) {
            return;
        }

        history.pushState({current: url, prev: window.location.pathname}, null, url);

        this.routerOutlet.setAttribute('current-url', url);
    }
}
