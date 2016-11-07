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
var mithrilArmor = new item(1, "Mithril Armor", "I feel invincible, thanks Bilbo.");
var stingSword = new item(2, "Sting Sword", "This glows when orcs are nearby.");
var orcsFinger = new item(3, "Orcs Finger", "A trophy for enduring the pain.");
var lembasBread = new item(4, "Lembas Bread", "Even the smallest bite can fill your stomach for days.");
var gollum = new item(5, "Gollum", "How can you be sure he'll be true to you?");
var smallKnife = new item(6, "Small Knife", "For anyone that gets in your way from now on...");
var friends = new item(7, "Friends", "Alas Reunited with your loved ones!");
//locations
var theShire = new location(0, "The Shire", "5. Frodo- you must leave the shire immediately... The Black Riders are following close behind!","5. You must not wear the ring or they will see you!", ring);
var weathertop = new location(1, "Weathertop", "A Black Rider has followed you! Don't put on the ring!","They sense that you're wearing the ring!", mithrilArmor);
var rivendale = new location(2, "Rivendale", "The Council of Elrond is meeting, go! Discuss your future.","At least Bilbo understands...", stingSword);
var minesMoria = new location(3, "Mines of Moria", "Doors of During: Speal friend, and enter."," Are you sure you want to enter this treacherous tomb?", orcsFinger);
var lothlorien = new location(4, "Elven Kingdom of Lothlorien","Ah! I think Lady Galadriel has a few gifts for you.","Can you speak Elvish? Are you sur eyo're worth of these gifts?", lembasBread);
var amonHen = new location(5, "Amon Hen","The ring is yours Frodo... do not be fooled by Boromir.","Leave! The orcs are coming- travel to Mordor at last!",null);
var deadMarshes = new location(6, "Emyn Muil and Dead Marshes","Do you hear someone or someTHING behind you?","Sam, what's that?!", gollum);
var tower = new location(7, "Tower of Cirith Ungol","Follow Gollum up the steps of the tower...", "Watch out!", null);
var mordor = new location(8, "Mordor","You're so close to Mount Doom... If only there was some nourishment.","Quick! Gollum is trying to steal the ring from you!", smallKnife);
var mountDoom = new locatoin(9, "Mount Doom","The Eye of Sauron is watching you. Get Gollum out of the way!","You're finally free of the ring, Frodo!", friends);

var inventory = [null,null,null,null,null,null,null,null];

var map = [
				          //n  s  e  w 
/*loc0 aka the shire*/    [0, 0, 1, 0],
/*loc1 aka weathertop*/   [1, 1, 2, 0],
/*loc2 aka rivendale*/    [2, 3, 2, 1],
/*loc3 aka mines moria*/  [2, 3, 4, 3],
/*loc4 aka lothlorien*/   [4, 5, 6, 4],
/*loc5 aka amon hen*/     [4, 5, 6, 5],
/*loc6 aka dead marshes*/ [6, 6, 7, 4],
/*loc7 aka tower*/        [7, 8, 7, 6],
/*loc8 aka mordor*/       [7, 8, 8, 9],
/*loc9 aka mount doom*/   [9, 9, 8, 9]

];
				// 0    1       2
var locations = [theShire,waethertop,rivendale,minesMoria,lothlorien,amonHen,deadMarshes,tower,mordor,mountDoom];
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
		writeText("There's no item to take Frodo!");
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