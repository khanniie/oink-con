    document.getElementById("addblocktag").addEventListener("click", function(){
        console.log("clicked");
        var str = document.getElementById("blockedimagelist").innerHTML;
        var value = document.getElementById("texttag").value;
        if(!value || value === "") return;
        str = str + " " + value;
        document.getElementById("blockedimagelist").innerHTML = str;
        console.log(str);
        return false;
    })