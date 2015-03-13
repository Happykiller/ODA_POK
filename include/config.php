<?php
require_once(__DIR__."/../API/php/class/SimpleObject/OdaConfig.php");
$config = \Oda\OdaConfig::getInstance();
$config->domaine = "http://localhost/ODA-POK/";

//for bd engine
$config->BD_ENGINE->base = 'pok';
$config->BD_ENGINE->mdp = 'pass';
$config->BD_ENGINE->prefixTable = 'pok_';