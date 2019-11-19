#Vanilla JS Routing package

This package is an angular-like routing package, only insetead of Angular components, it renders a vanilla JS custome elements.

## Use this package

### installation
```bash
$ npm install @vanilarouter/router-module
```

### Configuring toutes
```javascript

import {Router} from '@vanillarouter/router-module';

const routes =   {path: '/', element: 'div', attributes: {is: 'images-container'}}
                   ,
                   {
                       path: '/addImage',
                       element: 'div',
                       attributes: {is: 'add-image'},
                       deactivateGuard: confirmExit
                   }, {
                       path: 'image/:index',
                       element: 'div',
                       attributes: {is: 'detailed-image'},
                       guard: imageExistGuard
                   }

Router.appRouter(routes);

// imageExistGuard and confirmExit are two custom functions you may write for handling route guards 

```
### Routing anchor tags

```html
<a title="Add image" is="self-routing-anchor" href="/addImage">Your text or content</a>
```

### Pragmatically navigate

```javascript
Router.router.navigate('url')
```

