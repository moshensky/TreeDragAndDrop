Ext.define('TreeDragAndDrop.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'TreeDragAndDrop.view.tree.TreesContainer'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    },{
        region: 'center',
        xtype: 'panel',
        title: 'Drag and drop sample',
        items: [{
            xtype: 'treescontainer'
        }]
    }]
});