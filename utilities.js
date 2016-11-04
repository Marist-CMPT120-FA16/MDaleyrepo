function location(id, name, desc, descAfter, item) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.descAfter = descAfter;
		this.item = item;
		this.visited = false;

		function toString(){
			return desc;
		}
}

var river = new location(0, "The River", "5. You're drowning in the river. But there is a sturgeon! Get out quick!","5. You're drowning in the river. No fish to be found just dirty needles :( Get out quick!", null);
var hancock = new location(1, "Hancock", "5. You're drowning in the river. But there is a sturgeon! Get out quick!","5. You're drowning in the river. No fish to be found just dirty needles :( Get out quick!", null);
var gym = new location(2, "Gym", "5. You're drowning in the river. But there is a sturgeon! Get out quick!","5. You're drowning in the river. No fish to be found just dirty needles :( Get out quick!", null);

var map = [
				     //n  s  e  w 
/*loc0 aka river*/    [1, 2, 0, 0],
/*loc1 aka hancock*/  [1, 0, 1, 1],
/*loc2 aka gym*/      [0, 1, 2, 2]
];
				// 0    1       2
var locations = [river,hancock,gym];
//direction to travel
var direction = 0;
//holds current location
var currentLocation = 0;

function north(){
	currentLocation = map[currentLocation][0];
}
function south(){
	currentLocation = map[currentLocation][1];
}
function east(){
	currentLocation = map[currentLocation][2];
}
function west(){
	currentLocation = map[currentLocation][3];
}

function visitRoom(){
	var site = locations[currentLocation];
	var message = site.desc;

	if(site.visited == false){
		score +=5
		site.visited = true
	}

	//button disable code :)
	document.getElementById('north').disabled = false;
    document.getElementById('east').disabled = false;
    document.getElementById('south').disabled = false;
    document.getElementById('west').disabled = false;

	if(site.id == map[currentLocation][0]){
		document.getElementById('north').disabled = true;
	}
	if(site.id == map[currentLocation][1]){
		document.getElementById('south').disabled = true;
	}
	if(site.id == map[currentLocation][2]){
		document.getElementById('east').disabled = true;
	}
	if(site.id == map[currentLocation][3]){
		document.getElementById('west').disabled = true;
	}

	writeText(message);
}

 // Writes to the text area
function writeText(msg) {
	document.getElementById("display").value="\n"+msg+"\n Score: "+score+"\n"+document.getElementById("display").value;
 }