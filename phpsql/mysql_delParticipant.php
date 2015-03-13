<?php 
//Config : Les informations personnels de l'instance (log, pass, etc)
require("../include/config.php");

//API Fonctions : les fonctions fournis de base par l'API
require("../API/php/fonctions.php");

//Header établie la connection à la base $connection
require("../API/php/header.php");

//Fonctions : Fonctions personnelles de l'instance
require("../php/fonctions.php");

//Mode debug
$modeDebug = false;

//Public ou privé (clé obligatoire)
$modePublic = true;

//Mode de sortie text,json,xml,csv
//pour xml et csv $object_retour->data["resultat"] doit contenir qu'un est unique array
$modeSortie = "json";

//Liens de test
// phpsql/mysql_delParticipant.php?milis=123450&ctrl=ok&id_user=1&id_tournoi=1

// IN obligatoire
$arrayInput = array(
    "ctrl" => null,
    "id_user" => null,
    "id_tournoi" => null
);

//Récupération des entrants
$arrayValeur = recupInput($arrayInput);

//Object retour minima
// $object_retour->strErreur string
// $object_retour->data  string
// $object_retour->statut  string

//--------------------------------------------------------------------------
$strSql = "DELETE FROM `tab_participants`
     WHERE 1=1
     AND `id_tournoi` = ".$arrayValeur["id_tournoi"]."
     AND `id_user` = ".$arrayValeur["id_user"]."
;

DELETE FROM `tab_participants_tapis`
     WHERE 1=1
     AND `id_tournoi` = ".$arrayValeur["id_tournoi"]."
     AND `id_user` = ".$arrayValeur["id_user"]."
;";
$req = $connection->prepare($strSql);

$resultat = new stdClass();
if(!($req->execute())){
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}else{
    $resultat->statut = "ok"; 
}
$req->closeCursor();
$object_retour->data["resultat"] = $resultat;

//--------------------------------------------------------------------------

if($modeDebug){
    $strSorti .= ('<br><br><br><br>'.$sql);
}

require("../API/php/footer.php");
?>