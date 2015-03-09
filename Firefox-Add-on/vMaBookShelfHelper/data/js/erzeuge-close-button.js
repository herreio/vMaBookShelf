//   Name: erzeuge-close-button.js
//  Stand: 2015-03-02, 09:08:14
// Author: Bernd Fallert, UB Mannheim

// ToDo: Timer des Hauptfensters ausschalten wenn unterfenster aufgerufen wird
//          und wieder einschalten wenn unterfenster aus irgendeinem Grunde
//          geschlossen wird

var d                       = document;
var host                    = d.location.host;
//------------------------------------------------------------------------------
// Fuer Pruefung auf RufeExterneURL.php und UB3D
//------------------------------------------------------------------------------
var ScriptName              = d.location.pathname;

var lZeigeButton            = false;
var lIframe                 = false;
var lFlag                   = false;
var TimerID                 = 0;

var lFehlersuche            = false;
//var lFehlersuche            = true;

var nMinutenExternFenster   = 10;
var nMinutenHauptFenster    = 30;

var lHauptFenster           = false;
var lUnterFenster           = false;

console.log( "START" );

if (lFehlersuche) {
    // Fuer Fehlersuche verkuerzte Wartezeiten bis Timer zuschlaegt
    nMinutenExternFenster   = 1;
    nMinutenHauptFenster    = 1;
}


//http://stackoverflow.com/questions/812961/javascript-getters-and-setters-for-dummies
var counter = function() {
    var count = 0;

    this.inc = function() {
        count++;
    };

    this.reset = function() {
        count = 0;
    };

    this.getCount = function() {
        return count;
    };
};

var nBooklistTimerIndex = new counter();


console.log("\n\n\n\n\n\n" + "#".repeat(80) + "\n" + "ScriptName: '" +
    ScriptName + "' ----------substr 10> " + ScriptName.substr(0, 10));



if ((host === "aleph.bib.uni-mannheim.de") &&
    (ScriptName.substr(0, 9) != '/cgi-bin/' ) ||
    (host === "onlinelesen.ciando.com")) {

    if ( ScriptName === '/booklist/RufeExterneURL.php') {
        lZeigeButton    = true;
        lHauptFenster   = false;
        lUnterFenster   = true;

    //-------------------------------------------------
    // prüfen ob in weiterem Kontext wie z.B.
    //-------------------------------------------------
    } else if (ScriptName.substr(0,9) === '/cgi-bin/') {
        // Sonst kann UB3D aus dem Frame ausbrechen
        lZeigeButton    = true;
        lHauptFenster   = false;
        lUnterFenster   = true;

    } else if (ScriptName.substr(0,10) === '/booklist/') {
        lZeigeButton    = false;
        lHauptFenster   = true;
        lUnterFenster   = false;
    }

    //-------------------------------------------------
    if (lZeigeButton) {
        console.log( "lZeigeButton wahr" );
    } else {
        console.log( "lZeigeButton falsch" );
    }
    if (lHauptFenster) {
        console.log( "Hauptfenster wahr" );
    } else {
        console.log( "Hauptfenster falsch" );
    }
    if (lUnterFenster) {
        console.log( "UnterFenster wahr" );
    } else {
        console.log( "UnterFenster falsch" );
    }



} else {
    //alert( "Kontext verlassen" + "\n" + window.location );
    var aktLocation = window.location;
    lZeigeButton    = true;

    //---------------------------------
    // Pruefen ob im IFrame enthalten
    //---------------------------------
    var isInIFrame = (window.location != window.parent.location);
    if(isInIFrame == true){
        // iframe
        lZeigeButton    = false;
        lIframe         = true;
        //alert( "im IFrame" + "\n" + window.location );
    }
    else {
        // no iframe
        lZeigeButton    = true;
        lIframe         = false;

        console.log( "kein IFrame: Kontext verlassen daher\n" +
            "rufe ich neu auf: " +
            "http://aleph.bib.uni-mannheim.de/booklist/" +
            "RufeExterneURL.php?url=" +
            aktLocation );
        //----------------------------------------------------------------------
        // Seite nochmals über das Script RufeExterneURL.php aufrufen,
        // damit Seite wieder in IFrame gefangen wird
        //----------------------------------------------------------------------
        document.location.replace("http://aleph.bib.uni-mannheim.de/" +
                                  "booklist/RufeExterneURL.php?url=" +
                                  aktLocation);
    }
}


console.log( "\n\n\n\n" + "lZeigeButton: ______________________" + "\n\n\n\n");
if (lZeigeButton) {
    var div = document.createElement("div");
    div.innerHTML = "<a href='javascript:window.close();' " +
                    "class='schliessbutton_neu_links'>" +
                    "<span id='oben' " +
                        "width='67px' " +
                        "style='width: 57px; '" +
                        "onclick='javascript:window.close();'" +
                        "ontouchstart='javascript:window.close();'" +
                        "ontouched='javascript:window.close();'" +
                        ">" +
                    "</span>" +
                    "<span id='mitte'" +
                        "onclick='javascript:window.close();'" +
                        "ontouchstart='javascript:window.close();'" +
                        "ontouched='javascript:window.close();'" +
                    ">" +
                        "Schließen<br>/<br>Close" +
                        "</span>" +
                    "<span id='unten' " +
                       "style='width: 57px; '" +
                        "onclick='javascript:window.close();'" +
                        "ontouchstart='javascript:window.close();'" +
                        "ontouched='javascript:window.close();'" +
                    "></span>" +
                    "</a>";
    div.style.color = "white";
    div.setAttribute("class", "UBMaSchliess");

    document.body.insertBefore(div, document.body.firstChild);
    console.log("Scriptname: " + ScriptName.substr(0,10));
    window.TimerID = window.setTimeout(WelchesFensterIstAktiv, 10000);
} else {
    //--------------------------------------------------------------------------
    // Timer zum umschalten des Hauptfensters
    //--------------------------------------------------------------------------
    if (lHauptFenster) {
        window.TimerIDHauptFenster = window.setTimeout(SchalteHauptFensterUm,
            10000);
    }

    if (lFehlersuche) {
        // Jetzt testweise alle Elemente mit class fachnavi durchgehen
        $( '.fachnavi' ).each(function(index) {
            console.log( "index: " + index + " " + $(this).data('id'));
        });
    };
}


function WelchesFensterIstAktiv () {
    //console.log("WelchesFensterIstAktiv");

    var d = document;
    var host = d.location.host;
    //--------------------------------------------------------------------------
    // Fuer Pruefung auf RufeExterneURL.php und UB3D
    //--------------------------------------------------------------------------
    var ScriptName = d.location.pathname;

    var lZeigeButton = false;
    var lIframe      = false;
    var lClose      = false;



    //#############################################
    //#############################################
    // Timer für Schliesen des Fensters mit Touch oder Click zurücksetzen

    console.log( "-----------------------------\n" +
        "         Setze jetzt die Events" );


    if (typeof( window.ClickId ) !== 'undefined' ) {
        document.body.detachEvent('click', window.ClickId);
        console.log( "detachEvent möglich, ClickId ist:" + window.ClickId);
    } else {
        console.log( "detachEvent nicht möglich, ClickId ist nicht definiert!");
    };
    if (typeof( window.TouchId ) !== 'undefined' ) {
        document.body.detachEvent('touchstart', window.TouchId);
        console.log( "detachEvent möglich, TouchId ist:" + window.TouchId);
    } else {
        console.log( "detachEvent nicht möglich, TouchId ist nicht definiert!");
    };


    //BehandleClickUndTouch
    window.ClickId  = document.body.addEventListener('click',
        BehandleClickUndTouch, false);
    window.TouchId  = document.body.addEventListener('touchstart',
        BehandleClickUndTouch, false);

    //#############################################
    //#############################################



    if (host === "aleph.bib.uni-mannheim.de") {

        if ( ScriptName === '/booklist/RufeExterneURL.php') {
          // prüfen ob in weiterem Kontext wie z.B.
        } else if (ScriptName.substr(0,7) === '/cgi-bin/') {
            // Sonst kann UB3D aus dem Frame ausbrechen
        }
    }

    if (nBooklistTimerIndex.getCount() < (6 * nMinutenExternFenster)) {
        //----------------------------------------------------------------------
        // Nr. hochzählen
        // solange kleiner als hier passiert ausser dem hochzählen nichts
        //----------------------------------------------------------------------
        nBooklistTimerIndex.inc();
        console.log(nBooklistTimerIndex.getCount());
        console.log("Scriptname (kurz): " + ScriptName.substr(0,10));
        console.log("Scriptname:(voll): " + ScriptName);
        console.log("window.TimerID: " + window.TimerID);

        self.port.emit("empfangeUnterfensterAktiv", true);

    } else if (nBooklistTimerIndex.getCount() < (1000 * nMinutenExternFenster)) {
        // wenn es groesser als das erste Zahl ist dann wird das overlay
        // angezeigt und ein zweiter Timer läuft an der nach 1 Minut
        // das Fenster beendet
        nBooklistTimerIndex.inc();
        console.log(nBooklistTimerIndex.getCount());

        // Overlay anzeigen mit der Frage ob noch jemand lebt
        overlay('display');

        console.log("2".repeat(10) + " Scriptname (kurz): " +
            ScriptName.substr(0,10));
        console.log("2".repeat(10) + " Scriptname:(voll): " + ScriptName);
        console.log("2".repeat(10) + " window.TimerID: " + window.TimerID);

    }

    if (!lClose) {
        window.TimerID = window.setTimeout(WelchesFensterIstAktiv, 10000);
        console.log( "neuen Timer wurde setzen: " + window.TimerID);
    };
}

function overlay(mode) {
    if (mode == 'display') {
        if (document.getElementById("iframe-extern-wrapper") === null) {
            div = document.createElement("div");
            div.innerHTML = '<div id="lightBox"></div>';
            div.setAttribute('id', 'iframe-extern-wrapper');
            div.setAttribute('className', 'iframe-extern-wrapper-abgelaufen');
            div.setAttribute('class', 'iframe-extern-wrapper-abgelaufen');

            divTextBox = document.createElement("div");
            //divTextBox.innerHTML = '<h1>Möchten Sie noch weiterlesen?<br />Would you like to continue reading</h1><h2>Bitte den Bildschirm an einer beliebigen Stelle berühren<br />Please touch the screen at any point</h2>';
            divTextBox.innerHTML = '<h1>Möchten Sie noch weiterlesen?<br />' +
                'Would you like to continue reading</h1>' +
                '<h2>Bitte den Bildschirm an einer beliebigen Stelle ' +
                'berühren<br />Please touch the screen at any point</h2>';
            divTextBox.setAttribute('id', 'lightBox');

            document.getElementsByTagName("body")[0].appendChild(div);
            document.getElementsByTagName("body")[0].appendChild(divTextBox);


            //------------------------------------------------------------------
            // einen Timer einsetzen der das aktive Fenster schliesst und das
            // oberlay entfernt.
            // Wird die Frage eingeblendet ob noch jemand aktiv ist
            // läuft ein Timer von 1 Minute los der unterbrochen wird
            // wenn ein Klick stattfindet das abbrechen des Timers wird von
            // dem normalen Clickbehandlung unterbrochen es wird kein eigener
            // Handler hierfür eingerichtet
            //------------------------------------------------------------------
            // einen Timer einsetzen der das aktive Fenster schliesst und das
            // oberlay entfernt
            window.LiestNochJemandTimerID = window.setTimeout(liestNochJemand,
                10000 * 6);
        }
   } else {
        // diese Reihenfolge belassen
        // bei umgedrehter Reihenfolge? werden die Elemente nicht entfernt?
        document.getElementsByTagName("body")[0].removeChild(document.
         getElementById("iframe-extern-wrapper"));
        document.getElementsByTagName("body")[0].removeChild(document.
         getElementById("lightBox"));

    }
}

function liestNochJemand() {
    self.port.emit("empfangeUnterfensterAktiv", false);
    console.log("\n\n-----------------------------\n" +
        "wurde beendet durch liestNochJemand\n\n");
    window.close();
};


function BehandleClickUndTouch() {
    console.log("-----------------------------\n" +
        "Es wurde geklickt: " + nBooklistTimerIndex.getCount());
    // Zähler reseten, damit ist der Counter und damit der Timer zurückgesetzt
    nBooklistTimerIndex.reset();

    console.log("in BehandleClickUndTouch: " + nBooklistTimerIndex.getCount());

    // Overlay wieder entfernen wenn es vorhanden ist
    overlay('hide');

    // Timer für Lebt noch jemand abbrechen
    if (typeof( window.LiestNochJemandTimerID ) !== 'undefined') {
        clearTimeout(window.LiestNochJemandTimerID);
        console.log( "Stopp window.LiestNochJemandTimerID: " +
            window.LiestNochJemandTimerID);
    };

}


function BehandleClickUndTouchHauptFenster() {
    console.log("-----------------------------\n" +
        "Es wurde geklickt: " + nBooklistTimerIndex.getCount());
    // Zähler reseten, damit ist der Counter und damit der Timer zurückgesetzt
    nBooklistTimerIndex.reset();

    console.log("in BehandleClickUndTouchHauptFenster: " +
        nBooklistTimerIndex.getCount());
}




function SchalteHauptFensterUm () {

    console.log("SchalteHauptFensterUm");

    // Timer für Schliesen des Fensters mit Touch oder Click zurücksetzen

    console.log( "-----------------------------\n" +
        "         Setze jetzt die Events" );


    console.log("vor istUnterfensterAktiv" + "=".repeat(30));
    self.port.on("istUnterfensterAktiv", function(tag) {
        console.log( "Alt: " + nBooklistTimerIndex.getCount());
        nBooklistTimerIndex.reset();
        console.log( "neu: " + nBooklistTimerIndex.getCount());
        if (tag) {
            console.log( "\n\n" + "?".repeat(32) +
                "\n\nUnterfenster ist NOCH aktiv (in SchalteHauptFensterUm)\n");
        console.log( "Alt: " + nBooklistTimerIndex.getCount());
        nBooklistTimerIndex.reset();
        console.log( "neu: " + nBooklistTimerIndex.getCount());
        } else {
            console.log( "\n\n" + "?".repeat(32) +
                "\n\nUnterfenster ist NICHT aktiv (in SchalteHauptFensterUm)\n");
        }
    });
    console.log("nach istUnterfensterAktiv" + "=".repeat(40));


    //BehandleClickUndTouch
    window.ClickIdHauptFenster  = document.body.
        addEventListener('click', BehandleClickUndTouchHauptFenster, false);
    window.TouchIdHauptFenster  = document.body.
        addEventListener('touchstart', BehandleClickUndTouchHauptFenster, false);

    //#############################################
    //#############################################

console.log("\n\n\n\n=================================================");
console.log(nBooklistTimerIndex.getCount());
console.log("\n=================================================\n\n\n\n\n\n\n");

    if (nBooklistTimerIndex.getCount() < (6 * nMinutenHauptFenster)) {
        //----------------------------------------------------------------------
        // Nr. hochzählen
        // solange kleiner als hier passiert ausser dem hochzählen nichts
        //----------------------------------------------------------------------
        nBooklistTimerIndex.inc();
        console.log(nBooklistTimerIndex.getCount());
        console.log("Warte auf Hauptfenster umschalten");
        console.log("window.TimerID: " + window.TimerIDHauptFenster);

        //WaehleZufaelligesFach();
        console.log("vor istUnterfensterAktiv" + "=".repeat(30));
        self.port.on("istUnterfensterAktiv", function(tag) {
            nBooklistTimerIndex.reset();
            console.log( "\n\n" + "?".repeat(20) +
                "\n\nUnterfenster ist noch aktiv (in SchalteHauptFensterUm)\n");
        });
        console.log("nach istUnterfensterAktiv" + "=".repeat(52));

    } else if (nBooklistTimerIndex.getCount() < (1000 * nMinutenHauptFenster)) {
        // wenn es groesser als das erste Zahl ist dann wird das overlay
        // angezeigt und ein zweiter Timer läuft an der nach 1 Minut das
        // Fenster beendet
        nBooklistTimerIndex.inc();
        console.log(nBooklistTimerIndex.getCount());

        // umschalten auf andere url
        WaehleZufaelligesFach();

        console.log("2".repeat(10) + " Scriptname (kurz): " +
            ScriptName.substr(0,10));
        console.log("2".repeat(10) + " Scriptname:(voll): " +
            ScriptName);
        console.log("2".repeat(10) + " window.TimerIDHauptFenster: " +
            window.TimerIDHauptFenster);

    }

    window.TimerIDHauptFenster =
        window.setTimeout(SchalteHauptFensterUm, 10000);
    console.log( "neuen TimerHauptFenster wurde setzen: " +
        window.TimerIDHauptFenster);

}


/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//----------------------------------------------------------------------
// Zufaelliges Fach aus der Liste aufrufen
//
// Die Liste wird ueber die Abfrage der Class "fachnavi" und dem
// "data-id"-Element abgefragt
// Aus dem daraus aufgebauten Array wird dann ein Element zufaellig
// ausgewaehlt
//----------------------------------------------------------------------
function WaehleZufaelligesFach() {
    var aHtmlFaecherListe = new Array();

    //--------------------------------------------------------------------------
    // Jetzt alle Elemente mit class fachnavi durchgehen
    // und id extrahieren zur Ermittlung der zufaelligen
    // Sprungadresse
    //--------------------------------------------------------------------------
    $( '.fachnavi' ).each(function(index) {
        var nID = $(this).data('id');
        console.log( "index: " + index + " " + nID );
        aHtmlFaecherListe.push(nID);
    });

    //--------------------------------------------------------------------------
    // Zufaellige Sprungadresse ermitteln
    //--------------------------------------------------------------------------
    var aktIndex = getRandomInt( 1, aHtmlFaecherListe.length );
    console.log("=======>WaehleZufaelligesFach  Element=>aktIndex: " +
        aktIndex + " aHtmlFaecherListe.length: " + aHtmlFaecherListe.length);

    //--------------------------------------------------------------------------
    // Feststellen welche Version, d.h. Normal oder g dann Gestensteuerungspc
    //--------------------------------------------------------------------------
    var aktPath     = document.location.pathname;
    var nPathL      = aktPath.length;
    var cVersion    = aktPath.substr( nPathL - 6, 1 );
    var cOptGesten  = ""

    // Optionen fuer Gestenversion setzten
    if (cVersion === "g") {
        cOptGesten = "g";
    }

    document.location.replace("http://aleph.bib.uni-mannheim.de/" +
                              "booklist/" +
                              aHtmlFaecherListe[ aktIndex - 1 ] +
                              cOptGesten + ".html");
}
