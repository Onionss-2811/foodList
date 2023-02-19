const materialNameInputElement = document.getElementById("materialName");
const messageMaterialNameNullElement = document.getElementById("messageMaterialNameNull");
const messageMaterialNameAlreadyDefineElement = document.getElementById("messageMaterialNameAlreadyDefine");

const foodNameInputElement = document.getElementById("foodName");
const messageFoodNameNullElement = document.getElementById("messageFoodNameNull");
const messageFoodNameAlreadyDefineElement = document.getElementById("messageFoodNameAlreadyDefine");

const quantityInputElement = document.getElementById("quantity");
const messageQuantityInputNullElement = document.getElementById("messageQuantityNull");

const priceInputElement = document.getElementById("price");
const messagePriceNullElement = document.getElementById("messagePriceNull");

const unitInputElement = document.getElementById("unit");
const messageUnitNullElement = document.getElementById("messageUnitNull");

const descriptionInputElement = document.getElementById("description");
const messageDescriptionNullElement = document.getElementById("messageDescriptionNull");

const selectMaterialElement = document.getElementById("selectMaterial");
const messageMaterialNotFoundElement = document.getElementById("messageMaterialNotFound");
const messageNotSelectMaterialElement = document.getElementById("messageNotSelectMaterial");

const messageNotDataIsMaterialListElement = document.getElementById("messageNotDataIsMaterialList");
const messageNotDataIsFoodListElement = document.getElementById("messageNotDataIsFoodList");

const buttonAddMaterialElement = document.getElementById("btnAddMaterial");
const buttonAddFoodElement = document.getElementById("btnAddFood");
const buttonOpenModalAddFoodElement = document.getElementById("btnOpenModalAddFood");

const regexName = /[^ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]/g;
const regexDescription = /[^ a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]/g;

let listFood = [];
let listMaterial = [];
let thTableFood = ["Name", "Price", "Description", "Material", "Action"];
let thTableMaterial = ["Name", "Quanlity", "Unit", "Action"];

materialNameInputElement.addEventListener("blur", validateMaterialName);
materialNameInputElement.addEventListener("input", removeMessageMaterialName);

foodNameInputElement.addEventListener("blur", validateFoodName);
foodNameInputElement.addEventListener("input", removeMessageFoodName);

quantityInputElement.addEventListener("blur", validateQuanlity);
quantityInputElement.addEventListener("input", removeMessageQuanlity);

priceInputElement.addEventListener("blur", validatePrice);
priceInputElement.addEventListener("input", removeMessagePrice);

unitInputElement.addEventListener("blur", validateUnit);
unitInputElement.addEventListener("input", removeMessageUnit);

descriptionInputElement.addEventListener("blur", validateDescription);
descriptionInputElement.addEventListener("input", removeMessageDescription);

selectMaterialElement.addEventListener("click", removeMessageMaterial)

buttonAddMaterialElement.addEventListener("click", addMaterial);
buttonAddFoodElement.addEventListener("click", addFood);
buttonOpenModalAddFoodElement.addEventListener("click", genSelectMaterial);

processGenTableMaterial();
processGenTableFood();

// Material Name
function validateMaterialName() {
    if (materialNameInputElement.value.trim() == "") {
        buttonAddMaterialElement.disabled = true;
         messageMaterialNameAlreadyDefineElement.classList.add("d-none");
        messageMaterialNameNullElement.classList.remove("d-none")
        materialNameInputElement.value = null;
        materialNameInputElement.focus();
        return false;
    }
    for (let index = 0; index < listMaterial.length; index++) {
        const element = listMaterial[index];
        if (materialNameInputElement.value == element.materialName) {
            buttonAddMaterialElement.disabled = true;
            messageMaterialNameAlreadyDefineElement.classList.remove("d-none")
            materialNameInputElement.value = null;
            materialNameInputElement.focus();
            return false;
        }
    }
    return true;
}

function removeMessageMaterialName() {
    materialNameInputElement.value = materialNameInputElement.value.replace(regexName, "");
    buttonAddMaterialElement.disabled = false;
    messageMaterialNameNullElement.classList.add("d-none");
    messageMaterialNameAlreadyDefineElement.classList.add("d-none");
}

// Food Name
function validateFoodName() {
    if (foodNameInputElement.value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messageFoodNameAlreadyDefineElement.classList.add("d-none");
        messageFoodNameNullElement.classList.remove("d-none")
        foodNameInputElement.value = null;
        foodNameInputElement.focus();
        return false;
    }
    for (let index = 0; index < listFood.length; index++) {
        const element = listFood[index];
        if (foodNameInputElement.value == element.foodName) {
            buttonAddFoodElement.disabled = true;
            messageFoodNameAlreadyDefineElement.classList.remove("d-none")
            foodNameInputElement.value = null;
            foodNameInputElement.focus();
            return false;
        }
    }
    return true;
}

function removeMessageFoodName() {
    foodNameInputElement.value = foodNameInputElement.value.replace(regexName, "");
    buttonAddFoodElement.disabled = false;
    messageFoodNameNullElement.classList.add("d-none");
    messageFoodNameAlreadyDefineElement.classList.add("d-none");
}

// Quantity
function validateQuanlity() {
    if (quantityInputElement.value.trim() == "") {
        buttonAddMaterialElement.disabled = true;
        messageQuantityInputNullElement.classList.remove("d-none")
        quantityInputElement.value = null;
        quantityInputElement.focus();
        return false;
    }
    return true;
}

function removeMessageQuanlity() {
    buttonAddMaterialElement.disabled = false;
    messageQuantityInputNullElement.classList.add("d-none")
}

// Price
function validatePrice() {
    if (priceInputElement.value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messagePriceNullElement.classList.remove("d-none")
        priceInputElement.value = null;
        priceInputElement.focus();
        return false;
    }
    return true;
}

function removeMessagePrice() {
    buttonAddFoodElement.disabled = false;
    messagePriceNullElement.classList.add("d-none")
}

// Unit
function validateUnit() {
    if (unitInputElement.value.trim() == "") {
        buttonAddMaterialElement.disabled = true;
        messageUnitNullElement.classList.remove("d-none")
        unitInputElement.value = null;
        unitInputElement.focus();
        return false;
    }
    return true;
}

function removeMessageUnit() {
    unitInputElement.value = unitInputElement.value.replace(regexName, "");
    buttonAddMaterialElement.disabled = false;
    messageUnitNullElement.classList.add("d-none")
}

// Description
function validateDescription() {
    if (descriptionInputElement.value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messageDescriptionNullElement.classList.remove("d-none")
        descriptionInputElement.value = null;
        descriptionInputElement.focus();
        return false;
    }
    return true;
}

function removeMessageDescription() {
    descriptionInputElement.value = descriptionInputElement.value.replace(regexDescription, "");
    buttonAddFoodElement.disabled = false;
    messageDescriptionNullElement.classList.add("d-none")
}
// 
// Material
function validateMaterial() {
    let checkedValue = []; 
    let checkboxElements = document.getElementsByClassName('checkboxMaterial');
    for (let index = 0; index < checkboxElements.length; index++) {
        if(checkboxElements[index].checked){
            checkedValue.push(checkboxElements[index].value);
        }
    }
    if (document.getElementById("materialSelect") == null) {
        messageMaterialNotFoundElement.classList.add("text-danger")
        buttonAddFoodElement.disabled = true;
        return false;
    }
    if (checkedValue.length == 0) {
        console.log("process");
        messageNotSelectMaterialElement.classList.remove("d-none")
        buttonAddFoodElement.disabled = true;
        return false;
    }
    return true;
}

function removeMessageMaterial() {
    buttonAddFoodElement.disabled = false;
    messageNotSelectMaterialElement.classList.add("d-none")
}

//
function genSelectMaterial() {
    if (listMaterial.length == 0) {
        if (document.getElementById("materialSelect") != null) {
            document.getElementById("materialSelect").remove();
        }
        messageMaterialNotFoundElement.classList.remove("d-none")
    } else{
        messageMaterialNotFoundElement.classList.add("d-none")
        genOptionMaterial();
    }
};

function genOptionMaterial(){
    if (document.getElementById("materialSelect") != null) {
        document.getElementById("materialSelect").remove();
    }

    let div = document.createElement("div");
    div.setAttribute("id", "materialSelect");
    document.getElementById("selectMaterial").appendChild(div); 

    for (let index = 0; index < listMaterial.length; index++) {
        const element = listMaterial[index];
        let checkbox = document.createElement("input");
        checkbox.setAttribute("value", element.materialName);
        checkbox.setAttribute("name", element.materialName);
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "ms-3 checkboxMaterial");

        let label = document.createElement("label");
        label.innerText = element.materialName;
        label.setAttribute("class", "ms-1");
        document.getElementById("materialSelect").appendChild(checkbox); 
        document.getElementById("materialSelect").appendChild(label); 
    }
}

// 
function processGenTableMaterial() {
    if (listMaterial.length == 0) {
        if (document.getElementById("tblMaterial") != null) {
            document.getElementById("tblMaterial").remove();
        }
        messageNotDataIsMaterialListElement.classList.remove("d-none");
    }
    else{
        messageNotDataIsMaterialListElement.classList.add("d-none");
        genTableMaterial();
    }
}

function genTableMaterial() {

    if (document.getElementById("tblMaterial") != null) {
        document.getElementById("tblMaterial").remove();
    }

    let tbl = document.createElement("table");
    tbl.setAttribute("class", "table table-striped table-hover");
    tbl.setAttribute("id", "tblMaterial");
    document.getElementById("materialTable").appendChild(tbl);

    let thead = tbl.createTHead();
    let tbody = tbl.createTBody();
    let rowHead = thead.insertRow();
    for (let key of thTableMaterial) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        rowHead.appendChild(th);
      }

      for (let element of listMaterial) {
        let rowBody = tbody.insertRow();
        for (key in element) {
          let cell = rowBody.insertCell();
          cell.setAttribute("class", "text-center");
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
        let cellAction = rowBody.insertCell();
        let btnDeleteMaterial = document.createElement("button");
        btnDeleteMaterial.innerText = "Delete";
        btnDeleteMaterial.setAttribute("class", "btn btn-danger btn-sm");
        btnDeleteMaterial.setAttribute("onclick","deleteElementMaterial('"+element.materialName+"')");
        cellAction.appendChild(btnDeleteMaterial);
      }
}

function deleteElementMaterial(name) {
    if (confirm("Are you sure you want to delete this material?") == true) {
        for (let index = 0; index < listMaterial.length; index++) {
            const element = listMaterial[index].materialName;
            if (name == element) {
                listMaterial.splice(index, 1);
                processGenTableMaterial();
                genSelectMaterial();
            }
        }
    }
}

// 
function processGenTableFood() {
    if (listFood.length == 0) {
        if (document.getElementById("tblFood") != null) {
            document.getElementById("tblFood").remove();
        }
        messageNotDataIsFoodListElement.classList.remove("d-none");
    }
    else{
        messageNotDataIsFoodListElement.classList.add("d-none");
        genTableFood();
    }
}

function genTableFood() {

    if (document.getElementById("tblFood") != null) {
        document.getElementById("tblFood").remove();
    }

    let tbl = document.createElement("table");
    tbl.setAttribute("class", "table table-striped table-hover");
    tbl.setAttribute("id", "tblFood");
    document.getElementById("foodTable").appendChild(tbl);

    let thead = tbl.createTHead();
    let tbody = tbl.createTBody();
    let rowHead = thead.insertRow();
    for (let key of thTableFood) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        rowHead.appendChild(th);
      }

      for (let element of listFood) {
        let rowBody = tbody.insertRow();
        for (key in element) {
          let cell = rowBody.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
        let cellAction = rowBody.insertCell();
        let btnDeleteFood = document.createElement("button");
        btnDeleteFood.innerText = "Delete";
        btnDeleteFood.setAttribute("class", "btn btn-danger btn-sm");
        btnDeleteFood.setAttribute("onclick","deleteElementFood('"+element.foodName+"')");
        cellAction.appendChild(btnDeleteFood);
      }
}

function deleteElementFood(name) {
    if (confirm("Are you sure you want to delete this dish?") == true) {
        for (let index = 0; index < listFood.length; index++) {
            const element = listFood[index].foodName;
            if (name == element) {
                listFood.splice(index, 1);
                console.log(listFood);
                processGenTableFood();
            }
        }
    }
}

// 
function addMaterial() {
    if (!validateMaterialName()) {
        return false;
    }
    if (!validateQuanlity()) {
        return false;
    }
    if (!validateUnit()) {
        return false;
    }

    let materialElement = {
        materialName: materialNameInputElement.value,
        quantity: quantityInputElement.value,
        unit: unitInputElement.value,
    }

    listMaterial.push(materialElement);

    materialNameInputElement.value = null;
    quantityInputElement.value = null;
    unitInputElement.value = null;
    processGenTableMaterial();
    $('#ModalAddMaterial').modal('toggle');
}

// 
function addFood() {
    if (!validateFoodName()) {
        return false;
    }
    if (!validatePrice()) {
        return false;
    }
    if (!validateDescription()) {
        return false;
    }
    if (!validateMaterial()) {
        return false;
    }

    let checkedValue = []; 
    let checkboxElements = document.getElementsByClassName('checkboxMaterial');
    for (let index = 0; index < checkboxElements.length; index++) {
        if(checkboxElements[index].checked){
            checkedValue.push(checkboxElements[index].value);
        }
    }

    let foodElement = {
        foodName: foodNameInputElement.value,
        price: priceInputElement.value,
        description: descriptionInputElement.value,
        material: checkedValue
    }

    listFood.push(foodElement);

    foodNameInputElement.value = null;
    priceInputElement.value = null;
    descriptionInputElement.value = null;
    processGenTableFood();
    $('#ModalAddFood').modal('toggle');
}

