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
$params->arrayInput = array("auteur","fini");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/getTournois.php?milis=123450&ctrl=ok&auteur=&fini=

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
    LIMIT 0 , 10
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);