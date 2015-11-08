<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("idContestCharges", "type", "cmt", "amount");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/addUserForCharges.php?idUser=1&idContest=10

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_contest_charges_details` (`idContestCharges`, `cmt`, `".$INTERFACE->inputs["type"]."`) VALUES (:idContestCharges, :cmt, :amount)
;";
$params->bindsValue = [
    "idContestCharges" => $INTERFACE->inputs["idContestCharges"],
    "cmt" => $INTERFACE->inputs["cmt"],
    "amount" => $INTERFACE->inputs["amount"]
];
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat_insert";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);