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
$params->arrayInput = array("id_user","id_tournoi","type");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/delNewTapisParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=1&type=recave

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT max(c.id) as 'maxid'
    from `tab_participants_tapis` c 
    where 1=1
    AND c.id_tournoi = :id_tournoi 
    AND c.id_user = :id_user
    AND c.type = :type
;";
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
    , "id_user" => $INTERFACE->inputs["id_user"]
    , "type" => $INTERFACE->inputs["type"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
$id = $retour->data->maxid;

//--------------------------------------------------------------------------
if($id != 0){
    $params = new OdaPrepareReqSql();
    $params->sql = "DELETE FROM `tab_participants_tapis`
         WHERE 1=1
         AND `id` = :id
    ;";
    $params->bindsValue = [
        "id" => $INTERFACE->inputs["id"]
    ];
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
    
    $params = new stdClass();
    $params->label = "resultat";
    $params->value = $retour->data;
    $INTERFACE->addDataStr($params);
}else{
    $INTERFACE->dieInError("Enregistrement non trouvé.");
}