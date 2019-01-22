// Variables 
var lang= window.navigator.language, // Check the Browser language
translate; // Container of all translations

// Call translations json file and populate translate variable  
$.getJSON("translate-plugin/translations.json", function(texts) {
    translate=texts;

    // Translations Function: Get all the element with data-text
    $("[data-translate]").each(function() {
        let text= $(this).attr('data-translate'), // Save the Text into the variable
            numbers= text.match(/\d+/g),
            element=  $('[data-translate="'+text+'"]'),
            postHTML;

        if (numbers != null && numbers>1) 
                text= text.replace(numbers, '%n');
        
        if (translate[text]!==undefined) { // Check if exist the text in translation.json                      
            let appropiateText = translate[text][lang] 
                        || translate[text][lang.split("-")[0]] 
                        || translate[text][lang.split("-")[1]] 
                        || undefined // Check if exist the text in the browser language Fr-fr Fr fr
            if (appropiateText!==undefined) { //we check if we find a translation that corresponds to the local
                postHTML= appropiateText;
            } else { // If not exist the lang, show the text in primary Language (Recomend: English)
                postHTML= text;
            }

            if (numbers != null && numbers>1) 
                postHTML= postHTML.replace('%n', numbers);

            element.html(postHTML);

        } else {
            $('[data-translate="'+text+'"]').html("ERR").css({'color':'red','font-weight':'bold'});
        }
    });
});

