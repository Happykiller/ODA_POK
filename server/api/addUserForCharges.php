<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("idUser", "idContest");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/addUserForCharges.php?idUser=1&idContest=10

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_contest_charges`(`idContest`, `idUser`) VALUES (:idContest, :idUser)
;";
$params->bindsValue = [
    "idUser" => $INTERFACE->inputs["idUser"],
    "idContest" => $INTERFACE->inputs["idContest"]
];
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat_insert";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);