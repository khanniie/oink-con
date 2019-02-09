function setupImage(){
    chrome.storage.local.get('tags', function(items){
            var listof = items.tags;
            var reduced = listof.reduce((arr, c) => arr + " " + c);
            document.getElementById("blockedimagelist").innerHTML = "blocked tag list: " + reduced;
        });
    chrome.storage.local.get('url', function(items){
            var u = items.url;
            if(u && u != ""){
                document.getElementById("appliedurl").innerHTML = "current applied url:: " + u;
            }
            
        });
}

document.getElementById("addblocktag").addEventListener("click", function(){
        console.log("clicked");
        var str = document.getElementById("blockedimagelist").innerHTML;
        var value = document.getElementById("texttag").value;
        if(!value || value === "") return;
        str = str + " " + value;
        document.getElementById("blockedimagelist").innerHTML = str;
        console.log(str);
        chrome.storage.local.get('tags', function(items){
            console.log(items.tags);
            var newitems = [];
            newitems = items.tags;
            newitems.push(value);
            chrome.storage.local.set({
            tags: newitems
            });
        });
        
        return false;
    })

document.getElementById("addurl").addEventListener("click", function(){
        console.log("clicked url");
        var value = document.getElementById("urltag").value;
        if(!value || value === "") return;
        var str = "current applied url: "  + value;
        document.getElementById("appliedurl").innerHTML = str;
        chrome.storage.local.set({
            url: value
        });
        
        return false;
    })

setupImage();