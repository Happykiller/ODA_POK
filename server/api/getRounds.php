<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/getRounds.php?milis=123450&ctrl=ok&id_tournoi=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM  `tab_rounds` a
    WHERE 1=1
    AND `id_tournoi` =  0
    ORDER BY `small_blind` ASC
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);