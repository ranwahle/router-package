import RouterOutlet from './router-outlet.js';
import SelfRoutingAnchor from './self-routing-anchor.js';

customElements.define('router-outlet', RouterOutlet);
customElements.define('self-routing-anchor', SelfRoutingAnchor, {extends: 'a'});


export * from './router.js';
export * from './router-outlet.js';
export * from './routing-snapshot-tree-builder.js';




