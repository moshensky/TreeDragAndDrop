<?php
require 'ExtDirect.php';

session_start();

class Record 
{   
    // node unique identifier
    public $id;
    // position in the root
    public $index;
    // is a must
    public $leaf;
    // is a must
    public $children;

    // whatever you like properties
    public $name;
    public $prop;

    function __construct($id, $index, $name, $prop, $leaf, $children = array()) {
        $this->id = $id;
        $this->name = $name;
        $this->prop = $prop;
        $this->leaf = $leaf;
        if ($leaf) {
            $this->children = null;
        } else {
            $this->children = $children;
        }
    }

    public static function getById($records, $id) {
        foreach ($records as $record) {
            if ($record->id == $id) {
                return $record;
            }

            if (is_array($record->children)) {
                $foundRecord = Record::getById($record->children, $id);
                if ($foundRecord != null) {
                    return $foundRecord;
                }
            }
        }

        return null;
    }

     public static function delete(&$records, $record) {
        foreach ($records as $key => $value) {
            if ($records[$key] == $record) {
                unset($records[$key]);
                $records = array_values($records);
                return true;
            }

            if (is_array($records[$key]->children)) {
                $isRecordDeleted = Record::delete($records[$key]->children, $record);
                if ($isRecordDeleted) {
                    return true;
                }
            }
        }

        return false;
    }

    public function addLeaf($leaf) {
        if ($this->children == null) {
            $this->children = array($leaf);
            $this->leaf = false;
        } else {
            array_push($this->children, $leaf);
        }
    }
}

function init() {
    if (!isset($_SESSION['data'])) {
        $_SESSION['idGenerator'] = 0;
        $data = array(
            'children' => array(
                new Record($_SESSION['idGenerator']++, 1,'Russia', 'someprop', true),
                new Record($_SESSION['idGenerator']++, 2, 'Britain', 'someprop', true),
                new Record($_SESSION['idGenerator']++, 3, 'Bulgaria', 'someprop', false, array(
                    new Record($_SESSION['idGenerator']++, 0, 'Sofia', 'someprop', true),
                    new Record($_SESSION['idGenerator']++, 1, 'Varna', 'someprop', true),
                    new Record($_SESSION['idGenerator']++, 2, 'Plovdiv', 'someprop', true)
                )),
                new Record($_SESSION['idGenerator']++, 4, 'Spain', 'someprop', true),
                new Record($_SESSION['idGenerator']++, 5, 'Brazil', 'someprop', true),
                new Record($_SESSION['idGenerator']++, 6, 'USA', 'someprop', true)
            )
        );
        $_SESSION['data'] = $data;

        $data1 = array(
            'children' => array(
                new Record($_SESSION['idGenerator']++, 1, 'Greece', 'someprop', true),
                new Record($_SESSION['idGenerator']++, 2, 'Turkey', 'someprop', true)
            )
        );
        $_SESSION['data1'] = $data1;
    }
}

init();

class Server
{
    public function date($format) 
    {
        return date($format);
    }

    public function readData() {
        return $_SESSION['data'];
    }

    public function create($data) {
        if ($data->id == '') { 
            $leaf = new Record($_SESSION['idGenerator']++, $data->index, $data->name, $data->prop, $data->leaf);
        } else {
            $leaf = new Record($data->id, $data->index, $data->name, $data->prop, $data->leaf);
        }

        if ($data->parentId == 'root') {
            array_push($_SESSION['data']['children'], $leaf);
        } else {
            $root = Record::getById($_SESSION['data']['children'], $data->parentId);
            $root->addLeaf($leaf);
        }

        return array('success' => true, 'children' => array($leaf));
    }

    public function update($data) {
        $record = Record::getById($_SESSION['data']["children"], $data->id);
        if ($record == null) {
            return array('success' => true, 'msg' => "Can't find record with id: " + $data->id);
        }

        $record->index = $data->index;
        $record->name = $data->name;
        $record->prop = $data->prop;
        $record->leaf = $data->leaf;
        
        //return $record;
        return array('success' => true, 'children' => array($record));
    }

    public function destroy($data) {
        $record = Record::getById($_SESSION['data']["children"], $data->id);
        $isDeleted = Record::delete($_SESSION['data']["children"], $record);
        if (!$isDeleted) {
            return "Can't find record with id: " + $data->id;
        }

        return true;
    }

      public function readData1() {
        return $_SESSION['data1'];
    }

    public function create1($data) {
        if ($data->id == '') { 
            $leaf = new Record($_SESSION['idGenerator']++, $data->index, $data->name, $data->prop, $data->leaf);
        } else {
            $leaf = new Record($data->id, $data->index, $data->name, $data->prop, $data->leaf);
        }

        if ($data->parentId == 'root') {
            array_push($_SESSION['data1']['children'], $leaf);
        } else {
            $root = Record::getById($_SESSION['data1']['children'], $data->parentId);
            $root->addLeaf($leaf);
        }

        return array('success' => true, 'children' => array($leaf));
    }

    public function update1($data) {
        $record = Record::getById($_SESSION['data1']["children"], $data->id);
        if ($record == null) {
            return array('success' => true, 'msg' => "Can't find record with id: " + $data->id);
        }

        $record->index = $data->index;
        $record->name = $data->name;
        $record->prop = $data->prop;
        $record->leaf = $data->leaf;
        
        //return $record;
        return array('success' => true, 'children' => array($record));
    }

    public function destroy1($data) {
        $record = Record::getById($_SESSION['data1']["children"], $data->id);
        $isDeleted = Record::delete($_SESSION['data1']["children"], $record);
        if (!$isDeleted) {
            return "Can't find record with id: " + $data->id;
        }

        return true;
    }
}

ExtDirect::provide( 'Server' );

?>
