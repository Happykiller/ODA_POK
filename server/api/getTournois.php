<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("auteur","fini");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/getTournois.php?milis=123450&ctrl=ok&auteur=&fini=

//--------------------------------------------------------------------------
//core_auteur
$strFiltreAuteur = "";
if($INTERFACE->inputs["auteur"] != ""){
    $strFiltreAuteur = " AND a.`auteur` = '".$INTERFACE->inputs["auteur"]."'";
}

//DateCreation
$strFiltreFini = "";
if($INTERFACE->inputs["fini"] == "non"){
    $strFiltreFini = " AND a.`dateFin` = '0000-00-00 00:00:00' ";
}
if($INTERFACE->inputs["fini"] == "oui"){
    $strFiltreFini = " AND a.`dateFin` <> '0000-00-00 00:00:00' ";
}

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM  `tab_tournois` a
    WHERE 1=1
    ".$strFiltreAuteur."
    ".$strFiltreFini."
    ORDER BY `dateCreation` DESC
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);