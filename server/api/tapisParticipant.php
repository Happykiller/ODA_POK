<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi","type","id_user");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/tapisParticipant.php?milis=123450&id_user=1&id_tournoi=13&type=recave

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_participants_tapis`
    (`id_tournoi`,`id_user`,`type`,`quant`)
    VALUES
    (:id_tournoi, :id_user, :type, NOW())
;";
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
    , "id_user" => $INTERFACE->inputs["id_user"]
    , "type" => $INTERFACE->inputs["type"]
];
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);