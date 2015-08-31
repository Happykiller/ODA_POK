<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_user","id_tournoi");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/delParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "DELETE FROM `tab_participants`
     WHERE 1=1
     AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
     AND `id_user` = ".$INTERFACE->inputs["id_user"]."
;

DELETE FROM `tab_participants_tapis`
     WHERE 1=1
     AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
     AND `id_user` = ".$INTERFACE->inputs["id_user"]."
;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);