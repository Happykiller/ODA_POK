<?php
$config = \Oda\SimpleObject\OdaConfig::getInstance();
$config->urlServer = "http://localhost/ODA-POK/server/";
$config->resourcesPath = "resources/";

//for bd engine
$config->BD_ENGINE->base = 'pok';
$config->BD_ENGINE->user = 'pok';
$config->BD_ENGINE->mdp = 'pass';
$config->BD_ENGINE->prefixTable = 'pok_';