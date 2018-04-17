var form = document.getElementById("form");
var startAdding = document.getElementById("startAdding");
var addressBook = [];

function showForm() {
    form.style.display = "block"
    startAdding.style.display = "none"
};

function hideForm() {
   form.style.display = "none"
};


function Contact(name,number,email) {
    this.name = name;
    this.number = number;
    this.email = email;
};

function addContact(){
    event.preventDefault();

    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
        
    var newContact = new Contact(name,number,email);

    addressBook.push(newContact);
    localStorage.setItem('addressBook', JSON.stringify(addressBook));

    clearForm();
    showAddressBook();
    startAdding.innerHTML = "Continue adding"
    startAdding.style.display = "block"

};

function clearForm() {
    var formFields = document.querySelectorAll(".form-control");

    for (var i = 0; i < formFields.length; i++) {
         formFields[i].value = "";
    }
};

function loadAddress() {
    /*if(JSON.parse(localStorage.getItem('addressBook'))) {
        return alert(JSON.parse(localStorage.getItem('addressBook')))
    }*/
    console.log('loaded')
}


function showAddressBook(){
    var form = document.getElementById("form");
    var addressBookList = document.getElementById("addressBookList");
    var homeDtl = document.getElementById("homeDtl");
    
    form.style.display = "none";
    addressBookList.style.display = "block";
        
    addressBookList.innerHTML = '';
    var element = '<div class="">';
    element += '<h1 class="">Contacts</h1>';
    for(var n = 0; n < addressBook.length; n++){
        element += '<div class="row">'
        element += '<div class="col-sm-3"><a class="addressName" id="nameID" data-id="' + n + '" onclick="viewContact()">' + addressBook[n].name + '</a></div>';
        element += '<div class="col-sm-3"><button class="btn btn-danger b1" id="deleteContact" onclick="deleteContact()" data-id="' + n + '">Delete</button><button class="btn btn-primary b1" id="editBtn" onclick="editContact()" data-id="' + n + '">Edit</button></div>';
        element += '</div>'; /* .row */
    }
        
    element += '</div>';

    addressBookList.innerHTML += element;
};

function viewContact() {
    var nameID = document.getElementById("nameID");
    var fullView = document.getElementById("fullView");
    var datID = nameID.dataset.id;
    
    console.log(datID);

    var show = '<div class="view">';

    show += '<h1 class="text-uppercase h1"><strong>Contact details</strong></h1><br />';
    show += `<p> Name: ${addressBook[datID].name}<br/> Phone Number: ${addressBook[datID].number}<br/> Email: ${addressBook[datID].email}</p>`;
    show += '<button class="btn btn-primary margin-left" id="backBtn" onclick="showAddressBook()">Back to Contacts</button>';
    show += '</div>';
    
    fullView.innerHTML += show;
};

function deleteContact() {
    var deleteContact = document.getElementById("deleteContact");
    var itemID = deleteContact.dataset.id;

    alert("Warning: Deleted contacts are lost forever");
    addressBook.splice(itemID, 1);
    showAddressBook();
};

function editContact() {
    var editBtn = document.getElementById("editBtn");
    var dataID = editBtn.getAttribute("data-id");

    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
   
    console.log(dataID)
    showForm();
    addressBookList.style.display = "none";
};