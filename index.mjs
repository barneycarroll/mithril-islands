import m from 'mithril'

const mounts = new Map()

export default {
  mount( root, component ){
    const view = () =>
      component && [ m( component ) ]

    mounts.set( root, view )

    m.render( root, view() )
  },

  redraw( vnode ){
    if( !vnode.dom )
      throw new Error( "`island.redraw` requires a `vnode` with a populated `dom` to be supplied to it in order to determine which island to redraw. https://github.com/barneycarroll/mithril-islands/README.md#island-redraw" )

    const [ root, view ] = [ ...mounts ].find( ( [ root ] ) => root.contains( vnode.dom ) )

    if( root )
      m.render( root, view() )

    else
      throw new Error( "The `vnode` supplied to `island.redraw` is not part of any active virtual DOM structure mounted via `island.mount`. https://github.com/barneycarroll/mithril-islands/README.md#island-redraw" )
  }
}
