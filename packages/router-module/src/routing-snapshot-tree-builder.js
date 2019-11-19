export default class RoutingSnapshotTreeBuilder {

    constructor(routes) {
        this.routes = routes;
    }

    /**
     * Builds route snapshot from URL
     * @param {string} url
     */
    buildRouteTree(url) {

        if (!url) {
            return null;
        }

        const fragments = this.getFragments(url);

        return this.buildRoutesTreeFromFragments(fragments, this.routes);

    }

    /**
     * Gets url fragments
     * @param  {string} url
     * @returns {string[]}
     */
    getFragments(url) {
        if (url.endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }
        if (url.startsWith('/')) {
            url = url.substring(1);
        }


        return url === '/' ? [''] : url.split('/');
    }

    /**
     * Determine whether a route is suitable
     * @param {import("./route").Route} route
     * @param {string[]} urlFragments
     * @returns {boolean}
     */
    isRouteSuitable(route, urlFragments) {
        const routeURLFragments = this.getFragments(route.path);
        let result = routeURLFragments.length === urlFragments.length;
        for (let index = 0; result && index < routeURLFragments.length; index++) {
            const fragment = routeURLFragments[index];
            result = fragment.toLowerCase() === urlFragments[index].toLowerCase() || fragment.startsWith(':');
        }
        return result;
    }

    /**
     *
     * @param {string[]} urlFragments
     * @param {any[]} routes
     * @returns {null}
     */
    buildRoutesTreeFromFragments(urlFragments, routes) {
        if (!Array.isArray(routes)) {
            throw new Error('Routes should be an array');
        }
        const candidates = routes.filter(route => this.isRouteSuitable(route, urlFragments));
        if (candidates.length === 0) {
            return null;
        } else if (candidates.length === 1) {
            return this.buildRouteObject(candidates[0], urlFragments);
        } else {
            throw new Error(`More than one route corresponds to ${urlFragments.join('/')}`);
        }
    }

    buildParameters(routeCandidate, urlFragments) {
        const result = {};
        const pathFragments = this.getFragments(routeCandidate.path);
        pathFragments.forEach((fragment, index) => {
            if (fragment.startsWith(':')) {
                const fragmentName = fragment.substring(1);
                result[fragmentName] = urlFragments[index];
            }
        })
        return result;
    }
    buildRouteObject(routeCandidate, urlFragments) {
        const result = {...routeCandidate};
        result.params = this.buildParameters(routeCandidate, urlFragments);
        // if (routeCandidate.path.startsWith(':')) {
        //     const paramName = routeCandidate.path.substring(1);
        //     result.params = {};
        //     result.params[paramName] = urlFragments[0];
        // }
        const lastIndex = urlFragments.length - 1;
        if (urlFragments[lastIndex] === '') {
            urlFragments.splice(0, lastIndex);
        }

        if (urlFragments.length > 1) {
            if (urlFragments[urlFragments.length - 1] !== '') {
                result.child = this.buildRoutesTreeFromFragments(urlFragments.slice(1), routeCandidate.children || []);
            }

        }
        return result;
    }


}
