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
                    "middleWares":["support","auth"],
                    "dependencies" : ["dataTables"]
                });


                $.Oda.Router.addRoute("newContest", {
                    "path" : "partials/newContest.html",
                    "title" : "newContest.title",
                    "urls" : ["creer_tournoi"],
                    "middleWares":["support","auth"],
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
                                            return '<a target="_top" href="page_tournoi_param.html?&id_tournoi='+row[objDataTable.entete["id"]]+'&mili='+$.Oda.Tooling.getMilise()+'">'+row[objDataTable.entete["titre"]]+'</a>';
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
                                            return '<a target="_top" href="page_tournoi_param.html?&id_tournoi='+row[objDataTable.entete["id"]]+'&mili='+$.Oda.Tooling.getMilise()+'">'+row[objDataTable.entete["titre"]]+'</a>';
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
                        var json_retour = $.Oda.Interface.callRest($.Oda.Context.rest+"phpsql/creerTournoi.php", {functionRetour: function(response){
                            $.Oda.Display.Notification.success("Le tounoi n&deg;"+response.data.resultat+" a bien &eacute;t&eacute; cr&eacute;&eacute;");
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.NewContest.createContest : " + er.message);
                        return null;
                    }
                },
            }
        },
    };

    // Initialize
    _init();

})();
