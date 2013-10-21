Ext.define('TreeDragAndDrop.store.SecondStore', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Ext.data.proxy.Direct'
    ],
    model: 'TreeDragAndDrop.model.Product',
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            create: Ext.php.Server.create1,
            read: Ext.php.Server.readData1,
            update: Ext.php.Server.update1,
            destroy: Ext.php.Server.destroy1
        },
        reader: {
            type: 'json'
        }
    },
    constructor: function () {
        this.callParent(arguments);

        this.load();
    }
});