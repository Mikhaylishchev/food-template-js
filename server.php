<?php
$_POST = json_decode(file_get_contents("php://input"), true);        //      string for working with JSON
echo var_dump($_POST);