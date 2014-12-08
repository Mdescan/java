// Image_gallery_versie1.js
// een Javascript_PF project

//window.onload = function () {
//    var eImg = document.getElementById('plaatshouder');
//    //nieuwe eventhandler voor alle hyperlinks in de menubalk
//    var eSidebar=document.querySelector('aside');
//    var eLinks=eSidebar.getElementsByTagName('a');
//    console.log('sidebarLinks %s', eLinks.length);
//    for(var i=0;i<eLinks.length;i++){
//        eLinks[i].addEventListener('click',function (e){
//            e.preventDefault();
//            toonFoto(this, eImg);
//        });
//    }
//};
var versie = " versie 1.0";
window.onload = function () {
    //noscript verbergen
    var eNoScript = document.getElementById('noscript');
    eNoScript.style.display = "none";
    //array geladen?
    if(typeof aModernArt == "undefined"){
        throw new Error("array aModernArt niet gevonden");
    }else{
        //console.log(aModernArt[0][0]);
        //versie info
        var eKop = document.querySelector('h1');
        eKop.innerHTML = eKop.innerHTML + versie;
        //plaatshouder
        var eImg = document.getElementById('plaatshouder');
        //dynamische keuzelijst
        var eKeuzelijst = maakKeuzelijst(aModernArt);
        var eSidebar = document.querySelector('aside');
        eSidebar.appendChild(eKeuzelijst);
        eKeuzelijst.addEventListener("change",function(e){
            var waarde = this.value;
            console.log(waarde);
            if(waarde!="" && waarde!=null){
                toonFoto(waarde,eImg)
            }
        });
    }
}//einde window.onload

function toonFoto(nIndex, eImg){
    /* wisselt de bron van het src attribuut van de img#beeld
    @ nIndex, een hyperlink element
    @ eImg, plaatshouder img
    @ aModernArt array, global
    */
    aArt = aModernArt[nIndex]; //subarray
    sPad = aArt[0]; //source
    sInfo = aArt[1]; //info
    sNaam = aArt[2]; //naam
    eImg.src = "../images/art/" + sPad;
    var eInfo = document.getElementById('info');
    if(eInfo){
        //wijzig info
        eInfo.innerHTML = sInfo;
    }
    else {
        //maak nieuwe p#info aan
        var eInfo = document.createElement('p');
        eInfo.id = "info";
        eInfo.innerHTML = sInfo;
        eImg.parentNode.insertBefore(eInfo,eImg.parentNode.firstChild);
    }
}
function maakKeuzelijst(a){
    /*
    return SELECT element
    @a array van images
    */
    var nArt = a.length;
    var eSelect = document.createElement('select');
    eSelect.id = "keuzelijst";
    //standaard option element
    var eOption = document.createElement('option');
    eOption.innerHTML = "Maak een keuze";
    eOption.setAttribute("value", "");
    eSelect.appendChild(eOption);
    //andere option elementen met artiesten
    for(var i=0;i<nArt;i++){
        var eOption = document.createElement('option');
        eOption.innerHTML = a[i][2];
        eOption.value = i;
        eSelect.appendChild(eOption);
    }
    return eSelect;
}
