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
// phpsql/inParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "UPDATE `tab_participants`
     SET `fin` = '0000-00-00 00:00:00',
     `roundFin` = '0'
     WHERE 1=1
     AND `id_tournoi` = :id_tournoi
     AND `id_user` = :id_user
;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$INTERFACE->addDataStr($params);