export class Router {
    static router: any;
    static appRouter(routes: any): any;
    constructor(routes: any);
    routingSnapshotTreeBuilder: RoutingSnapshotTreeBuilder;
    /**
     * Gets the router outlet element
     * @returns {Element}
     */
    get routerOutlet(): Element;
    /**
     * This function detemrmine whether the user can go on to the route, according to the guard finction
     * @param routeData
     * @param guard
     * @param oldGuard
     * @returns {Promise<boolean>}
     */
    canGoOn(routeData: any, guard: any, oldGuard: any): Promise<boolean>;
    /**
     * Navigates to the new URL
     * @param url
     * @returns {Promise<void>}
     */
    navigate(url: any): Promise<void>;
    currentSnapshot: any;
}
import RoutingSnapshotTreeBuilder from "./routing-snapshot-tree-builder.js";
