// JavaScript libary
/**************** DOM functies *******************/
function leegNode(objNode){
/* verwijdert alle inhoud/children van een Node
@ objNode: node, verplicht, de node die geleegd wordt
*/
while(objNode.hasChildNodes()){
    objNode.removeChild(objNode.firstChild)
    }
}
/**************** Datum, tijd functies *************/
//globale datum objecten
var vandaag = new Date();

function getVandaagStr(){
    //returnt een lokale datumtijdstring
    var strNu = "Momenteel: " + vandaag.toLocaleDateString() + ", ";
    strNu += vandaag.toLocaleTimeString();
    return strNu;
}
//---------------------------------------------
//----------datum arrays----------------------
//dagen volgens getDay() volgorde
var arrWeekdagen= new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag');
//vervang feb dagen voor een schrikkeljaar
var arrMaanden= new Array(['januari',31], ['februari',28], ['maart',31], ['april',30], ['mei',31], ['juni',30], ['juli',31], ['augustus',31], ['september',30], ['oktober',31], ['november',30], ['december',31]);
//globale datum objecten te gebruiken in je pagina
var vandaag = new Date();
var huidigeDag = vandaag.getDate(); //dag vd maand
var huidigeWeekDag = vandaag.getDay(); //weekdag
var huidigeMaand = vandaag.getMonth();
var huidigJaar = vandaag.getFullYear();
//---------------------------------------------

function isSchrikkeljaar(jaar){
    /* test voor schrikkeljaar
    jaar: number, verplicht
    return: boolean
    */
    eindwaarde=false;
    if (!isNaN(jaar)){
        if (jaar%4===0){
            eindwaarde=true;
            if(jaar%100===0){
                eindwaarde=false;
                if(jaar%400===0){
                    eindwaarde=true;
                }
            }
        }
    }
    return eindwaarde;
}

function maakMaandTabel(kalenderJaar,maandIndex){
    /*
    Dependency: nuttig_lib
    Return: string, voor innerHTML: een tabelletje met een maandoverzicht
    @kalenderJaar: integer, 4 digit jaar
    @maandIndex: integer, van 0-11
    */
    //controle argumenten:
    if (isNaN(kalenderJaar) || (kalenderJaar.toString().length!=4)){
        return "fout jaargetal";
    }
    if (isNaN(maandIndex) || (maandIndex<0)|| (maandIndex>11)){
        return "fout maandgetal";
    }
    //weekdag van de eerste dag van de maand
    var start_datum = new Date(kalenderJaar, maandIndex, 1);
    var start_weekdag = start_datum.getDay();
    //bepaal einddag vr die maand, mogelijke uitzondering februari van schrikkeljaar
    var eindDag = arrMaanden[maandIndex][1];
    if((maandIndex==1) && (isSchrikkeljaar(kalenderJaar))){eindDag=29}
    //opbouw returnwaarde string
    strMaandTabel = "<table class='kalender'>\n";
    // titelrij
    strMaandTabel += "<tr><th colspan='7'>" + arrMaanden[maandIndex][0]+ " ";
    strMaandTabel += kalenderJaar + "</th></tr>\n";
    //dagtitels
    strMaandTabel += "<tr>";
    for(var i=0;i<7;i++){
        strMaandTabel += "<td>" + arrWeekdagen[i].substr(0,2).toUpperCase() + "</td>";
    }
    strMaandTabel += "</tr>\n";
    var dag = 1;
    var teller = 0;
    while(dag<=eindDag){
        // weekrij
        strMaandTabel += "<tr>";
        for (var i=0;i<7;i++){
            //teken cellen, met of zonder dag ingevuld
            var strId = ''; // id samengesteld uit maandIndex en dagnummer
            var strDagNummer = ''; //het dagNummer
            //schrijf de dagen
            if ((teller>=start_weekdag)&&(dag<=eindDag)) {
                strDagNummer = dag;
                strId = " id='" + kalenderJaar + "_" + maandIndex + "_" + dag + "'";
                dag++;
            }
            //schrijf de cel
            strMaandTabel += "<td " + strId +">" + strDagNummer + "</td>";
            teller++;
        }
        strMaandTabel += "</tr>\n";
    }
    strMaandTabel += "</table>\n";
    return strMaandTabel;
}

//----------------------------------------
function dagAanduiden(oDatum,CSS_Class){
    /*
    nodig: CSS class in stylesheet
    id in element
    @ oDatum: Datum object van aan te duiden dag
    @ CSS_Class: CSS class dient aanwezig te zijn
    */
    //welk jaar, maand en dag?
    var dDag = oDatum.getDate();
    var dMaand = oDatum.getMonth();
    var dJaar = oDatum.getFullYear();
    //construeer id voor cel
    var strId = dJaar+"_"+dMaand+"_"+dDag;
    var dCel = document.getElementById(strId);
    if (dCel){
        dCel.className = CSS_Class;
    }
}
function maakJaarKalender(kalenderJaar){
    /*
    Dependency: maakMaandTabel()
    Return: string, voor innerHTML: 12 maandtabellen
    @ kalenderJaar: integer, 4 digit jaar
    */
    strJaarKalender="";
    for(var i=0;i<12;i++){
        strJaarKalender += "<div class='maandContainer'>";
        strJaarKalender += maakMaandTabel(kalenderJaar,i);
        strJaarKalender += "</div>";
    }
    return strJaarKalender;
}

/************** cookies ****************************/
function setCookie(naam,waarde,dagen){
    /*plaatst een cookie
    naam: cookienaam;
    waarde: de inhoud van het cookie
    dagen: optioneel, het aantal dagen dat het cookie geldig blijft vanaf nu
    indien afwezig wordt het een session cookie
    */
    var verval = "";
    if(dagen){
        //vandaag global bovenaan deze lib; var vervalDatum = new Date(vandaag.getTime()+dagen*24*60*60*1000);
        var vervalDatum = new Date(vandaag.getTime()+dagen*24*60*60*1000);
        verval = vervalDatum.toUTCString();
    }
    document.cookie = naam + "=" + waarde + ";expires=" + verval;
}
//---------------------------------------------
function getCookie(naam){
    /*leest een cookie
    naam: cookienaam
    */
    var zoek = naam + "=";
    if (document.cookie.length>0){
        var begin = document.cookie.indexOf(zoek);
        if (begin!=-1){
            begin += zoek.length;
            var einde = document.cookie.indexOf(";", begin);
            if (einde==-1){
                einde = document.cookie.length;
            }
            return document.cookie.substring(begin, einde);
        }
    }
}
//---------------------------------------------
function clearCookie(naam){
    /*
    verwijdert een cookie
    naam: cookienaam
    */
    setCookie(naam,"",-1);
}

