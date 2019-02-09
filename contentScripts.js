farnamImageUrls = [
	"https://www.cs.cmu.edu/~farnam/images/Farnam-Jahanian.jpg",
	"http://web.eecs.umich.edu/~farnam/images/fj.jpg",
	"https://www.cmu.edu/news/stories/archives/2015/february/images/farnam-jahanian-400x250-min.jpg"
]

var mySocket = io("http://198.199.65.72:4000/");
    mySocket.on('connect', function(){console.log("connected")});
    mySocket.on('event', function(data){});
    mySocket.on('disconnect', function(){});
    mySocket.on('labels', function(data){
        console.log('recieved response', data);
        var idx = data.class;
        var labels = data.labels.slice(0, 5).map(x => x.description);
        if(labels.length == 0) return;
        var ele = taglessimages[idx];
        var str = labels.reduce((acc, curr) => acc + ", " + curr);
        if (ele) {ele.alt = str} else{
            console.log(taglessimages, ele);
        }
    });

var taglessimages = [];
var index = 0;

function execute(){
    mySocket.emit('connietest');
    chrome.storage.local.get('updateTextTo', function(items){
        console.log(items);
    });
    var images = document.getElementsByTagName("img"); //this is an array of images
    for(var i = 0; i < images.length; i++){
        if(images[i].alt == ""){
                taglessimages.push(images[i]);
                mySocket.emit('labelimage', {url: images[i].src, class: index});
                index++;
        };
    }
    return images.length;
}

var changed = execute();

changed;