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
$params->arrayInput = array("id_tournoi","action");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/actionDecompte.php?milis=123450&ctrl=ok&id_tournoi=5&action=start

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM `tab_tournois` a
    WHERE 1=1
    AND a.`id` = :id_tournoi
;";
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$titre = $retour->data->titre;
$dateDebut = $retour->data->dateDebut;
$dateFin = $retour->data->dateFin;
$nbJetonsTapis = $retour->data->nbJetonsTapis;
$valeurTapis = $retour->data->valeurTapis;
$roundEnCours = $retour->data->roundEnCours;
$etatDecompte = $retour->data->etatDecompte;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM `tab_rounds` a
    WHERE 1=1
    AND a.`id_tournoi` = :id_tournoi
    AND a.`numRound` = :roundEnCours
;";
$params->bindsValue = [
    "id_tournoi" => $INTERFACE->inputs["id_tournoi"]
    , "roundEnCours" => $roundEnCours
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$temps = $retour->data->temps;
$tempsRestantSeconde = $retour->data->tempsRestantSeconde;
$debutDecompte = $retour->data->debutDecompte;
$small_blind = $retour->data->small_blind;
$big_blind = $retour->data->big_blind;
$ante = $retour->data->ante;

//--------------------------------------------------------------------------
//START
if($INTERFACE->inputs["action"] == "start"){
    if($dateDebut == '0000-00-00 00:00:00'){
        $params = new OdaPrepareReqSql();
        $params->sql = "UPDATE `tab_tournois`
            SET `dateDebut` = NOW()
            WHERE 1=1
            AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
        ;";
        $params->typeSQL = OdaLibBd::SQL_SCRIPT;
        $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
    }
    
    $params = new OdaPrepareReqSql();
    $params->sql = "UPDATE `tab_tournois`
        SET `etatDecompte` = 'encours'
        WHERE 1=1
        AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
    ;
    UPDATE `tab_rounds`
        SET `debutDecompte` = NOW()
        WHERE 1=1
        AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
        AND `numRound` = ".$roundEnCours."
    ;";
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
} 

//--------------------------------------------------------------------------
//PAUSE
if($INTERFACE->inputs["action"] == "pause"){
    $params = new OdaPrepareReqSql();
    $params->sql = "UPDATE `tab_tournois`
        SET `etatDecompte` = 'pause'
        WHERE 1=1
        AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
    ;
    
    UPDATE `tab_rounds`
        SET 
        `tempsRestantSeconde` = TIMESTAMPDIFF(SECOND, NOW(), (debutDecompte + INTERVAL temps*60 SECOND))
        WHERE 1=1
        AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
        AND `numRound` = ".$roundEnCours."
    ;";
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
} 

//--------------------------------------------------------------------------
//PAUSE
if($INTERFACE->inputs["action"] == "stop"){
    $params = new OdaPrepareReqSql();
    $params->sql = "UPDATE `tab_tournois`
        SET `etatDecompte` = 'stop',
        `dateFin` = NOW()
        WHERE 1=1
        AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
    ;";
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params); 
}

//--------------------------------------------------------------------------
//REINIT
if($INTERFACE->inputs["action"] == "reinit"){
    $params = new OdaPrepareReqSql();
    $params->sql = "UPDATE `tab_tournois`
        SET `etatDecompte` = 'init',
        `dateDebut` = '0000-00-00 00:00:00',
        `dateFin` = '0000-00-00 00:00:00',
        `roundEnCours` = 1
        WHERE 1=1
        AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
    ;
    
    UPDATE `tab_rounds`
        SET 
        `debutDecompte` = '0000-00-00 00:00:00',
        `tempsRestantSeconde` = temps*60
        WHERE 1=1
        AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
    ;";
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
}

//--------------------------------------------------------------------------
//upRound
if($INTERFACE->inputs["action"] == "upRound"){
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT COUNT(*) as 'exist'
        FROM `tab_rounds` a
        WHERE 1=1
        AND a.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
        AND a.`numRound` = ".(intval($roundEnCours)+1)."
    ;";
    $params->typeSQL = OdaLibBd::SQL_GET_ONE;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
    $exist = $retour->data->exist;

    if($exist == "1"){
        $params = new OdaPrepareReqSql();
        $params->sql = "UPDATE `tab_tournois`
            SET `roundEnCours` = ".(intval($roundEnCours)+1)."
            WHERE 1=1
            AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
        ;
        
        UPDATE `tab_rounds`
            SET `tempsRestantSeconde` = 0
            WHERE 1=1
            AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
            AND `numRound` = ".$roundEnCours."
        ;
        
        UPDATE `tab_rounds`
            SET `debutDecompte` = NOW(),
            `tempsRestantSeconde` = temps*60
            WHERE 1=1
            AND `id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
            AND `numRound` = ".(intval($roundEnCours)+1)."
        ;";
        $params->typeSQL = OdaLibBd::SQL_SCRIPT;
        $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);  
    }else{
        $params = new OdaPrepareReqSql();
        $params->sql = "UPDATE `tab_tournois`
            SET `etatDecompte` = 'stop',
            `dateFin` = NOW()
            WHERE 1=1
            AND `id` = ".$INTERFACE->inputs["id_tournoi"]."
        ;";
        $params->typeSQL = OdaLibBd::SQL_SCRIPT;
        $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
    }
}