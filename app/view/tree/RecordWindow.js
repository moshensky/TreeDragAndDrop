Ext.define('TreeDragAndDrop.view.tree.RecordWindow', {
    extend: 'Ext.window.Window',
    requires: [
      'TreeDragAndDrop.view.tree.ProductEditForm'
    ],
    xtype: 'recordwindow',

    plain: true,
    resizable: false,
    modal: true,
    closeAction: 'hide',
    title: 'Add new record',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'producteditform',
            listeners: undefined
        }];

        me.buttons = [{
            xtype: 'button',
            text: 'Save',
            action: me.btnAction
        }, {
            xtype: 'button',
            text: 'Cancel',
            scope: me,
            handler: me.hide
        }];

        me.callParent(arguments);
    }
});