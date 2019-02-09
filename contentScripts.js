var c1, c2, c3, c4, c5, c6, mySocket;

chrome.storage.local.get(['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], function(items){

    mySocket = io("http://198.199.65.72:4000/");
    mySocket.on('connect', function(){console.log("connected")});
    mySocket.on('event', function(data){});
    mySocket.on('disconnect', function(){});
    mySocket.on('labels', function(data){
        console.log('recieved response', data);
        var idx = data.class;
        //TODO: set this based on toggle
      filterarr=["spider","bear","motorcycle"];
        var filter = c2;
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
        var alttags = c1;
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


    console.log(items);
            c1 = items.c1;
            c2 = items.c2;
            c3 = items.c3;
            c4 = items.c4;
            c5 = items.c5;
            c6 = items.c6;
    doRest();

        });
console.log(c1, c2, c3, c4, c5, c6);

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

function doRest(){
    if(c3){
        let paragraphs = document.getElementsByTagName('p');
        let lists = document.getElementsByTagName('li');
        let h1s = document.getElementsByTagName('h1');
        let h2s = document.getElementsByTagName('h2');
        let h3s = document.getElementsByTagName('h3');
        let h4s = document.getElementsByTagName('h4');
        for (elt of paragraphs) {
            elt.style['font-size'] = '28px';
            elt.style['line-height'] = '1.6';
            elt.style['letter-spacing'] = '0.2px';
        }
        for (elt of lists) {
            elt.style['font-size'] = '27px';
            elt.style['line-height'] = '1.4';
        }
        for (elt of h1s) {
            elt.style['font-size'] = '36px';
            elt.style['line-height'] = '1.4';
            elt.style['font-weight'] = '600';
            elt.style['font-family'] = 'sans-serif';
            elt.style['letter-spacing'] = '0.3px';
            elt.style['text-transform'] = 'uppercase';
        }
        for (elt of h2s) {
            elt.style['font-size'] = '35px';
            elt.style['line-height'] = '1.4';
            elt.style['font-weight'] = '600';
            elt.style['font-family'] = 'sans-serif';
            elt.style['letter-spacing'] = '0.3px';
            elt.style['text-transform'] = 'uppercase';
        }
        for (elt of h3s) {
            elt.style['font-size'] = '35px';
            elt.style['line-height'] = '1.4';
            elt.style['font-weight'] = '600';
            elt.style['font-family'] = 'sans-serif';
            elt.style['letter-spacing'] = '0.3px';
            elt.style['text-transform'] = 'uppercase';
            elt.style['color'] = 'gray';
        }
        for (elt of h4s) {
            elt.style['font-size'] = '32px';
            elt.style['line-height'] = '1.4';
            elt.style['font-weight'] = '600';
            elt.style['font-family'] = 'sans-serif';
            elt.style['letter-spacing'] = '0.3px';
            elt.style['text-transform'] = 'uppercase';
            elt.style['color'] = 'gray';
        }
    
}


    
if(c4){
    let links = document.getElementsByTagName('a');
    for (elt of links) {
        elt.style['font-size'] = '27px';
        elt.style['line-height'] = '1.4';
        elt.style['font-weight'] = '600';
        elt.style['color'] = '#1c63b2';
    }
}
        

var changed = execute();

return changed;
}
