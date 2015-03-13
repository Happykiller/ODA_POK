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
// phpsql/getInfosLive.php?milis=123450&ctrl=ok&id_tournoi=5

//--------------------------------------------------------------------------
$data = new stdClass();

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT COUNT(*) as 'nbTapis'
    FROM `tab_participants_tapis` a
    WHERE 1=1
    AND a.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
;";
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$data->strNbTapis = $retour->data->nbTapis;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *
    FROM `tab_tournois` a
    WHERE 1=1
    AND a.`id` = '".$INTERFACE->inputs["id_tournoi"]."'
;";
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$data->strTitre = $retour->data->titre;
$data->strDateDebut = $retour->data->dateDebut;
$data->strDateFin = $retour->data->dateFin;
$data->strNbJetonsTapis = $retour->data->nbJetonsTapis;
$data->strValeurTapis = $retour->data->valeurTapis;
$data->strRoundEnCours = $retour->data->roundEnCours;
$data->strEtatDecompte = $retour->data->etatDecompte;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT *, TIMESTAMPDIFF(SECOND, NOW(), (a.debutDecompte + INTERVAL a.tempsRestantSeconde SECOND)) as 'decompte'
    FROM `tab_rounds` a
    WHERE 1=1
    AND a.`id_tournoi` = ".$INTERFACE->inputs["id_tournoi"]."
    AND a.`numRound` = ".$data->strRoundEnCours."
;";
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$data->strTemps = $retour->data->temps;
$data->strTempsRestantSeconde = $retour->data->tempsRestantSeconde;
$data->strDebutDecompte = $retour->data->debutDecompte;
$data->strDecompte = $retour->data->decompte;
$data->strSmall_blind = $retour->data->small_blind;
$data->strBig_blind = $retour->data->big_blind;
$data->strAnte = $retour->data->ante;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT COUNT(*) as 'nbParticipant'
    FROM `tab_participants` a
    WHERE 1=1
    AND a.`id_tournoi` = '".$INTERFACE->inputs["id_tournoi"]."'
    AND a.`fin` = '0000-00-00 00:00:00'
;";
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$data->strNbParticipant = $retour->data->nbParticipant;

//--------------------------------------------------------------------------
$params = new stdClass();
$params->value = $retour;
$INTERFACE->addDataObject($data);