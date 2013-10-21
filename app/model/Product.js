Ext.define('TreeDragAndDrop.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name', type: 'string' },
       { name: 'prop', type: 'string' },
       { name: 'id', type: 'string' },

       //{ name: 'expanded', type: 'boolean', defaultValue: true, persist: false },
       { name: 'index', type: 'int' }
    ]
});