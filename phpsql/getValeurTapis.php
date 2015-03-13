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
// phpsql/getValeurTapis.php?milis=123450&ctrl=ok&id_tournois=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT SUM(valeur_jeton*nb_jeton) as 'valeurTapis' 
    FROM `tab_tapis` a
    WHERE 1=1
    AND a.`id_tournois` = '".$INTERFACE->inputs["id_tournois"]."'
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);