///////////////////
//BLOCK FONCTIONS METIER
///////////////////	

///////////////////
//BLOCK FONCTIONS PRESENTATION
///////////////////

///////////////////
//BLOCK FONCTIONS TECHNIQUES
///////////////////

///////////////////
//BLOCK FONCTIONS AJAX JS/PHP/MYSQL
///////////////////

//---------------------------------------------------------
///////////////////
//BLOCK VARIABLE GLOBAL
///////////////////

///////////////////
//BLOCK FONCTIONS METIER
///////////////////	

///////////////////
//BLOCK FONCTIONS PRESENTATION
///////////////////

///////////////////
//BLOCK FONCTIONS TECHNIQUES
///////////////////
/**
 * getIdtournoi
 * 
 * @returns {int}
 */
function getIdtournoi() {
    try {
        return g_id_tournoi;
    }
    catch (er) {
        log(0, "ERROR(getIdtournoi):" + er.message);
    }
}

/**
 * chargerTitre
 */
function chargerTitre(p_id_tournoi) {
    try {
        var tabInput = { table : 'tab_tournois', get : '{"champ":"titre","type":"PARAM_STR"}', filtre : '{"champ":"id","valeur":"'+p_id_tournoi+'","type":"PARAM_INT"}'};
        var json_retour = $.functionsLib.callRest(domaine+"API/phpsql/getter.php", {}, tabInput);
        if(json_retour["strErreur"] == ""){
            document.title = $.functionsLib.getParameter("nom_site") + " - " + json_retour["data"]["resultat"]["champ"];

            $('#id_titre').html(json_retour["data"]["resultat"]["champ"]).trigger('create'); 
        }else{
            $.functionsLib.notification("Erreur chargerTitre : "+json_retour["strErreur"],$.functionsLib.oda_msg_color.ERROR);
        } 
    } catch (er) {
        $.functionsLib.log(0, "ERROR(chargerTitre):" + er.message);
    }
}


///////////////////
//BLOCK FONCTIONS AJAX JS/PHP/MYSQL
///////////////////