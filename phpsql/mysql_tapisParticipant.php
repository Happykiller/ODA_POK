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
// phpsql/mysql_tapisParticipant.php?milis=123450&id_user=1&id_tournoi=13&type=recave

// IN obligatoire
$arrayInput = array(
    "id_user" => null,
    "id_tournoi" => null,
    "type" => null
);

//Récupération des entrants
$arrayValeur = recupInput($arrayInput);

//Object retour minima
// $object_retour->strErreur string
// $object_retour->data  string
// $object_retour->statut  string

//--------------------------------------------------------------------------
$strSql = "INSERT INTO `tab_participants_tapis`
    (`id_tournoi`,`id_user`,`type`,`quant`)
    VALUES
    (:id_tournoi, :id_user, :type, NOW())
;";

$req = $connection->prepare($strSql);
$req->bindValue(":id_tournoi", $arrayValeur["id_tournoi"], PDO::PARAM_INT);
$req->bindValue(":id_user", $arrayValeur["id_user"], PDO::PARAM_INT);
$req->bindValue(":type", $arrayValeur["type"], PDO::PARAM_STR);

$resultat = new stdClass();
if($req->execute()){
    $resultat->id = $connection->lastInsertId(); 
}else{
    $error = 'Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")";
    $object_retour->strErreur = $error;
}
$req->closeCursor();
$object_retour->data["resultat"] = $resultat;

//--------------------------------------------------------------------------

if($modeDebug){
    $strSorti .= ('<br><br><br><br>'.$sql);
}

require("../API/php/footer.php");
?>