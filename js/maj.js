function maj(arg) {
  // maj() fonctionne si :
      // arg est une string de pur texte
      // arg est l'identifiant d'une balise :
                // soit un input de type texte avec une value
                // soit une balise ouvrante/fermante contenant du texte uniquement
                // soit une balise ouvrante/fermante contenant du html donc il faut prendre des précautions pour ne pas écraser les balises
    var element = document.getElementById(arg);

    if (element) {   // si c'est l'identifiant d'une balise
          // on vérifie qu'il s'agit d'un input de type text, et qu'il a une value renseignée
          if ((element.tagName == 'INPUT') && (element.type == 'text') && (element.value)) {
              element.value = element.value.toUpperCase();  // c'est en argument (value) qu'on écrit le texte de cette balise !
          }

          else {        // sinon ce n'est pas un input text ou il n'y a pas de value

                var reconstruction = '';      // on va jouer sur l'innerHTML, qui récupère tout ce qu'il y a dans l'élément
                                              // c'est-à-dire les balises filles, le texte, mais avec une mise en forme (sauts à la ligne, décalage)
                                              // à la façon d'un tableau conservant l'arborescence indentée des balises -- bref un objet complexe
                                    // du coup si on assigne une nouvelle valeur à innerHTML... ça remplace tout, en un bloc !
                                    // on va donc reconstruire toute cette chaîne en passant en majuscules ce qui n'est pas inclus dans des balises

                                    // pourquoi ne pas utiliser textContent/innerText ?!  parce que, pareil, si on redéfinit textContent on écrase tout
                                    // oui mais textContent[i] ? non, on ne peut pas redéfinir des objets complexes comme textContent ou innerHTML morceau par morceau

                                    // et changer simplement la valeur de chacun des childNodes de notre élément ?
                                    // oui mais dans ce cas on ne change le texte que dans le premier niveau des descendants !
                                        // et la complexité pour explorer toute l'arborescence n'en vaut pas le coup

                for (i=0; i<element.innerHTML.length; i++) {    // on parcourt caractère par caractère tout ce qui n'est pas code html
                                                                  // mais il ne faut pas non plus toucher aux arguments ! qui ne sont pas du code

                      if (element.innerHTML[i] !== '<') {          // on cherche les balises
                          reconstruction += element.innerHTML[i].toUpperCase();    // tant qu'il n'y a pas de balise on transforme
                      }     //if
                      else {
                          while (element.innerHTML[i] !== '>') {
                            reconstruction += element.innerHTML[i];
                            i++;
                          };                 // si il y a < ouverture de balise on avance jusqu'à sa fermeture >
                          reconstruction += element.innerHTML[i];
                      }
                }     //for
                element.innerHTML = reconstruction;
          }     //else
    }     //if

    else {          // ce n'est pas une balise, on demande juste de retourner le texte envoyé, mis en majuscules
        return(element.toUpperCase);
    }
}


// pour le cas où elle puisse être utile, mais surtout pour montrer le fonctionnement avec les Nodes :
function majuscSurUnSeulNiv(element) {      // fonctionne sur un seul niveau, on ne descend pas l'arborescence
  for(var i = 0; i < element.childNodes.length; i++) {
    if (element.childNodes[i].nodeType == 3) {
        element.childNodes[i].nodeValue = element.childNodes[i].nodeValue.toUpperCase();
    }
  }
}
