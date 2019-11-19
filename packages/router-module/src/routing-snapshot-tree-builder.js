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

    isRouteSuitable(route, urlFragments) {
        const routeURLFragments = this.getFragments(route.path);
        let result = routeURLFragments.length === urlFragments.length;
        for (let index = 0; result && index < routeURLFragments.length; index++) {
            const fragment = routeURLFragments[index];
            result = fragment.toLowerCase() === urlFragments[index].toLowerCase() || fragment.startsWith(':');
        }
        return result;
    }

    buildRoutesTreeFromFragments(urlFragments, routes) {
        if (!routes.filter) {
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
