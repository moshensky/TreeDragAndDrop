Ext.define('TreeDragAndDrop.view.tree.Tree', {
    extend: 'Ext.tree.Panel',
    requires: [
       'Ext.tree.plugin.TreeViewDragDrop',
       'TreeDragAndDrop.view.tree.ProductEditForm'
    ],
    xtype: 'tree',
    width: 350,
    height: 400,
    displayField: 'name',
    //rootVisible: false,
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            enableDrop: true,
            enableDrag: true,
            allowContainerDrops: true
        }
    },

    initComponent: function () {
        this.listeners = {
            select: this.onSelect
        };
        this.tbar = this.createButtons();

        this.callParent();
    },
    bbar: [{
        xtype: 'producteditform',
        flex: 1
    }],

    /*
     * Private methods
     */
    createButtons: function () {
        var buttons = [{
            xtype: 'button',
            text: 'Add node',
            icon: 'resources/icons/add.png',
            action: 'addnode'
        }, {
            xtype: 'button',
            text: 'Add sub node',
            icon: 'resources/icons/add.png',
            action: 'addsubnode'
        }, {
            xtype: 'button',
            text: 'Remove',
            icon: 'resources/icons/delete.png',
            action: 'removenode'
        }, {
            xtype: 'button',
            text: 'Up',
            icon: 'resources/icons/up.png',
            action: 'moveupnode'
        }, {
            xtype: 'button',
            text: 'Down',
            icon: 'resources/icons/down.png',
            action: 'movedownnode'
        }];

        return buttons;
    },
  
    onSelect: function (selectionRowModel, record, index, eOpts) {
        var form = this.down('producteditform');
        form.getForm().loadRecord(record);
    }

});