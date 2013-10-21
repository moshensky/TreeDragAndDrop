<?php
require 'ExtDirect.php';

session_start();

class Record 
{   
    private static $recordIdGenerator = 0;
    public $id;
    public $name;
    public $prop;
    public $leaf;
    public $children;

    function __construct($name, $prop, $leaf, $children = array()) {
        $this->id = self::$recordIdGenerator++;
        $this->name = $name;
        $this->prop = $prop;
        $this->leaf = $leaf;
        if ($leaf) {
            $this->children = null;
        } else {
            $this->children = $children;
        }
    }

    public static function findById($records, $id) {
        foreach ($records as $record) {
            if ($record->id == $id) {
                return $record;
            }

            if (is_array($record->children)) {
                $foundRecord = Record::findById($record->children, $id);
                if ($foundRecord != null) {
                    return $foundRecord;
                }
            }
        }

        return null;
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
        $data = array(
            'children' => array(
                new Record('Russia', 'someprop', true),
                new Record('Britain', 'someprop', true),
                new Record('Bulgaria', 'someprop', false, array(
                    new Record('Sofia', 'someprop', true),
                    new Record('Varna', 'someprop', true),
                    new Record('Plovdiv', 'someprop', true)
                )),
                new Record('Spain', 'someprop', true),
                new Record('Brazil', 'someprop', true),
                new Record('USA', 'someprop', true)
            )
        );
        $_SESSION['data'] = $data;
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
        $root = Record::findById($_SESSION['data']["children"], $data->parentId);
        $leaf = new Record($data->name, $data->prop, $data->leaf);
        $root->addLeaf($leaf);

    }

    public function update($data) {
        $record = Record::findById($_SESSION['data']["children"], $data->id);
        if ($record == null) {
            return "Can't find record with id: " + $data->id;
        }

        //$record->id = $id;
        $record->name = $data->name;
        $record->prop = $data->prop;
        $record->leaf = $data->leaf;
        
        return $record;
    }

    public function destroy() {
    }
}

ExtDirect::provide( 'Server' );

?>
