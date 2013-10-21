Ext.define('TreeDragAndDrop.Application', {
    name: 'TreeDragAndDrop',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        'Base',
        'TreesControler'
    ],

    stores: [
        'FirstStore',
        'SecondStore'
    ]
});
