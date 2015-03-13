<?php
namespace Pok;
use stdClass, \Oda\OdaPrepareInterface, \Oda\OdaPrepareReqSql, \Oda\OdaLibBd;
//--------------------------------------------------------------------------
//Header
require("../API/php/header.php");
require("../php/PokInterface.php");

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_tournoi");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/getHisto.php?milis=123450&ctrl=ok&id_tournoi=5

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT (select count(*)+1 FROM `tab_participants` c
        WHERE 1=1
        AND c.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
        AND c.`fin` > a.`fin`
        ) as 'place'
    ,b.`nom`, b.`prenom`, a.`fin`, a.`roundFin`
    FROM `tab_participants` a, `api_tab_utilisateurs` b
    WHERE 1=1
    AND a.`id_user` = b.`id`
    AND a.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
    ORDER BY `place` asc
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);