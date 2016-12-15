# Mithril Islands

Mount [Mithril](https://github.com/lhorie/mithril.js) components whose redraw is controlled *individually* & *explicitly*.

[In brief](#in-brief) | [Usage](#usage) | [API](#api) | [Why](#why) | [Why not](#why-not) | [Gotchas](#gotchas) | [Credits](#credits)

## In brief

Mithril Islands provides an interface that allows you to opt out of automatic, global redraws. Instead, components mounted with `island.mount` will only be redrawn when triggered by an explicit call to `island.redraw` with a reference to a `vnode` from within their tree:

```javascript
var m      = require( 'mithril' )
var island = require( 'mithril-islands' )

island.mount( document.body, {
  name : '',
  view : function( vnode ){
    return [
      m( 'h1', 'Hello ', vnode.state.name ),

      m( 'input', {
        placeholder : 'Enter your name',
        oninput     : function( e ){
          vnode.state.name = e.target.value

          island.redraw( vnode )
        }
      } )
    ]
  }
} )
```

## Usage

This package is API compatible with Mithril 0.2.2 onwards and Mithril 1.0.x.

[`index.js`](https://github.com/barneycarroll/mithril-islands/issues/index.js) is the main file. It's written in ECMAScript3-compliant Javascript and works as a CommonJS module or by direct consumption (in which case it is assigned to the `island` reference on the `window`).

```javascript
var island = require( 'mithril-islands' )
```

```html
<script src="https://cdn.rawgit.com/barneycarroll/mithril-islands/issues/index.js"></script>
```

[`index.mjs`](https://github.com/barneycarroll/mithril-islands/index.js) is written in ECMAScript6-compliant Javascript and works as a module following that specification.

```javascript
import island from 'mithril-islands'
```

### API

The API consists of two functions, `island.mount` & `island.redraw`.

<a name="island-mount"></a>
`island.mount` follows the same syntax as [`m.mount`](https://github.com/lhorie/mithril.js/blob/rewrite/docs/mount.md). Components mounted this way will only redraw when specifically instructed via `island.redraw` - a component thus mounted is considered an 'island' because it is independent .

<a name="island-redraw"></a>
`island.redraw` accepts a [`vnode`](https://github.com/lhorie/mithril.js/blob/rewrite/docs/vnodes.md#basics) - the first argument supplied to all component methods. The 'island' the supplied `vnode` belongs to will be redrawn.

## Why

There are 2 use cases for Mithril Islands:

1. If you have multiple Mithril applications on one page and want to keep their lifecycles separate
2. If you want to opt out of automatic redraws triggered by `m.request` & DOM event handler resolution

## Why not

Mithril Islands does not provide Mithril with extra features, and neither should it be considered a generic improvement upon the Mithril APIs it wraps. Mithril Islands was written as a proof of concept, not as a utility.

Components intended for drop-in use with idiomatic Mithril may not work in a Mithril Islands codebase because of implicit reliance on the autoredraw mechanism.

## Gotchas

* A call to `island.redraw` won't work if the `vnode` supplied has not yet rendered its DOM. This is in any case impossible in idiomatic Mithril.
* On the other hand, calls to `island.redraw` *will* run their course if `vnode.dom` is available, which opens the door to anti-patterns which are impossible in idiomatic Mithril, such as infinite loops - for example a component which unconditionally calls `island.redraw` in `onbeforeupdate` or `onupdate` will be redrawn and immediately call a redraw again, locking the process.

## Credits

Thanks to [@schtauffen](https://github.com/schtauffen) & [@iamjohnlong](https://github.com/iamjohnlong) who helped debug the code.
