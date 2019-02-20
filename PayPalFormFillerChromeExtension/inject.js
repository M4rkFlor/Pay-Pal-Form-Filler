(function() {
let HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
let client = new HttpClient();
client.get("https://www.fakenamegenerator.com/gen-random-us-us.php", function(response) {
let re = /(\d{4}( )){3}\d{4}/g;
fakePerson.Card_number = response.match(re)[0];//remove spaces?
re = /(?<=<dd>)(\d{1,2})\/(\d{4})(?=<\/dd>)/g;
let unformatedExpireDate = response.match(re)[0];
let ExpireDate="";
for( let i=0; i<unformatedExpireDate.length; i++)
{
    let c = unformatedExpireDate.substring(i,i+1);
    if(c==='/')
    {
        i+=2;
    }
    else{
        ExpireDate += c;
    }
}
if(ExpireDate.length===3)
ExpireDate = "0" + ExpireDate;
fakePerson.Expires = ExpireDate;//toInt32?
re = /(?<=<dd>)\d{3}(?=<\/dd>)/g;
fakePerson.CSC = response.match(re)[0];
re = /(?<=<h3>)[a-zA-Z]+ [a-zA-Z]+.? [a-zA-Z]+(?=<\/h3>)/g;
let fullName = response.match(re)[0];
let FirstName = "";
let LastName = "";
let readFirstName = true;
for( let i=0; i<fullName.length; i++)
{
    let c = fullName.substring(i,i+1);
    if(c===' ')
    {
        i+=3;
        readFirstName=false;
    }
    else{
        if(readFirstName)
        FirstName += c;
        else
        LastName += c;
    }
}
fakePerson.First_Name = FirstName;
fakePerson.Last_Name = LastName;
re = /(?<=<div class="adr">\n( )+)\d+( [a-zA-Z]+)+(?=<br)/g;
fakePerson.Street_Address = response.match(re)[0]; //Null?
re = /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>))[a-zA-z]+( [a-zA-z]+)?(?=,)/g
fakePerson.City = response.match(re)[0];
re = /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>)[a-zA-z]+( [a-zA-z]+)?, )[A-Z]{2}(?= \d+)/g
fakePerson.State = response.match(re)[0];
re = /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>)[a-zA-z]+( [a-zA-z]+)?, [A-Z]{2} )\d+(?= +<\/div>)/g
fakePerson.Zip_Code = response.match(re)[0];
re = /(?<=<dd>)\d+-\d+-\d+(?=<\/dd>)/g
fakePerson.Phone_Number = response.match(re)[0];
re = /(?<=<dd>)\w+@\w+\.[a-zA-Z]+(?=)/g
fakePerson.Email = response.match(re)[0];
Inject();
});
var fakePerson = {
    id: "fakePerson",       // id to reference div
    Card_number: "",        //  regEx: /(\d{4}( )){3}\d{4}/g 
    Expires: "MM/YY",       //  regEx: /(?<=<dd>)(\d{1,2})\/(\d{4})(?=<\/dd>)/g     currently returns 12/2021 needs MM/YY
    CSC: "",                //  regEx: /(?<=<dd>)\d{3}(?=<\/dd>)/g
    First_Name: "",         //  regEx(fullName): /(?<=<h3>)[a-zA-Z]+ [a-zA-Z]+.? [a-zA-Z]+(?=<\/h3>)/g
    Last_Name: "",          
    Street_Address: "",     //  regEx: /(?<=<div class="adr">\n( )+)\d+( [a-zA-Z]+)+(?=<br)/g;
    City: "",               //  regEx: /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>))[a-zA-z]+( [a-zA-z]+)?(?=,)/g
    State: "",              //  regEx: /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>)[a-zA-z]+( [a-zA-z]+)?, )[A-Z]{2}(?= \d+)/g
    Zip_Code: "",           //  regEx: /(?<=<div class="adr">\n( )+\d+ [a-zA-Z]+ [a-zA-Z]+(<br>)|(<br \/>)[a-zA-z]+( [a-zA-z]+)?, [A-Z]{2} )\d+(?= +<\/div>)/g
    Phone_Number: "",       //  regEx: /(?<=<dd>)\d+-\d+-\d+(?=<\/dd>)/g
    Email: ""               //  regEx:/(?<=<dd>)\w+@\w+\.[a-zA-Z]+(?=)/g
    //'No I dont Want an account' needs to be checked
}
function Inject(){
    let th = document.getElementsByTagName('body')[0];
    let personDiv = document.createElement("div"); //pasing atributes as an construtor dosent work >.<
    personDiv.setAttribute("id",fakePerson.id);
    personDiv.setAttribute("Card_number",fakePerson.Card_number);
    personDiv.setAttribute("Expires",fakePerson.Expires);
    personDiv.setAttribute("CSC",fakePerson.CSC);
    personDiv.setAttribute("First_Name",fakePerson.First_Name);
    personDiv.setAttribute("Last_Name",fakePerson.Last_Name);
    personDiv.setAttribute("Street_Address",fakePerson.Street_Address);
    personDiv.setAttribute("City",fakePerson.City);
    personDiv.setAttribute("State",fakePerson.State);
    personDiv.setAttribute("Zip_Code",fakePerson.Zip_Code);
    personDiv.setAttribute("Phone_Number",fakePerson.Phone_Number);
    personDiv.setAttribute("Email",fakePerson.Email);
    let file = chrome.extension.getURL('fillForm.js');
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(personDiv);
    th.appendChild(s);
}
})();