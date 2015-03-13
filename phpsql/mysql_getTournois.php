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
// phpsql/mysql_getTournois.php?milis=123450&ctrl=ok&auteur=&fini=

// IN obligatoire
$arrayInput = array(
    "auteur" => null,  
    "fini" => null
);

//Récupération des entrants
$arrayValeur = recupInput($arrayInput);

//Object retour minima
// $object_retour->strErreur string
// $object_retour->data  string
// $object_retour->statut  string

//--------------------------------------------------------------------------
//core_auteur
$strFiltreAuteur = "";
if($arrayValeur["auteur"] != ""){
    $strFiltreAuteur = " AND a.`auteur` = '".$arrayValeur["auteur"]."'";
}

//DateCreation
$strFiltreFini = "";
if($arrayValeur["fini"] == "non"){
    $strFiltreFini = " AND a.`dateFin` = '0000-00-00 00:00:00' ";
}
if($arrayValeur["fini"] == "oui"){
    $strFiltreFini = " AND a.`dateFin` <> '0000-00-00 00:00:00' ";
}

//--------------------------------------------------------------------------
$strSql = "SELECT *
    FROM  `tab_tournois` a
    WHERE 1=1
    ".$strFiltreAuteur."
    ".$strFiltreFini."
    ORDER BY `dateCreation` DESC
    LIMIT 0 , 10
;";
$req = $connection->prepare($strSql);

if($req->execute()){
    // On indique que nous utiliserons les résultats en tant qu'objet
    $req->setFetchMode(PDO::FETCH_OBJ);

    // On transforme les résultats en tableaux d'objet
    $resultats = new stdClass();
    $resultats->data = $req->fetchAll(PDO::FETCH_OBJ);
    $resultats->nombre = count($resultats->data);

    $object_retour->data["resultat"] = $resultats;
}else{
    $error = 'Erreur SQL:'.print_r($req->errorInfo(), true)." (".$strSql.")";
    $object_retour->strErreur = $error;
}
$req->closeCursor();

//--------------------------------------------------------------------------
if($modeDebug){
    $strSorti .= ($sql);
}

require("../API/php/footer.php");
?>