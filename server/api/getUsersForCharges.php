<?php
namespace Pok;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("idContest");
$INTERFACE = new PokInterface($params);

//--------------------------------------------------------------------------
// api/getUsersForCharges.php?idContest=10

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT a.`id`, b.`nom`, b.`prenom`, a.`part`, a.`idUser`
    FROM `tab_contest_charges` a, `api_tab_utilisateurs` b
    WHERE 1=1
    AND a.`idUser` = b.`id`
    AND a.`idContest` = :idContest
;";
$params->bindsValue = [
    "idContest" => $INTERFACE->inputs["idContest"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

foreach ($retour->data->data as $value) {
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT a.`id`, a.`cmt`, a.`expenditure`
        FROM `tab_contest_charges_details` a
        WHERE 1=1
        AND a.`idContestCharges` = :idContestCharges
        AND a.`expenditure` is not null
    ;";
    $params->bindsValue = [
        "idContestCharges" => $value->id
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ALL;
    $expenditure = $INTERFACE->BD_ENGINE->reqODASQL($params);
    $value->expenditure = $expenditure->data->data;

    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT a.`id`, a.`cmt`, a.`profit`
        FROM `tab_contest_charges_details` a
        WHERE 1=1
        AND a.`idContestCharges` = :idContestCharges
        AND a.`profit` is not null
    ;";
    $params->bindsValue = [
        "idContestCharges" => $value->id
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ALL;
    $profit = $INTERFACE->BD_ENGINE->reqODASQL($params);
    $value->profit = $profit->data->data;

    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT count(*) as 'nb'
        FROM `tab_participants_tapis` a
        WHERE 1=1
        AND a.`id_tournoi` = :idContest
        AND a.`id_user` = :idUser
    ;";
    $params->bindsValue = [
        "idContest" => $INTERFACE->inputs["idContest"],
        "idUser" => $value->idUser
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ONE;
    $nbTapis = $INTERFACE->BD_ENGINE->reqODASQL($params);
    $value->nbTapis = $nbTapis->data->nb;
}

$params = new stdClass();
$params->label = "result";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);