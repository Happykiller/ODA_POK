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
// phpsql/mysql_getInfosLive.php?milis=123450&ctrl=ok&id_tournoi=5

// IN obligatoire
$arrayInput = array(
    "ctrl" => null,
    "id_tournoi" => null
);

//Récupération des entrants
$arrayValeur = recupInput($arrayInput);

//Object retour minima
// $object_retour->strErreur string
// $object_retour->data  string
// $object_retour->statut  string

//--------------------------------------------------------------------------
$data = new stdClass();
$object_retour->data = $data;

$strSql = "SELECT COUNT(*) as nbTapis
    FROM `tab_participants_tapis` a
    WHERE 1=1
    AND a.`id_tournoi` = ".$arrayValeur["id_tournoi"]."
;";
$req = $connection->prepare($strSql);
$rows = array();
if($req->execute()){
    $rows = $req->fetch();
    $object_retour->data->strNbTapis = $rows["nbTapis"];
}else{
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}
$req->closeCursor();

//--------------------------------------------------------------------------
$strSql = "SELECT *
    FROM `tab_tournois` a
    WHERE 1=1
    AND a.`id` = '".$arrayValeur["id_tournoi"]."'
;";
$req = $connection->prepare($strSql);
$rows = array();
if($req->execute()){
    $rows = $req->fetch();
    $object_retour->data->strTitre = $rows["titre"];
    $object_retour->data->strDateDebut = $rows["dateDebut"];
    $object_retour->data->strDateFin = $rows["dateFin"];
    $object_retour->data->strNbJetonsTapis = $rows["nbJetonsTapis"];
    $object_retour->data->strValeurTapis = $rows["valeurTapis"];
    $object_retour->data->strRoundEnCours = $rows["roundEnCours"];
    $object_retour->data->strEtatDecompte = $rows["etatDecompte"];
}else{
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}
$req->closeCursor();

//--------------------------------------------------------------------------
$strSql = "SELECT *, TIMESTAMPDIFF(SECOND, NOW(), (a.debutDecompte + INTERVAL a.tempsRestantSeconde SECOND)) as 'decompte'
    FROM `tab_rounds` a
    WHERE 1=1
    AND a.`id_tournoi` = ".$arrayValeur["id_tournoi"]."
    AND a.`numRound` = ".$object_retour->data->strRoundEnCours."
;";
$req = $connection->prepare($strSql);
$rows = array();
if($req->execute()){
    $rows = $req->fetch();
    $object_retour->data->strTemps = $rows["temps"];
    $object_retour->data->strTempsRestantSeconde = $rows["tempsRestantSeconde"];
    $object_retour->data->strDebutDecompte = $rows["debutDecompte"];
    $object_retour->data->strDecompte = $rows["decompte"];
    $object_retour->data->strSmall_blind = $rows["small_blind"];
    $object_retour->data->strBig_blind = $rows["big_blind"];
    $object_retour->data->strAnte = $rows["ante"];
}else{
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}
$req->closeCursor();

//--------------------------------------------------------------------------
$strSql = "SELECT COUNT(*) as 'nbParticipant'
    FROM `tab_participants` a
    WHERE 1=1
    AND a.`id_tournoi` = '".$arrayValeur["id_tournoi"]."'
    AND a.`fin` = '0000-00-00 00:00:00'
;";
$req = $connection->prepare($strSql);
$rows = array();
if($req->execute()){
    $rows = $req->fetch();
    $object_retour->data->strNbParticipant = $rows["nbParticipant"];
}else{
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}
$req->closeCursor();

//--------------------------------------------------------------------------

if($modeDebug){
    $strSorti .= ($strSql);
}

require("../API/php/footer.php");
?>