chrome.storage.local.get(['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], function(items){
    if(items.c1){
        document.getElementById("c1").checked = true;
    }
    if(items.c2){
        document.getElementById("c2").checked = true;
    }
    if(items.c3){
        document.getElementById("c3").checked = true;
    }
    if(items.c4){
        document.getElementById("c4").checked = true;
    }
    if(items.c5){
        document.getElementById("c5").checked = true;
    }
    if(items.c6){
        document.getElementById("c6").checked = true;
    }

});

function setupImage(){
    chrome.storage.local.get('tags', function(items){
            var listof = items.tags;
            if(listof && listof.length == 0) return;
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

document.getElementById("c1").addEventListener("click", function(){
        chrome.storage.local.get('c1', function(items){
            var val = items.c1;
            console.log("ccc");
            chrome.storage.local.set({
            c1: !val
            });
        });
        return false;
    })

document.getElementById("c2").addEventListener("click", function(){
        chrome.storage.local.get('c2', function(items){
            var val = items.c2;
            console.log("ccc");
            chrome.storage.local.set({
            c2: !val
            });
        });
        return false;
    })

document.getElementById("c3").addEventListener("click", function(){
        chrome.storage.local.get('c3', function(items){
            var val = items.c3;
            console.log("ccc");
            chrome.storage.local.set({
   
            c3: !val
            });
        });
        return false;
    })

document.getElementById("c4").addEventListener("click", function(){
        chrome.storage.local.get('c4', function(items){
            var val = items.c4;
            console.log("ccc");
            chrome.storage.local.set({
   
            c4: !val
            });
        });
        return false;
    })

document.getElementById("c5").addEventListener("click", function(){
        chrome.storage.local.get('c5', function(items){
            var val = items.c5;
            console.log("ccc");
            chrome.storage.local.set({
   
            c5: !val
            });
        });
        return false;
    })

document.getElementById("c6").addEventListener("click", function(){
        chrome.storage.local.get('c6', function(items){
            var val = items.c6;
            console.log("ccc");
            chrome.storage.local.set({
   
            c6: !val
            });
        });
        return false;
    })

setupImage();