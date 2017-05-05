function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
 
function retrieveUserInformation(id, cookie){
    var storedFirstname = readCookie(cookie);
    if (storedFirstname) {
        document.querySelector(id).value = storedFirstname;
    }
} 

function storeUserInformation(id,cookie){
    document.querySelector(id).addEventListener('keyup',function(){
        createCookie(cookie, this.value, 60);
    });  
} 

function retrieveAndStoreUserInformation(id,cookie){
    retrieveUserInformation(id, cookie);
    storeUserInformation(id, cookie);
}

function deleteUserInformation(form, cookie){
    document.querySelector("#userInformation").addEventListener('submit',function(){
        eraseCookie(cookie);
    });
}

function refresh(){
    document.querySelector("#reset").addEventListener('click',function(){
         location.reload();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // retriev stored userinformations
    retrieveUserInformation("#firstname", "firstname"); 
    
    // store cookies
    storeUserInformation("#firstname", "firstname") ;
        
    // retriev and store cookies - shorter one line version
    retrieveAndStoreUserInformation("#lastname", "lastname");

    // delete cookies
    deleteUserInformation("#userInformation", "firstname");
    deleteUserInformation("#userInformation", "lastname");
    
    refresh();
});