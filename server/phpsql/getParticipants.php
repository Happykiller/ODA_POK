<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi","recherche");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/getParticipants.php?milis=123450&ctrl=ok&recherche=&id_tournoi=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT a.`id`, a.`code_user`, a.`nom`, a.`prenom`
    FROM `api_tab_utilisateurs` a
    WHERE 1=1
    AND a.`actif` = 1
    AND (
        a.`code_user` like '%".$INTERFACE->inputs["recherche"]."%'
        OR
        a.`nom` like '%".$INTERFACE->inputs["recherche"]."%'
        OR 
        a.`prenom` like '%".$INTERFACE->inputs["recherche"]."%'
    )
    AND id not in (SELECT b.id from `tab_participants` b WHERE 1=1 AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"].")
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);