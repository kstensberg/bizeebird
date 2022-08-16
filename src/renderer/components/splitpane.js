var SplitPane = {
    oninit: function(vnode) {
        console.log("initialized")
    },
    oncreate: function(vnode) {
        console.log("DOM created")
        Split({
            onDragEnd: function() {
                const currentSize = document.querySelector('.grid').style['grid-template-columns']
            },
            columnGutters: [{
            track: 1,
            element: document.querySelector('.vertical-gutter'),
          }]
        })

    },
    onbeforeupdate: function(newVnode, oldVnode) {
        return true
    },
    onupdate: function(vnode) {
        console.log("DOM updated")
    },
    onremove: function(vnode) {
        console.log("removing DOM element")
    },
    view: function(vnode) {
        return m("div",  {class: "grid"}, [
            m("div", "LEFT"),
            m("div", "RIGHT"),
            m("div", {class: "vertical-gutter"}),
        ])
    }
}