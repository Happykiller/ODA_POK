<?php

namespace Pok;

require '../../header.php';
require "../../vendor/autoload.php";
require '../../config/config.php';

use 
    stdClass,
    Slim\Slim,
    cebe\markdown\GithubMarkdown,
    Oda\SimpleObject\OdaPrepareInterface,
    Oda\SimpleObject\OdaPrepareReqSql,
    Oda\OdaLibBd,
    Oda\OdaRestInterface
;

$slim = new Slim();
//--------------------------------------------------------------------------

$slim->notFound(function () use ($slim) {
    $params = new OdaPrepareInterface();
    $params->slim = $slim;
    $INTERFACE = new OdaRestInterface($params);
    $INTERFACE->dieInError('not found');
});

$slim->get('/', function () {
    $markdown = file_get_contents('./doc.markdown', true);
    $parser = new GithubMarkdown();
    echo $parser->parse($markdown);
});

$slim->get('/tournament/:id', function ($id) use ($slim) {
    $params = new OdaPrepareInterface();
    $params->slim = $slim;
    $INTERFACE = new OdaRestInterface($params);
    $params = new stdClass();
    $params->nameObj = "tab_tournois";
    $params->keyObj = ["id" => $id];
    $retour = $INTERFACE->BD_ENGINE->getSingleObject($params);
    $INTERFACE->addDataObject($retour);
});


$slim->run();