export default class RoutingSnapshotTreeBuilder {
    constructor(routes: any);
    routes: any;
    /**
     * Builds route snapshot from URL
     * @param url
     */
    buildRouteTree(url: any): any;
    getFragments(url: any): any;
    isRouteSuitable(route: any, urlFragments: any): boolean;
    buildRoutesTreeFromFragments(urlFragments: any, routes: any): any;
    buildParameters(routeCandidate: any, urlFragments: any): {};
    buildRouteObject(routeCandidate: any, urlFragments: any): any;
}
