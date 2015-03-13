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
$params->arrayInput = array("code_user","titre");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// phpsql/creerTournoi.php?milis=123450&ctrl=ok&code_user=FRO&titre=PokerOctobre

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_tournois`
    (`titre`,`dateCreation`,`auteur`, `nbJetonsTapis`, `valeurTapis`, `roundEnCours`, `etatDecompte`)
    VALUES
    (:titre, NOW(), :code_user, 1500, 5, 1, 'init')
;";
$params->bindsValue = [
    "titre" => $INTERFACE->inputs["titre"]
    , "code_user" => $INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
$idTournoi = $retour->data;

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_rounds`
    (`id_tournoi`,`tempsRestantSeconde`, `numRound`, `temps`, `small_blind`,`big_blind`,`ante`)
    SELECT ".$idTournoi.", `tempsRestantSeconde`, `numRound`, `temps`, `small_blind`, `big_blind`, `ante`
    FROM  `tab_rounds` a
    WHERE 1=1
    AND `id_tournoi` =  0
    ORDER BY `small_blind` ASC
;";
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultatCreateRounds";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "INSERT INTO `tab_tapis`
    (`id_tournois`,`valeur_jeton`,`nb_jeton`)
    SELECT ".$idTournoi.",`valeur_jeton`,`nb_jeton`
    FROM  `tab_tapis` a
    WHERE 1=1
    AND `id_tournois` =  0
    ORDER BY `valeur_jeton` ASC
;";
$params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultatCreateTapis";
$params->value = $retour->data;
$INTERFACE->addDataStr($params);