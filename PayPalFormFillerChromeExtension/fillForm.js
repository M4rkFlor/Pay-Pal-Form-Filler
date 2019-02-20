(function() {
    var fakePerson = {
        id: "fakePerson",  
        Card_number: "",   
        Expires: "",  
        CSC: "",           
        First_Name: "",    
        Last_Name: "",     
        Street_Address: "",
        City: "",          
        State: "",         
        Zip_Code: "",      
        Phone_Number: "",  
        Email: ""
    }
let personDiv = document.querySelector('#fakePerson');
fakePerson.Card_number = personDiv.getAttribute("Card_number");
fakePerson.Expires = personDiv.getAttribute("Expires");
fakePerson.CSC = personDiv.getAttribute("CSC");
fakePerson.First_Name = personDiv.getAttribute("First_Name");
fakePerson.Last_Name = personDiv.getAttribute("Last_Name");
fakePerson.Street_Address = personDiv.getAttribute("Street_Address");
fakePerson.City = personDiv.getAttribute("City");
fakePerson.State = personDiv.getAttribute("State");
fakePerson.Zip_Code = personDiv.getAttribute("Zip_Code");
fakePerson.Phone_Number = personDiv.getAttribute("Phone_Number");
fakePerson.Email = personDiv.getAttribute("Email");
Inject();
function Inject(){
    angular.element(document.querySelector("#cc")).val(fakePerson.Card_number).trigger('input');
    angular.element(document.querySelector("#expiry_value")).val(fakePerson.Expires).trigger('input');
    angular.element(document.querySelector("#cvv")).val(fakePerson.CSC).trigger('input');
    angular.element(document.querySelector("#firstName")).val(fakePerson.First_Name).trigger('input');
    angular.element(document.querySelector("#lastName")).val(fakePerson.Last_Name).trigger('input');
    angular.element(document.querySelector("#billingLine1")).val(fakePerson.Street_Address).trigger('input');
    angular.element(document.querySelector("#billingCity")).val(fakePerson.City).trigger('input');
    angular.element(document.querySelector("#billingState")).val("string:"+ fakePerson.State).trigger('change');
    angular.element(document.querySelector("#billingPostalCode")).val(fakePerson.Zip_Code).trigger('input');
    angular.element(document.querySelector("#telephone")).val(fakePerson.Phone_Number).trigger('input');
    angular.element(document.querySelector("#email")).val(fakePerson.Email).trigger('input');
    angular.element(document.querySelector("#guestSignup2")).prop('checked', true).trigger('click');//`change`
}
})();