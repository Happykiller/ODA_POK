<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi","id_user");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/addParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_participants`
    (`id_tournoi`,`id_user`)
    VALUES
    (:id_tournoi, :id_user)
;";
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
    , "id_user" => $INTERFACE->inputs["id_user"]
];
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "result";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "REPLACE INTO `tab_contest_charges`(`idContest`, `idUser`) VALUES (:idContest, :idUser)
;";
$params->bindsValue = [
    "idContest" => $INTERFACE->inputs["id_tournoi"]
    , "idUser" => $INTERFACE->inputs["id_user"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);