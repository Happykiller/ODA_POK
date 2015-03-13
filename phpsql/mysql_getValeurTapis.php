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
// phpsql/mysql_getValeurTapis.php?milis=123450&ctrl=ok&id_tournois=13

// IN obligatoire
$arrayInput = array(
    "ctrl" => null,
    "id_tournois" => null
);

//Récupération des entrants
$arrayValeur = recupInput($arrayInput);

//Object retour minima
// $object_retour->strErreur string
// $object_retour->data  string
// $object_retour->statut  string

//--------------------------------------------------------------------------
$strSql = "SELECT SUM(valeur_jeton*nb_jeton) as 'valeurTapis' 
    FROM `tab_tapis` a
    WHERE 1=1
    AND a.`id_tournois` = '".$arrayValeur["id_tournois"]."'
;";

$req = $connection->prepare($strSql);

$rows = array();
if($req->execute()){
    $rows = $req->fetch();
    $object_retour->data["resultat"] = $rows;
}else{
    die('Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")");
}
$req->closeCursor();

//--------------------------------------------------------------------------

if($modeDebug){
    $strSorti .= ($sql);
}

require("../API/php/footer.php");
?>