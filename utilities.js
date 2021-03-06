function locale(id, name, desc, descAfter, item) {
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
//locales
var theShire = new locale(0, "The Shire", " Frodo- you must leave the shire immediately... The Black Riders are following close behind! Take The Ring on the table."," Frodo- you must leave the shire immediately... The Black Riders are following close behind! The ring is no longer on the table, but in your pocket.", ring);
var weathertop = new locale(1, "Weathertop", "A Black Rider has followed you! Don't put on the ring! Look behind the boulder for armor.","They sense that you're wearing the ring! You're now wearing the armor.", mithrilArmor);
var rivendale = new locale(2, "Rivendale", "The Council of Elrond is meeting, go! Discuss your future and take this gift.","At least Bilbo understands... Now you have the sword in your inventory.", stingSword);
var minesMoria = new locale(3, "Mines of Moria", "Doors of Durin: Speak friend, and enter. You've earned and orcs finger for entering.","Do you dare enter this treacherous tomb? Check your inventory- you have earned an orcs finger.", orcsFinger);
var lothlorien = new locale(4, "Elven Kingdom of Lothlorien","Ah! I think Lady Galadriel has a few gifts for you.","Can you speak Elvish? Are you sur you're worthy of these gifts?", lembasBread);
var amonHen = new locale(5, "Amon Hen","The ring is yours Frodo... do not be fooled by Boromir.","Leave! The orcs are coming- travel to Mordor at last!",null);
var deadMarshes = new locale(6, "Emyn Muil and Dead Marshes","Do you hear someone or someTHING behind you? Take it hostage.","Sam, what's that in your inventory?!", gollum);
var tower = new locale(7, "Tower of Cirith Ungol","Follow Gollum up the steps of the tower...", "Watch out!", null);
var mordor = new locale(8, "Mordor","You're so close to Mount Doom... If only there was some nourishment. Take this last token for your final defense.","Quick! Gollum is trying to steal the ring from you! Use your knife from your inventory!", smallKnife);
var mountDoom = new locale(9, "Mount Doom","The Eye of Sauron is watching you. Get Gollum out of the way! Your friends are waiting for you to take them!","You're finally free of the ring, Frodo! Look, everyone is alive and well.", friends);

var inventory = [null,null,null,null,null,null,null,null];

var lastLocale = null;

	var x = 1;
	var y = 1;

	var map=[			[-1,-1,-1, -1,-1,-1,-1,-1],
						[-1,  0, 1, 2,-1,-1,-1,-1],
						[-1, -1,-1, 3, 4, 6, 7,-1],
					    [-1, -1,-1,-1, 5,-1, 8,-1],
					    [-1, -1,-1,-1,-1,-1, 9,-1],
					    [-1, -1,-1,-1,-1,-1, -1,-1]

			];
					    						
				// 0    1       2
var locales = [theShire,weathertop,rivendale,minesMoria,lothlorien,amonHen,deadMarshes,tower,mordor,mountDoom];
//direction to travel
var direction = 0;
//holds current locale
var currentlocale = 0;

function north(){
	if(map[y-1][x] != -1){
		y-=1;
	}
	visitRoom();
}
function south(){
	if(map[y+1][x] != -1 && map[y+1][x] != 9 && map[y+1][x] != 3){
		y+=1;
	}
	else if(map[y+1][x] == 9){

		//check to make sure they have all items except friends
		if(inventory[0] != null && inventory[1] != null && inventory[2] != null && inventory[3] != null && inventory[4] != null && inventory[5] != null && inventory[6] != null){
			y+=1;
		}
		else{
			writeText("You can't face Gollum at Mt Doom without all your items, return to the other locations to find them!");
		}
	}
	else if(map[y+1][x] == 3){
		//check to make sure they have all items except friends
		if(inventory[1] != null){
			y+=1;
		}
		else{
			writeText("You can't go into the Mines of Moria without armor. Go back and find it!");
		}
	}
	visitRoom();
}
function east(){
	if(map[y][x+1] != -1){
		x+=1;
	}
	visitRoom();
}
function west(){
	if(map[y][x-1] != -1){
		x-=1;
	}
	visitRoom();
}

function visitRoom(){
	if(inventory[7]== null){
		currentlocale=map[y][x];
		var site = locales[currentlocale];
		var message =null;

		if(site == lastLocale){
			message = "You can't move that way, Frodo!";
		}else{
			message = site.name +": "+site.desc;
		}

		if(site.visited == false){
			score +=5;
			site.visited = true;
		}
		//button disable code :)
		document.getElementById('north').disabled = false;
	    document.getElementById('east').disabled = false;
	    document.getElementById('south').disabled = false;
	    document.getElementById('west').disabled = false;

		if(map[y-1][x] == -1){
			document.getElementById('north').disabled = true;
		}
		if(map[y+1][x] == -1){
			document.getElementById('south').disabled = true;
		}
		if(map[y][x+1] == -1){
			document.getElementById('east').disabled = true;
		}
		if(map[y][x-1] == -1){
			document.getElementById('west').disabled = true;
		}

		writeText(message);
		lastLocale = site;
	}
	else{
	    endgame();
	}
}

function take(){
	//get our current locale
	var site = locales[currentlocale];
	//if theres no item, tell the player!
	if(site.item == null){
		writeText("There's no item to take Frodo!");
	}
	else if(site.item==friends){
		endgame();
	}
	else{
		var item = site.item;
		//add item to inventory
		inventory[item.id]=item;
		//remove item from locale
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
			message+=inventory[i].name+": "+inventory[i].desc + "\n";
		}
	}

	writeText(message);
}
function help(){
	var message = "N or North: To go North \n S or South: To go North \n E or East: To go East \n W or West: To go West \n T or Take: To take an object \n I or Inventory: To check inventory list";
	

	writeText(message);
}
 // Writes to the text area
function writeText(msg) {
	document.getElementById("display").value="\n"+msg+"\n Score: "+score+"\n"+document.getElementById("display").value;
 }

  // Writes to the text area
function endgame() {
	document.getElementById('north').disabled = true;
	document.getElementById('east').disabled = true;
	document.getElementById('south').disabled = true;
	document.getElementById('west').disabled = true;
	document.getElementById("display").value="YOU WIN! \nYou got your friends back and completed your journey. You head back to the shire and live a long life! Your Score: "+score+"\n";
 }