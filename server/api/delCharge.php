<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("idCharge");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/delCharge.php?idCharge=1

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql();
$params->sql = "DELETE FROM `tab_contest_charges_details` WHERE 1=1 AND  `id` = :idCharge
;";
$params->bindsValue = [
    "idCharge" => $INTERFACE->inputs["idCharge"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);