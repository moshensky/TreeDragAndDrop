Ext.define('TreeDragAndDrop.view.tree.ProductEditForm', {
    extend: 'Ext.form.Panel',
    requires: [
       'Ext.form.Panel'
    ],
    xtype: 'producteditform',
    layout: 'vbox',
    bodyPadding: 10,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        name: 'name'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Property',
        name: 'prop'
    }, {
        xtype: 'textfield',
        fieldLabel: 'debug::Index',
        readOnly: true,
        name: 'index'
    }, {
        xtype: 'textfield',
        fieldLabel: 'debug::id',
        readOnly: true,
        name: 'id'
    }],
    initComponent: function () {
        this.listeners = {
            render: function (formCmp, eOpts) {
                formCmp.getForm().getFields().each(function (aField) {
                    aField.on('blur', this.onFieldBlur, this);
                }, this);
            }
        };

        this.callParent();
    },
    onFieldBlur: function (field, eOpts) {
        var record = this.getRecord();
        if (record !== undefined) {
            this.fireEvent('formfieldblur', this, record);
        }
    }
});