# Vanilla JS Routing package

This package is an angular-like routing package, only instead of Angular components, 
it renders a vanilla JS custom elements.

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
### Router outlet
This is where the element are rendered according to the route
You may use routes-animation-duration to animate route transitions
It accepts number for duration in milliseconds.

```html
<router-outlet routes-animation-duration="500"></router-outlet>
```
### Progmatically navigate

```javascript
Router.router.navigate('url')
```
### Use route url-parameters
```javascript
///  path: 'image/:index'
 const {currentSnapshot} = Router.router;
 const {index} = currentSnapshot.params;
```
