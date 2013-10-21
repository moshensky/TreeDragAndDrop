Ext.define('TreeDragAndDrop.view.tree.TreesContainer', {
    extend: 'Ext.container.Container', 
    requires: [
       'TreeDragAndDrop.view.tree.Tree'
    ],
    xtype: 'treescontainer',
    layout: {
        type: 'hbox'
    },
    style: 'margin: 50px',
    items: [{
        xtype: 'tree',
        store: 'FirstStore',
        title: 'First Tree'
    }, {
        xtype: 'tree',
        store: 'SecondStore',
        title: 'Second Tree'
    }]
});