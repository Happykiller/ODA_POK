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

                $.Oda.Router.startRooter();

                return this;
            } catch (er) {
                $.Oda.Log.error("$.Oda.App.startApp : " + er.message);
                return null;
            }
        },

        Controler : {
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
                                "aaSorting": [[1,'desc']],
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
                                            return '<a href="javascript:$.Oda.Router.navigateTo({\'route\':\'tournoi_param\',args:{\'id\':'+row[objDataTable.entete["id"]]+'}});">'+row[objDataTable.entete["titre"]]+'</a>';
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
                                "aaSorting": [[1,'desc']],
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
                                            return '<a href="javascript:$.Oda.Router.navigateTo({\'route\':\'tournoi_param\',args:{\'id\':'+row[objDataTable.entete["id"]]+'}});">'+row[objDataTable.entete["titre"]]+'</a>';
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
                currentContest : {},
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
                                console.log("HAALOOOO");
                                throw {message : "Id tournois unknow."};
                            }
                        }

                        $.Oda.App.Controler.DetailsContest.currentContest = $.Oda.Storage.get("currentContest", {id:$.Oda.Router.current.args.id});

                        var tabInput = { table : 'tab_tournois', get : '{"champ":"titre","type":"PARAM_STR"}', filtre : '{"champ":"id","valeur":"'+ $.Oda.App.Controler.DetailsContest.currentContest.id +'","type":"PARAM_INT"}'};

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
                        var tabInput = { id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
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
                                                strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delAddonParticipant({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-warning btn-xs" title="retirer addon"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>';
                                            }
                                            if (row[objDataTable.entete["nb_recave"]] !== '0') {
                                                strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delCaveParticipant({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-warning btn-xs" title="retirer cave"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>';
                                            }
                                            strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.DetailsContest.delParticipant({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-danger btn-xs" title="delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
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
                        var tabInput = { table : 'tab_tournois', set : '{"champ":"titre","valeur":"'+$("#name").val()+'","type":"PARAM_STR"}', filtre : '{"champ":"id","valeur":"'+$.Oda.App.Controler.DetailsContest.currentContest.id+'","type":"PARAM_INT"}'};
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
                        var tabInput = { action : 'reinit', id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/actionDecompte.php", {functionRetour: function(response){
                            $.Oda.Display.Notification.success("Remise à zéro r&eacute;ussi.");
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
                            var tabInput = { recherche : "", id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
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
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
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
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
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
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id };
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
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id, type : 'addon' };
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
                        var tabInput = { id_user : p_params.id, id_tournoi : $.Oda.App.Controler.DetailsContest.currentContest.id, type : 'recave' };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/delNewTapisParticipant.php", {functionRetour : function(response) {
                            $.Oda.App.Controler.DetailsContest.loadListParticipant();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.DetailsContest.delCaveParticipant : " + er.message);
                        return null;
                    }
                },
            }
        },
    };

    // Initialize
    _init();

})();
