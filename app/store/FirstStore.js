Ext.define('TreeDragAndDrop.store.FirstStore', {
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
            create: Ext.php.Server.create,
            read: Ext.php.Server.readData,
            update: Ext.php.Server.update,
            destroy: Ext.php.Server.destroy
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