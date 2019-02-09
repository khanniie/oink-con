

var mySocket = io("http://198.199.65.72:4000/");
    mySocket.on('connect', function(){console.log("connected")});
    mySocket.on('event', function(data){});
    mySocket.on('disconnect', function(){});
    mySocket.on('labels', function(data){
        console.log('recieved response', data);
        var idx = data.class;
        //TODO: set this based on toggle
      filterarr=["spider","bear","motorcycle"];
        var filter = true;
        if (filter){
          var done = false;
          console.log(filterarr)
          for (var f = 0; f < filterarr.length; f++){
            for (var l=0; l < data.labels.length; l++){
              console.log(filterarr[f]);
              var labelstr = (data.labels[l].description).toLowerCase()+"";
              console.log(labelstr)
              console.log(labelstr.indexOf(filterarr[f]))
              if (labelstr.indexOf(filterarr[f]) >= 0){
                images[idx].src=chrome.runtime.getURL('pig.png');
                images[idx].alt = "piggy";
                done = true;
                break;
              }
            }
            if (done) break;
          }
        }
        var alttags = true;
      if (alttags){
        if (taglessimages.includes(images[idx])){
          console.log
          var labels = data.labels.slice(0, 5).map(x => x.description);
          if(labels.length == 0) return;
          var ele = images[idx];
          var str = labels.reduce((acc, curr) => acc + ", " + curr);
          if (ele) {ele.alt = str} else{
              console.log(images, ele);
          }
        }
      }
    });

var taglessimages = [];
var images = []
//var index = 0;
  //get array from storage of trigger words
  var filterarr = ["spider","bear","motorcycle"];

function execute(){
    mySocket.emit('connietest');
    chrome.storage.local.get('updateTextTo', function(items){
        console.log(items);
    });
    
    //get tags
    chrome.storage.local.get('tags',function(items){
      filterarr = items;
    });
    


  
  
    images = document.getElementsByTagName("img"); //this is an array of images
    for(var i = 0; i < images.length; i++){
        if(images[i].alt == ""){
                taglessimages.push(images[i]);
        };
      mySocket.emit('labelimage', {url: images[i].src, class: i});
    }
    return images.length;
  
  
  
}

var changed = execute();

changed;