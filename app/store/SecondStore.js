Ext.define('TreeDragAndDrop.store.SecondStore', {
    extend: 'Ext.data.TreeStore',
    model: 'TreeDragAndDrop.model.Product',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'app/data/data1.json',
        reader: {
            type: 'json'
        }
    },
    constructor: function () {
        this.callParent(arguments);

        this.load();
    }
});