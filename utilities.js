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

function item(id, name, desc) {
		this.id = id;
		this.name = name;
		this.desc = desc;

		function toString(){
			return desc;
		}
}

//items
var ring = new item(0, "Ring of Sauron", "I can feel it's power...");
var mithril armor = new item(1, "Mithril Armor", "I feel invincible, thanks Bilbo.");
var sting sword = new item(2, "Sting Sword", "This glows when orcs are nearby.");
var orcs finger = new item(3, "Orcs Finger", "A trophy for enduring the pain.");
var lembas bread = new item(4, "Lembas Bread", "Even the smallest bite can fill your stomach for days.");
var gollum = new item(5, "Gollum", "How can you be sure he'll be true to you?");
var faramir = new item(6, "Faramir", "")
//locations
var the shire = new location(0, "The Shire", "5. Frodo- you must leave the shire immediately... The Black Riders are following close behind!","5. You must not wear the ring or they will see you!", Ring);
var weathertop = new location(1, "Weathertop", "A Black Rider has followed you! Don't put on the ring!","They sense that you're wearing the ring!", Mithril Armor);
var rivendale = new location(2, "Rivendale", "The Council of Elrond is meeting, go! Discuss your future.","At least Bilbo understands...", Sting Sword);
var mines moria = new location(3, "Mines of Moria", "Doors of During: Speal friend, and enter."," Are you sure you want to enter this treacherous tomb?", Orcs Finger);
var lothlorien = new location(4, "Elven Kingdom of Lothlorien","Ah! I think Lady Galadriel has a few gifts for you.","Can you speak Elvish? Are you sur eyo're worth of these gifts?",Lembas Bread);
var amon hen = new location(5, "Amon Hen","The ring is yours Frodo... do not be fooled by Boromir.","Leave! The orcs are coming- travel to Mordor at last!",Small Ship);
var emyn muil and dead marshes = new location(6, "Emyn Muil and Dead Marshes","Do you hear someone or someTHING behind you?","Sam, what's that?!", Gollum);
var black gate = new location(7, "Black Gate","You cannot simply charge the gate. Head towards Ithilien.","You've been stopped in Gondor by Boromir's brother!", Faramir);
var tower cirith ungol = new location(8, "Tower of Cirith Ungol","Follow Gollum up the steps of the tower...", "Watch out!", Giant Spider Shelob Web);
var mordor = new location(9, "Mordor","You're so close to Mount Doom... If only there was some nourishment.","Quick! Gollum is trying to steal the ring from you!", Small Knife);
var mount doom = new locatoin(10, "Mount Doom","The Eye of Sauron is watching you. Get Gollum out of the way!","You're finally free of the ring, Frodo!", Friends);

var inventory = [null,null,null,null];

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
	visitRoom();
}
function south(){
	currentLocation = map[currentLocation][1];
	visitRoom();
}
function east(){
	currentLocation = map[currentLocation][2];
	visitRoom();
}
function west(){
	currentLocation = map[currentLocation][3];
	visitRoom();
}

function visitRoom(){
	var site = locations[currentLocation];
	var message = site.desc;

	if(site.visited == false){
		score +=5;
		site.visited = true;
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

function take(){
	//get our current location
	var site = locations[currentLocation];
	//if theres no item, tell the player!
	if(site.item == null){
		writeText("There's no item to take Anthony!");
	}
	else{
		var item = site.item;
		//add item to inventory
		inventory[item.id]=item;
		//remove item from location
		site.item=null;
		//change site description to reflect the item is gone!
		site.desc=site.descAfter;
		writeText("You recieve: "+item.name);
	}

}

function displayInventory(){
	var message = "Inventory list: \n";
	for(var i = 0; i < inventory.length-1; i++) {
		if(inventory[i] != null){
			message+=inventory[i].name+"   "+inventory[i].desc + "\n";
		}
	}

	writeText(message);
}
 // Writes to the text area
function writeText(msg) {
	document.getElementById("display").value="\n"+msg+"\n Score: "+score+"\n"+document.getElementById("display").value;
 }