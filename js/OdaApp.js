/* global er */
//# sourceURL=OdaApp.js
// Library of tools for the exemple
/**
 * @author FRO
 * @date 15/05/08
 */

(function() {
    'use strict';

    var
    /* version */
        VERSION = '0.1'
        ;

    ////////////////////////// PRIVATE METHODS ////////////////////////
    /**
     * @name _init
     * @desc Initialize
     */
    function _init() {
        $.Oda.Event.addListener({name : "oda-fully-loaded", callback : function(e){
            $.Oda.App.startApp();
        }});
    }

    ////////////////////////// PUBLIC METHODS /////////////////////////
    $.Oda.App = {
        /* Version number */
        version: VERSION,

        /**
         * @param {Object} p_params
         * @param p_params.attr
         * @returns {$.Oda.App}
         */
        startApp: function (p_params) {
            try {
                $.Oda.Router.addRoute("home", {
                    "path" : "partials/home.html",
                    "title" : "oda-main.home-title",
                    "urls" : ["","home"],
                    "middleWares" : ["support","auth"],
                    "dependencies" : ["dataTables"]
                });

                $.Oda.Router.addRoute("newContest", {
                    "path" : "partials/newContest.html",
                    "title" : "newContest.title",
                    "urls" : ["creer_tournoi"],
                    "middleWares" : ["support","auth"],
                    "dependencies" : ["dataTables"]
                });

                $.Oda.Router.addRoute("detailsContest", {
                    "path" : "partials/detailsContest.html",
                    "title" : "detailsContest.title",
                    "urls" : ["tournoi_param"],
                    "middleWares" : ["support","auth"],
                    "dependencies" : ["dataTables"]
                });

                $.Oda.Router.addRoute("liveContest", {
                    "path" : "partials/liveContest.html",
                    "title" : "liveContest.title",
                    "urls" : ["tournoi_live"],
                    "middleWares" : ["support","auth"]
                });

                $.Oda.Router.addRoute("histoContest", {
                    "path" : "partials/histoContest.html",
                    "title" : "histoContest.title",
                    "urls" : ["tournoi_histo"],
                    "middleWares" : ["support","auth"]
                });

                $.Oda.Router.addRoute("rulesContest", {
                    "path" : "partials/rulesContest.html",
                    "title" : "rulesContest.title",
                    "urls" : ["tournoi_rules"],
                    "middleWares" : ["support","auth"]
                });

                $.Oda.Router.addRoute("chargesContest", {
                    "path" : "partials/chargesContest.html",
                    "title" : "chargesContest.title",
                    "urls" : ["chargesContest"],
                    "middleWares" : ["support","auth"],
                    "dependencies" : ["dataTables"]
                });

                $.Oda.Router.startRooter();

                return this;
            } catch (er) {
                $.Oda.Log.error("$.Oda.App.startApp : " + er.message);
                return null;
            }
        },

        Controler : {
            currentContest : {},
            Home : {
                /**
                 * @returns {$.Oda.App.Controler.Home}
                 */
                start : function () {
                    try {
                        $.Oda.App.Controler.Home.loadTournoisFini();
                        $.Oda.App.Controler.Home.loadTournoisEnCours();

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.Home}
                 */
                loadTournoisFini : function () {
                    try {
                        var tabInput = { auteur : "", fini : "oui" };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getTournois.php", {functionRetour : function(response){
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tabTournoisFini" style="width: 100%"></table>';
                            $("#divTabTournoisFini").html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(response.data.resultat.data);
                            var oTable = $('#tabTournoisFini').DataTable( {
                                "sPaginationType": "full_numbers",
                                "aaData": objDataTable.data,
                                "aaSorting": [[0,'desc']],
                                "aoColumns": [
                                    { "sTitle": "Id","sClass": "center" },
                                    { "sTitle": "Titre","sClass": "center" },
                                    { "sTitle": "Date Début","sClass": "center" },
                                    { "sTitle": "Date Fin","sClass": "center" },
                                    { "sTitle": "Auteur","sClass": "center" }
                                ],
                                "aoColumnDefs": [
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["id"]];
                                        },
                                        "aTargets": [ 0 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return '<a onclick="$.Oda.Router.navigateTo({\'route\':\'tournoi_param\',args:{\'id\':'+row[objDataTable.entete["id"]]+'}});">'+row[objDataTable.entete["titre"]]+'</a>';
                                        },
                                        "aTargets": [ 1 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["dateDebut"]];
                                        },
                                        "aTargets": [ 2 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["dateFin"]];
                                        },
                                        "aTargets": [ 3 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["auteur"]];
                                        },
                                        "aTargets": [ 4 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#tabTournoisFini')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.loadTournoisFini : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.Home}
                 */
                loadTournoisEnCours : function () {
                    try {
                        var tabInput = { auteur : "", fini : "non" };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getTournois.php", {functionRetour : function(response){
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tabTournoisEnCours" style="width: 100%"></table>';
                            $("#divTabTournoisEnCours").html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(response.data.resultat.data);
                            var oTable = $('#tabTournoisEnCours').DataTable( {
                                "sPaginationType": "full_numbers",
                                "aaData": objDataTable.data,
                                "aaSorting": [[0,'desc']],
                                "aoColumns": [
                                    { "sTitle": "Id","sClass": "center" },
                                    { "sTitle": "Titre","sClass": "center" },
                                    { "sTitle": "Date Création","sClass": "center" },
                                    { "sTitle": "Date Début","sClass": "center" },
                                    { "sTitle": "Auteur","sClass": "center" }
                                ],
                                "aoColumnDefs": [
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["id"]];
                                        },
                                        "aTargets": [ 0 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return '<a onclick="$.Oda.Router.navigateTo({\'route\':\'tournoi_param\',args:{\'id\':'+row[objDataTable.entete["id"]]+'}});">'+row[objDataTable.entete["titre"]]+'</a>';
                                        },
                                        "aTargets": [ 1 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["dateCreation"]];
                                        },
                                        "aTargets": [ 2 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["dateDebut"]];
                                        },
                                        "aTargets": [ 3 ]
                                    },
                                    {
                                        "mRender": function ( data, type, row ) {
                                            return row[objDataTable.entete["auteur"]];
                                        },
                                        "aTargets": [ 4 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#tabTournoisEnCours')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.loadTournoisEnCours : " + er.message);
                        return null;
                    }
                },
            },
            NewContest : {
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.NewContest}
                 */
                start : function (p_params) {
                    try {
                        $.Oda.Scope.Gardian.add({
                            id : "gardianCreateContest",
                            listElt : ["name"],
                            function : function(params){
                                if( ($("#name").data("isOk"))){
                                    $("#submit").removeClass("disabled");
                                    $("#submit").removeAttr("disabled");
                                }else{
                                    $("#submit").addClass("disabled");
                                    $("#submit").attr("disabled", true);
                                }
                            }
                        });

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.NewContest.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.NewContest}
                 */
                createContest : function (p_params) {
                    try {
                        var p_titre = $("#name").val();

                        var tabInput = { code_user : $.Oda.Session.code_user, titre : p_titre };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/creerTournoi.php", {functionRetour: function(response){
                            $.Oda.Display.Notification.success("Le tounoi n&deg;"+response.data.resultat+" a bien &eacute;t&eacute; cr&eacute;&eacute;");
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.NewContest.createContest : " + er.message);
                        return null;
                    }
                },
            },
            DetailsContest : {
                /**
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                start : function () {
                    try {
                        if($.Oda.Router.current.args.hasOwnProperty("id")){
                            $.Oda.Storage.set("currentContest-"+ $.Oda.Session.code_user,{id:$.Oda.Router.current.args.id});
                        }else{
                            if($.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user) === null){
                                $.Oda.Router.navigateTo({'route':'home',args:{}})
                                throw {message : "Id tournois unknow."};
                            }
                        }

                        $.Oda.App.Controler.currentContest = $.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user);

                        $("#numContest").html("n&deg;"+ $.Oda.App.Controler.currentContest.id);

                        var tabInput = { table : 'tab_tournois', get : {"champ":"titre","type":"PARAM_STR"}, filtre : {"champ":"id","valeur":$.Oda.App.Controler.currentContest.id,"type":"PARAM_INT"}};

                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getter.php", {functionRetour: function(response){
                            $("#name").val(response.data.resultat.champ);
                        }}, tabInput);

                        $.Oda.Scope.Gardian.add({
                            id : "gardianUpdataParamContest",
                            listElt : ["name"],
                            function : function(params){
                                if( ($("#name").data("isOk"))){
                                    $("#submit-param").removeClass("disabled");
                                    $("#submit-param").removeAttr("disabled");
                                }else{
                                    $("#submit-param").addClass("disabled");
                                    $("#submit-param").attr("disabled", true);
                                }
                            }
                        });

                        $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        $.Oda.App.Controler.DetailsContest.detailsTapis();
                        $.Oda.App.Controler.DetailsContest.detailsRound();

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                loadListParticipant : function () {
                    try {
                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getParticipantsTournoi.php", {functionRetour : function(response) {
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tabParticipants" style="width: 100%"></table>';
                            $("#divParticipants").html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(response.data.resultat.data);
                            var oTable = $('#tabParticipants').DataTable({
                                "sPaginationType": "full_numbers",
                                "aaData": objDataTable.data,
                                "aaSorting": [[0, 'desc']],
                                "aoColumns": [
                                    {"sTitle": "Nom", "sClass": "dataTableColCenter"},
                                    {"sTitle": "Prénom", "sClass": "dataTableColCenter"},
                                    {"sTitle": "Addon", "sClass": "dataTableColCenter"},
                                    {"sTitle": "Cave", "sClass": "dataTableColCenter"},
                                    {"sTitle": "Action"}
                                ],
                                "aoColumnDefs": [
                                    {
                                        "mRender": function (data, type, row) {
                                            return row[objDataTable.entete["nom"]];
                                        },
                                        "aTargets": [0]
                                    },
                                    {
                                        "mRender": function (data, type, row) {
                                            return row[objDataTable.entete["prenom"]];
                                        },
                                        "aTargets": [1]
                                    },
                                    {
                                        "mRender": function (data, type, row) {
                                            return row[objDataTable.entete["nb_addon"]];
                                        },
                                        "aTargets": [2]
                                    },
                                    {
                                        "mRender": function (data, type, row) {
                                            return row[objDataTable.entete["nb_recave"]];
                                        },
                                        "aTargets": [3]
                                    },
                                    {
                                        "mRender": function (data, type, row) {
                                            var strHtml = '';
                                            if (row[objDataTable.entete["roundFin"]] !== '0') {
                                                strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.backParticipant({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-warning btn-xs" title="revenir"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span></button>';
                                            }
                                            if (row[objDataTable.entete["nb_addon"]] !== '0') {
                                                strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delAddonParticipant({id:' + row[objDataTable.entete["id_user"]] + '})" class="btn btn-warning btn-xs" title="retirer addon"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>';
                                            }
                                            if (row[objDataTable.entete["nb_recave"]] !== '0') {
                                                strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delCaveParticipant({id:' + row[objDataTable.entete["id_user"]] + '})" class="btn btn-warning btn-xs" title="retirer cave"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>';
                                            }
                                            strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delParticipant({id:' + row[objDataTable.entete["id_user"]] + '})" class="btn btn-danger btn-xs" title="delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
                                            return strHtml;
                                        },
                                        "aTargets": [4]
                                    }
                                ],
                                "fnDrawCallback": function (oSettings) {
                                    $('#tabParticipants')
                                        .removeClass('display')
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.loadListParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                submitParam : function (p_params) {
                    try {
                        var tabInput = { table : 'tab_tournois', set : {"champ":"titre","valeur":$("#name").val(),"type":"PARAM_STR"}, filtre : {"champ":"id","valeur":$.Oda.App.Controler.currentContest.id,"type":"PARAM_INT"}};
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/setter.php", {functionRetour: function(response){
                            $.Oda.Display.Notification.success("Mise &agrave; jour r&eacute;ussi.");
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.submitParam : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                reset : function () {
                    try {
                        var tabInput = { action : 'reinit', id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour: function(response){
                            $.Oda.Display.Notification.success("Remise à zéro r&eacute;ussi.");
                            clearInterval($.Oda.App.Controler.LiveContest.timer);
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.reset : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                addParticipant : function () {
                    try {
                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('detailsContest','addParticipant'), "details" : '<div id="divListUser"><oda-loading></oda-loading></div>', callback : function(){
                            var tabInput = { recherche : "", id_tournoi : $.Oda.App.Controler.currentContest.id };
                            $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getParticipants.php", {functionRetour : function(response) {
                                var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tabListUser" style="width: 100%"></table>';
                                $("#divListUser").html(strhtml);

                                var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(response.data.resultat.data);
                                var oTable = $('#tabListUser').DataTable({
                                    "sPaginationType": "full_numbers",
                                    "aaData": objDataTable.data,
                                    "aaSorting": [[0, 'desc']],
                                    "aoColumns": [
                                        {"sTitle": "Nom", "sClass": "dataTableColCenter"},
                                        {"sTitle": "Prénom", "sClass": "dataTableColCenter"},
                                        {"sTitle": "Action"}
                                    ],
                                    "aoColumnDefs": [
                                        {
                                            "mRender": function (data, type, row) {
                                                return row[objDataTable.entete["nom"]];
                                            },
                                            "aTargets": [0]
                                        },
                                        {
                                            "mRender": function (data, type, row) {
                                                return row[objDataTable.entete["prenom"]];
                                            },
                                            "aTargets": [1]
                                        },
                                        {
                                            "mRender": function (data, type, row) {
                                                var strHtml = '<button onclick="$.Oda.App.Controler.DetailsContest.addParticipantSelected({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                                                return strHtml;
                                            },
                                            "aTargets": [2]
                                        }
                                    ],
                                    "fnDrawCallback": function (oSettings) {
                                        $('#tabListUser')
                                            .removeClass('display')
                                            .addClass('table table-striped table-bordered');
                                    }
                                });
                            }}, tabInput);
                        }, name : "popListUser"});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.addParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                addParticipantSelected : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/addParticipant.php", {functionRetour : function(response) {
                            $.Oda.Display.Popup.close({name:"popListUser"});
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.addParticipantSelected : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                delParticipant : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.delParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                backParticipant : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/inParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.backParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                delAddonParticipant : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.currentContest.id, type : 'addon' };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delNewTapisParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.delAddonParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                delCaveParticipant : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.currentContest.id, type : 'recave' };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delNewTapisParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.delCaveParticipant : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                detailsTapis : function (p_params) {
                    try {
                        var tabInput = { id_tournois : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getTapis.php", {functionRetour : function(response) {
                            var strBody = "";
                            var sum = 0;

                            $.each( response.data.resultat.data, function( key, value ) {
                                var total = parseInt(value.valeur_jeton) * parseInt(value.nb_jeton);
                                sum += total;
                                strBody += '<tr><td>'+value.valeur_jeton+'</td><td>'+value.nb_jeton+'</td><td>'+total+'</td></tr>';
                            });

                            var strHtml = $.Oda.Display.TemplateHtml.create({
                                template : "templateTapis"
                                , scope : {
                                    tbody : strBody,
                                    valueTotalTapis : sum,
                                    labelTotalTapis : $.Oda.I8n.getByString("detailsContest.labelTotalTapis")
                                }
                            });

                            $('#divTapis').html(strHtml);
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.detailsTapis : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.DetailsContest}
                 */
                detailsRound : function (p_params) {
                    try {
                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getRounds.php", {functionRetour : function(response) {
                            var strBody = "";

                            $.each( response.data.resultat.data, function( key, value ) {
                                strBody += '<tr><td>'+value.temps+'</td><td>'+value.small_blind+'</td><td>'+value.big_blind+'</td><td>'+value.ante+'</td></tr>';
                            });

                            var strHtml = $.Oda.Display.TemplateHtml.create({
                                template : "templateRound"
                                , scope : {
                                    tbody : strBody
                                }
                            });

                            $('#divRound').html(strHtml);
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.detailsRound : " + er.message);
                        return null;
                    }
                },
            },
            LiveContest : {
                etatTimer : "",
                decompte : 0,
                timer : null,
                display : "small",
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                start : function (p_params) {
                    try {
                        if($.Oda.Router.current.args.hasOwnProperty("id")){
                            $.Oda.Storage.set("currentContest-"+ $.Oda.Session.code_user,{id:$.Oda.Router.current.args.id});
                        }else{
                            if($.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user) === null){
                                $.Oda.Router.navigateTo({'route':'home',args:{}})
                                throw {message : "Id tournois unknow."};
                            }
                        }

                        $.Oda.App.Controler.currentContest = $.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user);

                        $.Oda.App.Controler.LiveContest.loadStats();
                        $.Oda.App.Controler.LiveContest.loadPlayers();
                        $.Oda.App.Controler.LiveContest.loadClockContest();

                        setInterval(function(){
                            $.Oda.App.Controler.LiveContest.loadClock();
                        },1000);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                loadPlayers : function () {
                    try {
                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getParticipantsTournoi.php", {functionRetour : function(response) {
                            var dataRetour = response.data.resultat.data;
                            for (var indice in dataRetour) {
                                var strDisable = "";
                                var strBackGroudOut = "oda-panel-in";
                                if(dataRetour[indice].roundFin !== "0"){
                                    strDisable = "disabled";
                                    strBackGroudOut = "oda-panel-out";
                                }

                                var strHtml = $.Oda.Display.TemplateHtml.create({
                                    template : "templatePlayer"
                                    , scope : {
                                        disable : strDisable,
                                        name : dataRetour[indice].prenom.substring(0, 10) + "." + dataRetour[indice].nom.substring(0, 1),
                                        nbTapis : dataRetour[indice].nb_tapis,
                                        idTournois : $.Oda.App.Controler.currentContest.id,
                                        userId : dataRetour[indice].id_user,
                                        backgroudOut : strBackGroudOut
                                    }
                                });
                                $('#set' + (parseInt(indice) + 1)).html(strHtml);
                            }
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.loadPlayers : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.userId
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                addAddon : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.userId, id_tournoi : $.Oda.App.Controler.currentContest.id, type : 'addon' };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/tapisParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.LiveContest.loadPlayers();
                            $.Oda.App.Controler.LiveContest.loadStats();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.addAddon : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.userId
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                addCave : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.userId, id_tournoi : $.Oda.App.Controler.currentContest.id, type : 'recave' };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/tapisParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.LiveContest.loadPlayers();
                            $.Oda.App.Controler.LiveContest.loadStats();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.addCave : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.userId
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                out : function (p_params) {
                    try {
                        var tabInput = { id_user : p_params.userId, id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/outParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.LiveContest.loadPlayers();
                            $.Oda.App.Controler.LiveContest.loadStats();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.out : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.Controler.LiveContest}
                 */
                loadStats : function (p_params) {
                    try {
                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getInfosLive.php", {functionRetour : function(response) {
                            var strDateDebut = response["data"]["strDateDebut"];
                            var strDateFin = response["data"]["strDateFin"];
                            var strTitre = response["data"]["strTitre"];

                            var intNbJetonsTapis = 0;
                            intNbJetonsTapis = parseInt(response["data"]["strNbJetonsTapis"]);

                            var intNbTapis = 0;
                            intNbTapis = parseInt(response["data"]["strNbTapis"]);

                            var intNbParticpantsActif = 0;
                            intNbParticpantsActif = parseInt(response["data"]["strNbParticipant"]);

                            var intTapisMoyen = 0;
                            intTapisMoyen = Math.round((intNbJetonsTapis*intNbTapis)/intNbParticpantsActif);

                            var intValeurTapis = 0;
                            intValeurTapis = parseInt(response["data"]["strValeurTapis"]);

                            var int50 = 0;
                            int50 = Math.round((intValeurTapis*intNbTapis)*0.5);

                            var int30 = 0;
                            int30 = Math.round((intValeurTapis*intNbTapis)*0.3);

                            var int20 = 0;
                            int20 = Math.round((intValeurTapis*intNbTapis)*0.2);

                            var dateDebut = "";
                            dateDebut = response["data"]["strDateDebut"];

                            $('#big').html("B: <b>"+response["data"]["strSmall_blind"]+"</b>");

                            $('#small').html("S: <b>"+response["data"]["strBig_blind"]+"</b>");

                            var strAnte = "Ante: <b>"+response["data"]["strAnte"]+"</b>";
                            if(response["data"]["strAnte"] === "0"){
                                strAnte = "";
                            }
                            $('#ante').html(strAnte);

                            $('#tm').html(intTapisMoyen);
                            $('#nbTapis').html(intNbTapis);
                            $('#50').html(int50+'&euro;');
                            $('#30').html(int30+'&euro;');
                            $('#20').html(int20+'&euro;');
                            $('#startDate').html(strDateDebut);
                            $('#endDate').html(strDateFin);
                            $('#nameContest').html(strTitre.substr(0,15));
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.Controler.LiveContest.loadStats : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                loadClock : function (p_params) {
                    try {
                        var strHtml = $.Oda.Date.getStrDateTime();

                        $('#date').html(strHtml);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.loadClock : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                loadClockContest : function (p_params) {
                    try {
                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getInfosLive.php", {functionRetour : function(response) {
                            var dateTimeDepart = response["data"]["strSebutDecompte"];
                            var intDecompte = parseInt(response["data"]["strDecompte"]);
                            var intRestantSeconde = parseInt(response["data"]["strTempsRestantSeconde"]);
                            $.Oda.App.Controler.LiveContest.etatTimer = response["data"]["strEtatDecompte"];
                            if($.Oda.App.Controler.LiveContest.etatTimer === "encours"){
                                $.Oda.App.Controler.LiveContest.decompte = intDecompte;
                            }else{
                                $.Oda.App.Controler.LiveContest.decompte = intRestantSeconde;
                            }
                            $.Oda.App.Controler.LiveContest.round = parseInt(response["data"]["strRoundEnCours"]);

                            $("#round").html("N: <b>"+$.Oda.App.Controler.LiveContest.round+"</b>");
                            $("#roundTime").html("T: <b>"+$.Oda.Date.convertSecondsToTime($.Oda.App.Controler.LiveContest.decompte).substr(3)+"</b>");

                            switch ($.Oda.App.Controler.LiveContest.etatTimer) {
                                case "init":
                                    $("#start").show();
                                    $("#stop").hide();
                                    $("#pause").hide();
                                    break;
                                case "pause":
                                    $("#start").show();
                                    $("#stop").show();
                                    $("#pause").hide();
                                    break;
                                case "stop":
                                    $("#start").hide();
                                    $("#stop").hide();
                                    $("#pause").hide();
                                    break;
                                case "encours":
                                    $("#start").hide();
                                    $("#stop").show();
                                    $("#pause").show();
                                    clearInterval($.Oda.App.Controler.LiveContest.timer);
                                    $.Oda.App.Controler.LiveContest.timer = setInterval(function(){
                                        $.Oda.App.Controler.LiveContest.loadDecompte();
                                    },1000);
                                    break;
                            }
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.loadClockContest : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {String} p_action
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                actionDecompte : function (p_action) {
                    try {
                        switch (p_action) {
                            case 'start':
                                var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id, action : 'start' };
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour : function(response) {
                                    $.Oda.App.Controler.LiveContest.loadStats();
                                    $.Oda.App.Controler.LiveContest.loadClockContest();
                                }}, tabInput);
                                break;
                            case 'pause':
                                var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id, action : 'pause' };
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour : function(response) {
                                    clearInterval($.Oda.App.Controler.LiveContest.timer);
                                    $.Oda.App.Controler.LiveContest.loadStats();
                                    $.Oda.App.Controler.LiveContest.loadClockContest();
                                }}, tabInput);
                                break;
                            case 'stop':
                                var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id, action : 'stop' };
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour : function(response) {
                                    clearInterval($.Oda.App.Controler.LiveContest.timer);
                                    $.Oda.App.Controler.LiveContest.loadStats();
                                    $.Oda.App.Controler.LiveContest.loadClockContest();
                                }}, tabInput);
                                break;
                        }
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.actionDecompte : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                loadDecompte : function () {
                    try {
                        $.Oda.App.Controler.LiveContest.decompte -= 1;

                        $("#roundTime").html("T: <b>"+$.Oda.Date.convertSecondsToTime($.Oda.App.Controler.LiveContest.decompte).substr(3)+"</b>");

                        if($.Oda.App.Controler.LiveContest.decompte === 0){
                            clearInterval($.Oda.App.Controler.LiveContest.timer);
                            var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id, action : 'upRound' };
                            var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour : function(response) {
                                $.Oda.App.Controler.LiveContest.loadStats();
                                $.Oda.App.Controler.LiveContest.loadClockContest();
                                $.Oda.App.Controler.LiveContest.timer = setInterval(function(){
                                    $.Oda.App.Controler.LiveContest.loadDecompte();
                                },1000);
                            }}, tabInput);
                        }

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.loadDecompte : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.LiveContest}
                 */
                changeDisplay : function () {
                    try {
                        if($.Oda.App.Controler.LiveContest.display === "full"){
                            $.Oda.App.Controler.LiveContest.display = "small";
                            $("#display").removeClass("glyphicon-resize-small");
                            $("#display").addClass("glyphicon-resize-full");
                            $("#title").show();
                            $("#menu-tabs").show();
                            $("nav").show();
                        }else{
                            $.Oda.App.Controler.LiveContest.display = "full";
                            $("#display").removeClass("glyphicon-resize-full");
                            $("#display").addClass("glyphicon-resize-small");
                            $("#title").hide();
                            $("#menu-tabs").hide();
                            $("nav").hide();
                        }
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.LiveContest.changeDisplay : " + er.message);
                        return null;
                    }
                },
            },
            HistoContest : {
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.HistoContest}
                 */
                start : function (p_params) {
                    try {
                        if($.Oda.Router.current.args.hasOwnProperty("id")){
                            $.Oda.Storage.set("currentContest-"+ $.Oda.Session.code_user,{id:$.Oda.Router.current.args.id});
                        }else{
                            if($.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user) === null){
                                $.Oda.Router.navigateTo({'route':'home',args:{}})
                                throw {message : "Id tournois unknow."};
                            }
                        }

                        $.Oda.App.Controler.currentContest = $.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user);

                        var tabInput = { id_tournoi : $.Oda.App.Controler.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getHisto.php", {functionRetour : function(response) {
                            for(var indice in response.data.resultat.data){
                                var elt = response.data.resultat.data[indice];
                                var strHtml = "<tr>";
                                strHtml += '<td>'+elt.place+'</td><td>'+elt.nom+'</td><td>'+elt.prenom+'</td><td>'+elt.fin+'</td><td>'+elt.roundFin+'</td>'
                                strHtml += "</tr>";
                                $("#tabHisto tbody").append(strHtml);
                            }
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.HistoContest.start : " + er.message);
                        return null;
                    }
                },
            },
            ChargesContest : {
                /**
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                start: function () {
                    try {
                        if($.Oda.Router.current.args.hasOwnProperty("id")){
                            $.Oda.Storage.set("currentContest-"+ $.Oda.Session.code_user,{id:$.Oda.Router.current.args.id});
                        }else{
                            if($.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user) === null){
                                $.Oda.Router.navigateTo({'route':'home',args:{}})
                                throw {message : "Id tournois unknow."};
                            }
                        }

                        $.Oda.App.Controler.currentContest = $.Oda.Storage.get("currentContest-"+ $.Oda.Session.code_user);

                        $.Oda.App.Controler.ChargesContest.displayUsers();
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                displayUsers: function () {
                    try {
                        var tabInput = { idContest : $.Oda.App.Controler.currentContest.id };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getUsersForCharges.php", {functionRetour : function(response) {
                            var contestCharges = response.data.result.data;
                            var nbGrid = Math.ceil(contestCharges.length / 4);
                            var listContent = [];
                            contestCharges.totalExpenditure = 0;
                            $.each(contestCharges, function( index, contestCharge ) {
                                var strPart = "";
                                strPart += '<a onclick="$.Oda.App.Controler.ChargesContest.editPart({ id : '+ contestCharge.id +', value : '+contestCharge.part+', author : \''+(contestCharge.prenom + "." + contestCharge.nom.substring(0,1))+'\' });"><span class="glyphicon glyphicon-pencil"></span></a>';
                                strPart += contestCharge.part;

                                var strExpenditure = "";
                                contestCharge.totalExpenditure = 0;
                                $.each(contestCharge.expenditure, function( index, value ) {
                                    contestCharges.totalExpenditure += parseFloat(value.expenditure);
                                    contestCharge.totalExpenditure += parseFloat(value.expenditure);
                                    strExpenditure += '<a onclick="$.Oda.App.Controler.ChargesContest.editCharge({ id : '+ value.id +', cmt : \''+value.cmt+'\', value : '+value.expenditure+', type : \'expenditure\', author : \''+(contestCharge.prenom + "." + contestCharge.nom.substring(0,1))+'\' });"><span class="glyphicon glyphicon-pencil"></span></a>' + value.expenditure + "&euro; : " + value.cmt + "<br>";
                                });
                                if(strExpenditure.length>0){
                                    var str = "";
                                    str += '<li oda-label="chargesContest.expenditure">chargesContest.expenditure"</li>';
                                    str += strExpenditure;
                                    strExpenditure = str;
                                }

                                var strProfit = "";
                                contestCharge.totalProfit = 0;
                                $.each(contestCharge.profit, function( index, value ) {
                                    contestCharge.totalProfit += parseFloat(value.profit);
                                    strProfit += '<a onclick="$.Oda.App.Controler.ChargesContest.editCharge({ id : '+ value.id +', cmt : \''+value.cmt+'\', value : '+value.profit+', type : \'profit\', author : \''+(contestCharge.prenom + "." + contestCharge.nom.substring(0,1))+'\' });"><span class="glyphicon glyphicon-pencil"></span></a>' + value.profit + "&euro; : " + value.cmt + "<br>";
                                });

                                if(strProfit.length>0){
                                    var str = "";
                                    str += '<li oda-label="chargesContest.profit">chargesContest.profit"</li>';
                                    str += strProfit;
                                    strProfit = str;
                                }

                                var strLoose = "";
                                contestCharge.loose = parseInt(contestCharge.nbTapis)*5;
                                if(contestCharge.loose !== 0){
                                    strLoose += contestCharge.loose+'&euro;';
                                }
                                strLoose = (strLoose.length>0)?'<li oda-label="chargesContest.loose">chargesContest.loose"</li>'+strLoose:"";

                                var strHtml = $.Oda.Display.TemplateHtml.create({
                                    template : "templatePostIt"
                                    , scope : {
                                        part : strPart,
                                        expenditure : strExpenditure,
                                        profit : strProfit,
                                        balance : '<span id="blance-'+contestCharge.id+'"></span>&euro;',
                                        author : contestCharge.prenom + "." + contestCharge.nom.substring(0,1),
                                        id : contestCharge.id,
                                        loose : strLoose
                                    }
                                });
                                listContent.push(strHtml);
                            });
                            var contribution = $.Oda.Tooling.arrondir(contestCharges.totalExpenditure / contestCharges.length,1);
                            var strPostIts = "";
                            for (var i = 0; i < nbGrid; i++) {
                                var strHtml = $.Oda.Display.TemplateHtml.create({
                                    template : "templateGrid"
                                    , scope : {
                                        elt1 : (listContent[(i*4)] !== undefined)?listContent[(i*4)]:"",
                                        elt2 : (listContent[(i*4)+1] !== undefined)?listContent[(i*4)+1]:"",
                                        elt3 : (listContent[(i*4)+2] !== undefined)?listContent[(i*4)+2]:"",
                                        elt4 : (listContent[(i*4)+3] !== undefined)?listContent[(i*4)+3]:""
                                    }
                                });
                                strPostIts += strHtml;
                            }
                            $('#divPostIts').html(strPostIts);
                            $.each(contestCharges, function( index, value ) {
                                var balance = $.Oda.Tooling.arrondir(value.totalProfit - (contribution * value.part) - value.loose + value.totalExpenditure,1);
                                if(balance >= 0){
                                    $('#blance-'+value.id).html($.Oda.I8n.getByString('chargesContest.forPlayer') + balance);
                                }else{
                                    $('#blance-'+value.id).html($.Oda.I8n.getByString('chargesContest.forBank') + Math.abs(balance));
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.displayUsers : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.showUsers}
                 */
                showUsers: function () {
                    try {
                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('detailsContest','addParticipant'), "details" : '<div id="divListUser"><oda-loading></oda-loading></div>', callback : function(){
                            var tabInput = { recherche : "", id_tournoi : $.Oda.App.Controler.currentContest.id };
                            $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/getParticipants.php", {functionRetour : function(response) {
                                var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tabListUser" style="width: 100%"></table>';
                                $("#divListUser").html(strhtml);

                                var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(response.data.resultat.data);
                                var oTable = $('#tabListUser').DataTable({
                                    "sPaginationType": "full_numbers",
                                    "aaData": objDataTable.data,
                                    "aaSorting": [[0, 'desc']],
                                    "aoColumns": [
                                        {"sTitle": "Nom", "sClass": "dataTableColCenter"},
                                        {"sTitle": "Prénom", "sClass": "dataTableColCenter"},
                                        {"sTitle": "Action"}
                                    ],
                                    "aoColumnDefs": [
                                        {
                                            "mRender": function (data, type, row) {
                                                return row[objDataTable.entete["nom"]];
                                            },
                                            "aTargets": [0]
                                        },
                                        {
                                            "mRender": function (data, type, row) {
                                                return row[objDataTable.entete["prenom"]];
                                            },
                                            "aTargets": [1]
                                        },
                                        {
                                            "mRender": function (data, type, row) {
                                                var strHtml = '<button onclick="$.Oda.App.Controler.ChargesContest.addUser({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                                                return strHtml;
                                            },
                                            "aTargets": [2]
                                        }
                                    ],
                                    "fnDrawCallback": function (oSettings) {
                                        $('#tabListUser')
                                            .removeClass('display')
                                            .addClass('table table-striped table-bordered');
                                    }
                                });
                            }}, tabInput);
                        }, name : "popListUser"});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.showUsers : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                addUser: function (p_params) {
                    try {
                        var tabInput = { idUser : p_params.id, idContest : $.Oda.App.Controler.currentContest.id };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/addUserForCharges.php", {functionRetour : function(response) {
                            $.Oda.Display.Popup.close({name:"popListUser"});
                            $.Oda.App.Controler.ChargesContest.displayUsers();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.addUser : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.author
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                addCharges: function (p_params) {
                    try {
                        var strHtml = $.Oda.Display.TemplateHtml.create({
                            template : "templateFormAddCharges"
                            , scope : {}
                        });

                        $.Oda.Display.Popup.open({
                            "name" : "popAddCharges",
                            "label" : $.Oda.I8n.get('chargesContest','addCharges') + " " + p_params.author,
                            "details" : strHtml,
                            "footer" : '<button type="button" oda-label="oda-main.bt-submit" oda-submit="submit" onclick="$.Oda.App.Controler.ChargesContest.submitCharges({id:'+p_params.id+'});" class="btn btn-primary disabled" disabled>Submit</button >',
                            "callback" : function(){
                                $.Oda.Scope.Gardian.add({
                                    id : "addCharges",
                                    listElt : ["cmt","amount"],
                                    function : function(params){
                                        if( ($("#cmt").data("isOk")) && ($("#amount").data("isOk")) ){
                                            $("#submit").removeClass("disabled");
                                            $("#submit").removeAttr("disabled");
                                        }else{
                                            $("#submit").addClass("disabled");
                                            $("#submit").attr("disabled", true);
                                        }
                                    }
                                });
                            }
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.addCharges : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                submitCharges: function (p_params) {
                    try {
                        var tabInput = {
                            idContestCharges : p_params.id,
                            type : $('input[name=optionsRadios]:checked').val(),
                            cmt : $('#cmt').val(),
                            amount : $('#amount').val()
                        };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/addCharges.php", {functionRetour : function(response) {
                            $.Oda.Display.Popup.close({name:"popAddCharges"});
                            $.Oda.App.Controler.ChargesContest.displayUsers();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.submitCharges : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                del: function (p_params) {
                    try {
                        var tabInput = { idContestCharges : p_params.id };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delUserForCharges.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.ChargesContest.displayUsers();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.del : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                editPart: function (p_params) {
                    try {
                        var strHtml = $.Oda.Display.TemplateHtml.create({
                            template : "templateEditPart"
                            , scope : {
                                value : p_params.value
                            }
                        });

                        $.Oda.Display.Popup.open({
                            "name" : "popEditPart",
                            "label" : $.Oda.I8n.get('chargesContest','part') + ", " + p_params.author,
                            "details" : strHtml,
                            "footer" : '<button type="button" oda-label="oda-main.bt-submit" oda-submit="submit" onclick="$.Oda.App.Controler.ChargesContest.submitEditPart({id:'+p_params.id+'});" class="btn btn-primary disabled" disabled>Submit</button >',
                            "callback" : function(){
                                $.Oda.Scope.Gardian.add({
                                    id : "gEditPart",
                                    listElt : ["newPart"],
                                    function : function(params){
                                        if( ($("#newPart").data("isOk")) ){
                                            $("#submit").removeClass("disabled");
                                            $("#submit").removeAttr("disabled");
                                        }else{
                                            $("#submit").addClass("disabled");
                                            $("#submit").attr("disabled", true);
                                        }
                                    }
                                });
                            }
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.editPart : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.author
                 * @param p_params.value
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                submitEditPart: function (p_params) {
                    try {
                        var tabInput = {
                            table : 'tab_contest_charges',
                            set : {"champ":"part","valeur": $('#newPart').val(),"type":"PARAM_DOUBLE"},
                            filtre : {"champ":"id","valeur":p_params.id,"type":"PARAM_INT"}
                        };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/setter.php", {functionRetour : function(response) {
                            $.Oda.Display.Popup.close({name:"popEditPart"});
                            $.Oda.App.Controler.ChargesContest.displayUsers();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.submitEditPart : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.author
                 * @param p_params.value
                 * @param p_params.cmt
                 * @param p_params.type
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                editCharge: function (p_params) {
                    try {
                        var strHtml = $.Oda.Display.TemplateHtml.create({
                            template : "templateEditCharge"
                            , scope : {
                                id : p_params.id,
                                author : p_params.author,
                                cmt : p_params.cmt,
                                type : p_params.type,
                                amount : p_params.value
                            }
                        });

                        $.Oda.Display.Popup.open({
                            "name" : "popEditCharge",
                            "label" : $.Oda.I8n.get('chargesContest',p_params.type) + ", " + p_params.author,
                            "details" : strHtml,
                            "footer" : '<button type="button" oda-label="oda-main.bt-delete" onclick="$.Oda.App.Controler.ChargesContest.submitDelCharge({id:'+p_params.id+'});" class="btn btn-danger">delete</button ><button type="button" oda-label="oda-main.bt-submit" oda-submit="submit" onclick="$.Oda.App.Controler.ChargesContest.submitEditCharge({id:'+p_params.id+', type : \''+p_params.type+'\'});" class="btn btn-primary disabled" disabled>Submit</button >',
                            "callback" : function(){
                                $.Oda.Scope.Gardian.add({
                                    id : "gEditCharge",
                                    listElt : ["cmt","amount"],
                                    function : function(params){
                                        if( ($("#cmt").data("isOk")) && ($("#amount").data("isOk")) ){
                                            $("#submit").removeClass("disabled");
                                            $("#submit").removeAttr("disabled");
                                        }else{
                                            $("#submit").addClass("disabled");
                                            $("#submit").attr("disabled", true);
                                        }
                                    }
                                });
                            }
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.editCharge : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.type
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                submitEditCharge: function (p_params) {
                    try {
                        var tabInput = {
                            table : 'tab_contest_charges_details',
                            set : {"champ":p_params.type,"valeur": $('#amount').val(),"type":"PARAM_DOUBLE"},
                            filtre : {"champ":"id","valeur":p_params.id,"type":"PARAM_INT"}
                        };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/setter.php", {functionRetour : function(response) {
                            var tabInput = {
                                table : 'tab_contest_charges_details',
                                set : {"champ":"cmt","valeur": $('#cmt').val(),"type":"PARAM_STR"},
                                filtre : {"champ":"id","valeur":p_params.id,"type":"PARAM_INT"}
                            };
                            $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/setter.php", {functionRetour : function(response) {
                                $.Oda.Display.Popup.close({name:"popEditCharge"});
                                $.Oda.App.Controler.ChargesContest.displayUsers();
                            }}, tabInput);
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.submitEditCharge : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.ChargesContest}
                 */
                submitDelCharge: function (p_params) {
                    try {
                        var tabInput = { idCharge : p_params.id };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delCharge.php", {functionRetour : function(response) {
                            $.Oda.Display.Popup.close({name:"popEditCharge"});
                            $.Oda.App.Controler.ChargesContest.displayUsers();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ChargesContest.submitDelCharge : " + er.message);
                        return null;
                    }
                },
            }
        },
    };

    // Initialize
    _init();

})();
