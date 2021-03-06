<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi","id_user");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/outParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "UPDATE `tab_participants`
     SET `fin` = now(),
     `roundFin` = (select a.`roundEnCours` from `tab_tournois` a 
         WHERE 1=1
         AND a.`id` = :id_tournoi
     )
     WHERE 1=1
     AND `id_tournoi` = :id_tournoi
     AND `id_user` = :id_user
;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
    , "id_user" => $INTERFACE->inputs["id_user"]
];
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$INTERFACE->addDataStr($params);