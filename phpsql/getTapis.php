<?php
namespace Pok;
use stdClass, \Oda\OdaPrepareInterface, \Oda\OdaPrepareReqSql, \Oda\OdaLibBd;
//--------------------------------------------------------------------------
//Header
require("../API/php/header.php");
require("../php/PokInterface.php");

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournois");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/getTapis.php?milis=123450&ctrl=ok&id_tournois=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM  `tab_tapis` a
    WHERE 1=1
    AND `id_tournois` =  0
    ORDER BY `valeur_jeton` ASC
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);