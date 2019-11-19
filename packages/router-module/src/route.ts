/**
 * Route data
 */
export interface Route {
    /**
     * Route path
     */
    path: string;
    /**
     * Element (custom or non-custom) to render
     */
    element: string;
    /**
     * Ekement attributes
     */
    attributes?: {[name: string]: string};
    /**
     * A function to determine if the route can be used
     */
    guard?: () => boolean | Promise<boolean>;
    /**
     * A function to determine whether the route can be
     */
    deactivateGuard?:  () => boolean | Promise<boolean>;
}
