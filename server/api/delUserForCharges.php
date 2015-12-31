<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("idContestCharges");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/delUserForCharges.php?idUser=1&idContest=10

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql();
$params->sql = "DELETE FROM `tab_contest_charges` WHERE 1=1 AND  `id` = :idContestCharges
;";
$params->bindsValue = [
    "idContestCharges" => $INTERFACE->inputs["idContestCharges"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat_insert";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);