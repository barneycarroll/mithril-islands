var island = new function(){
  if( require )
    var m = require( 'mithril' )

  var roots = []
  var views = []

  this.mount = function( root, component ){
    function view(){
      return component && [ m( component ) ]
    }

    var index = roots.indexOf( root )

    if( index >= 0 )
      views[ index ] = view

    else {
      roots.push( root )
      views.push( view )
    }

    m.render( root, view() )
  }

  this.redraw = function( vnode ){
    if( !vnode.dom )
      throw new Error( "`island.redraw` requires a `vnode` with a populated `dom` to be supplied to it in order to determine which island to redraw. https://github.com/barneycarroll/mithril-islands/README.md#island-redraw" )

    for( var index = 0; index < roots.length; index++ )
      if( roots[ index ].contains( vnode.dom ) )
        return m.render( roots[ index ], views[ index ]() )

    throw new Error( "The `vnode` supplied to `island.redraw` is not part of any active virtual DOM structure mounted via `island.mount`. https://github.com/barneycarroll/mithril-islands/README.md#island-redraw" )
  }

  if( typeof module !== 'undefined' )
    module[ 'exports' ] = API

  else
    window.island = API
}()
