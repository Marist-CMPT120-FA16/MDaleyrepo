function location(id, name, desc, descAfter, item) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.descAfter = descAfter;
		this.item = item;

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

var locations = [river,hancock,gym];
//direction to travel
var x = 0;
//holds current location
var y = 0;

