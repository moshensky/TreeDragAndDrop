/// <reference path="../../ext/ext-all-dev.js" />
Ext.define('TreeDragAndDrop.controller.TreesControler', {
    extend: 'TreeDragAndDrop.controller.Base',
    init: function () {
        this.listen({
            controller: {
            },
            component: {
                'tree button[action=addnode]': {
                    click: this.addNode
                },
                'tree button[action=addsubnode]': {
                    click: this.addSubNode
                },
                'tree button[action=removenode]': {
                    click: function (button) {
                        var args = arguments;
                        var title = 'Please Confirm';
                        var msg = 'Are you sure you want to delete this node?';
                        Ext.MessageBox.confirm(title, msg, function (btn) {
                            if (btn === 'yes') {
                                this.removeNode(button);
                            }
                        }, this); 
                    }  
                },
                'tree button[action=moveupnode]': {
                    click: this.moveUpNode
                },
                'tree button[action=movedownnode]': {
                    click: this.moveDownNode
                },
                'tree form': {
                    formfieldblur: this.editRecord
                }
            },
            global: {},
            store: {}
        });

    },
    isAddBtnPressed: false,
    editRecord: function (form, record) {
        this.getSelectedRecord({
            treeChildComponent: form,
            success: function (record) {
                form.updateRecord();
            },
            failure: function () {
                // do nothing becaouse there is no selected record
            }
        });
    },
    addNode: function (button, event, eOpts) {
        var treePanel = button.up('treepanel');
        var form = treePanel.down('form');
        if (form.isValid()) {
            var record = Ext.create('TreeDragAndDrop.model.Product');
            form.updateRecord(record);
            record.data.leaf = true;

            this.getSelectedRecord({
                treeChildComponent: button,
                success: function (selectedRecord) {
                    // add right after selected node as leaf
                    var id = selectedRecord.parentNode.indexOf(selectedRecord);
                    selectedRecord.parentNode.insertChild(id + 1, record);
                },
                failure: function () {
                    // add as last root leaf
                    treePanel.getRootNode().appendChild(record);
                }
            });
        }
    },
    addSubNode: function (button, event, eOpts) {
        var treePanel = button.up('treepanel');
        var form = treePanel.down('form');
        if (form.isValid()) {
            this.getSelectedRecord({
                treeChildComponent: button,
                success: function (selectedRecord) {
                    var record = Ext.create('TreeDragAndDrop.model.Product');
                    form.updateRecord(record);
                    record.data.leaf = true;
                    if (selectedRecord.isLeaf()) {
                        selectedRecord.data.leaf = false;
                        selectedRecord.data.children = [];
                        selectedRecord.data.expanded = true;
                    }

                    selectedRecord.appendChild(record);
                },
                failure: function () {
                    Ext.Msg.alert('Click', 'Please select root node first!');
                }
            });
        }
    },
    removeNode: function (button, event, eOpts) {
        this.getSelectedRecord({
            treeChildComponent: button,
            success: function (selectedRecord) {
                selectedRecord.remove(true);
            }, 
            failure: function () {
                Ext.Msg.alert('Click', 'Please select a node first!');
            }
        });
    },
    moveUpNode: function (button, event, eOpts) {
        this.getSelectedRecord({
            treeChildComponent: button,
            success: function (selectedRecord) {
                var rootNode = selectedRecord.parentNode;
                var id = rootNode.indexOf(selectedRecord);
                if (id !== 0) {
                    rootNode.insertChild(id - 1, selectedRecord);
                }
            },
            failure: function () {
                // do nothing becaouse there is no selected record
            }
        });
    },
    moveDownNode: function (button, event, eOpts) {
        Ext.onReady(function () { Ext.php.Server.date('Y-m-d', function (result) { alert('Server date is ' + result); }); });
        this.getSelectedRecord({
            treeChildComponent: button,
            success: function (selectedRecord) {
                var rootNode = selectedRecord.parentNode;
                var id = rootNode.indexOf(selectedRecord);
                var childNodesCount = rootNode.childNodes.length - 1;
                if (id < childNodesCount) {
                    rootNode.insertChild(id + 2, selectedRecord);
                    console.log('here i am');
                    console.log(rootNode.indexOf(selectedRecord));
                }
            },
            failure: function () {
                // do nothing becaouse there is no selected record
            }
        });
    },
    /*
     *
     */
    getSelectedRecord: function (args) {
        var treePanel = args.treeChildComponent.up('treepanel');
        var selection = treePanel.getSelectionModel().getSelection();
        if (selection.length > 0) {
            args.success(selection[0]);
        } else {
            args.failure();
        }
    }
});
