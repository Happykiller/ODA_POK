<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/getParticipantsTournoi.php?milis=123450&ctrl=ok&id_tournoi=13

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT a.*, b.`code_user`, b.`nom`, b.`prenom`, (select count(*)
        from `tab_participants_tapis` c 
        where 1=1
        AND c.id_tournoi = ".$INTERFACE->inputs["id_tournoi"]." 
        AND c.id_user = a.`id_user`
    ) as 'nb_tapis',
    (select count(*) 
        from `tab_participants_tapis` c 
        where 1=1
        AND c.id_tournoi = ".$INTERFACE->inputs["id_tournoi"]." 
        AND c.id_user = a.`id_user`
        AND c.type = 'recave'
    ) as 'nb_recave',
    (select count(*) 
        from `tab_participants_tapis` c 
        where 1=1
        AND c.id_tournoi = ".$INTERFACE->inputs["id_tournoi"]." 
        AND c.id_user = a.`id_user`
        AND c.type = 'addon'
    ) as 'nb_addon'
    FROM `tab_participants` a, `api_tab_utilisateurs` b
    WHERE 1=1
    AND a.`id_user` = b.`id`
    AND a.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);