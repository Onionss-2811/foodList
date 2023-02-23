const foodNameInputElement = document.getElementById("foodName");
const messageFoodNameNullElement = document.getElementById("messageFoodNameNull");
const messageFoodNameAlreadyDefineElement = document.getElementById("messageFoodNameAlreadyDefine");

const priceInputElement = document.getElementById("price");
const messagePriceNullElement = document.getElementById("messagePriceNull");

const descriptionInputElement = document.getElementById("description");
const messageDescriptionNullElement = document.getElementById("messageDescriptionNull");

const fromMaterialElement = document.getElementById("selectMaterial");
const messageNotAddMaterialElement = document.getElementById("messageNotAddMaterial");
const messageNameMaterialNullElement = document.getElementById("messageNameMaterialNull");
const messageQuantityMaterialNullElement = document.getElementById("messageQuantityMaterialNull");
const messageUnitMaterialNullElement = document.getElementById("messageUnitMaterialNull");

let nameMaterialElement;
let quantityMaterialElement;
let unitMaterialElement;

const messageNotDataIsFoodListElement = document.getElementById("messageNotDataIsFoodList");

const buttonAddFoodElement = document.getElementById("btnAddFood");
const buttonAddMaterialElement = document.getElementById("btnAddMaterial");

const regexName = /[^ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]/g;
const regexDescription = /[^ a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]/g;

let listFood = [{
    foodName: "Trứng rán",
    price: "120",
    description: "Nhiều hành mới ngon",
    material: [{
            materialName: "Trứng",
            materialQuantity: "2",
            materialUnit: "quả"
        },
        {
            materialName: "Hành lá",
            materialQuantity: "5",
            materialUnit: "cây"
        }
    ]
}];

let listMaterial = [];
let count = 0;
let thTableFood = ["Name", "Price", "Description", "Material", "Action"];

foodNameInputElement.addEventListener("blur", validateFoodName);
foodNameInputElement.addEventListener("input", removeMessageFoodName);

priceInputElement.addEventListener("blur", validatePrice);
priceInputElement.addEventListener("input", removeMessagePrice);

descriptionInputElement.addEventListener("blur", validateDescription);
descriptionInputElement.addEventListener("input", removeMessageDescription);

buttonAddFoodElement.addEventListener("click", addFood);
buttonAddMaterialElement.addEventListener("click", addMaterial);

function materialInputAddEventListener() {
    nameMaterialElement = document.querySelectorAll("#materialName");
    quantityMaterialElement = document.querySelectorAll("#materialQuantity");
    unitMaterialElement = document.querySelectorAll("#materialUnit");

    for (let index = 0; index < nameMaterialElement.length; index++) {
        nameMaterialElement[index].addEventListener("blur", function() { validateNameMaterial(index) });
        nameMaterialElement[index].addEventListener("input", function() { removeMessageNameMaterial(index) });
    }

    for (let index = 0; index < quantityMaterialElement.length; index++) {
        quantityMaterialElement[index].addEventListener("blur", function() { validateQuantityMaterial(index) });
        quantityMaterialElement[index].addEventListener("input", function() { removeMessageQuantityMaterial(index) });
    }

    for (let index = 0; index < unitMaterialElement.length; index++) {
        unitMaterialElement[index].addEventListener("blur", function() { validateUnitMaterial(index) });
        unitMaterialElement[index].addEventListener("input", function() { removeMessageUnitMaterial(index) });
    }
}

processGenTableFood();


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

function validateMaterial() {
    let listMaterialNameElement = document.querySelectorAll("#materialName");
    let listMaterialQuantityElement = document.querySelectorAll("#materialQuantity")
    let listMaterialUnitNameElement = document.querySelectorAll("#materialUnit");

    messageNameMaterialNullElement.classList.add("d-none");
    messageQuantityMaterialNullElement.classList.add("d-none");
    messageUnitMaterialNullElement.classList.add("d-none");

    if (listMaterialNameElement.length == 0) {
        messageNotAddMaterialElement.classList.remove("d-none");
        buttonAddFoodElement.disabled = true;
        return false;
    }
    for (let index = 0; index < listMaterialNameElement.length; index++) {
        listMaterialNameElement[index].addEventListener("input", messageMaterial);
        if (listMaterialNameElement[index].value == "") {
            messageNameMaterialNullElement.classList.remove("d-none");
            listMaterialNameElement[index].focus();
            buttonAddFoodElement.disabled = true;
            return false;
        }
    }
    for (let index = 0; index < listMaterialQuantityElement.length; index++) {
        listMaterialQuantityElement[index].addEventListener("input", messageMaterial);
        if (listMaterialQuantityElement[index].value == "") {
            messageQuantityMaterialNullElement.classList.remove("d-none");
            listMaterialQuantityElement[index].focus();
            buttonAddFoodElement.disabled = true;
            return false;
        }
    }
    for (let index = 0; index < listMaterialUnitNameElement.length; index++) {
        listMaterialUnitNameElement[index].addEventListener("input", messageMaterial);
        if (listMaterialUnitNameElement[index].value == "") {
            messageUnitMaterialNullElement.classList.remove("d-none");
            listMaterialUnitNameElement[index].focus();
            buttonAddFoodElement.disabled = true;
            return false;
        }
    }
    return true;
}

function messageMaterial() {
    messageNameMaterialNullElement.classList.add("d-none");
    messageQuantityMaterialNullElement.classList.add("d-none");
    messageUnitMaterialNullElement.classList.add("d-none");
    buttonAddFoodElement.disabled = false;
}

function validateNameMaterial(index) {
    if (nameMaterialElement[index].value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messageNotAddMaterialElement.classList.add("d-none");
        messageQuantityMaterialNullElement.classList.add("d-none");
        messageUnitMaterialNullElement.classList.add("d-none");
        messageNameMaterialNullElement.classList.remove("d-none")
        nameMaterialElement[index].value = null;
        nameMaterialElement[index].focus();
        return false;
    }
    return true;
}

function removeMessageNameMaterial(index) {
    nameMaterialElement[index].value = nameMaterialElement[index].value.replace(regexName, "");
    messageNameMaterialNullElement.classList.add("d-none");
    buttonAddFoodElement.disabled = false;
}

function validateQuantityMaterial(index) {
    if (quantityMaterialElement[index].value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messageNotAddMaterialElement.classList.add("d-none");
        messageQuantityMaterialNullElement.classList.remove("d-none");
        messageUnitMaterialNullElement.classList.add("d-none");
        messageNameMaterialNullElement.classList.add("d-none")
        quantityMaterialElement[index].value = null;
        quantityMaterialElement[index].focus();
        return false;
    }
    return true;
}

function removeMessageQuantityMaterial(index) {
    messageQuantityMaterialNullElement.classList.add("d-none");
    buttonAddFoodElement.disabled = false;
}

function validateUnitMaterial(index) {
    if (unitMaterialElement[index].value.trim() == "") {
        buttonAddFoodElement.disabled = true;
        messageNotAddMaterialElement.classList.add("d-none");
        messageQuantityMaterialNullElement.classList.add("d-none");
        messageUnitMaterialNullElement.classList.remove("d-none");
        messageNameMaterialNullElement.classList.add("d-none")
        unitMaterialElement[index].value = null;
        unitMaterialElement[index].focus();
        return false;
    }
    return true;
}

function removeMessageUnitMaterial(index) {
    unitMaterialElement[index].value = unitMaterialElement[index].value.replace(regexName, "");
    messageUnitMaterialNullElement.classList.add("d-none");
    buttonAddFoodElement.disabled = false;
}


function addMaterial() {

    messageNotAddMaterialElement.classList.add("d-none");
    buttonAddFoodElement.disabled = false;

    count = count + 1;

    let divFromMaterial = document.createElement("div");
    divFromMaterial.setAttribute("id", "fromMaterial");
    fromMaterialElement.appendChild(divFromMaterial);

    let div = document.createElement("div");
    div.setAttribute("id", "fromMaterial" + count);
    div.setAttribute("class", "d-flex mt-3");
    divFromMaterial.appendChild(div);

    let inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "form-control me-1");
    inputName.setAttribute("id", "materialName");
    inputName.setAttribute("placeholder", "Name");
    div.appendChild(inputName);

    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("class", "form-control me-1");
    inputQuantity.setAttribute("id", "materialQuantity");
    inputQuantity.setAttribute("placeholder", "Quantity");
    div.appendChild(inputQuantity);

    let inputUnit = document.createElement("input");
    inputUnit.setAttribute("type", "text");
    inputUnit.setAttribute("class", "form-control me-1");
    inputUnit.setAttribute("id", "materialUnit");
    inputUnit.setAttribute("placeholder", "Unit");
    div.appendChild(inputUnit);

    let btnX = document.createElement("button");
    btnX.setAttribute("type", "button");
    btnX.setAttribute("class", "btn btn-sm btn-danger m-1");
    btnX.setAttribute("onclick", "deleteMaterial(fromMaterial" + count + ")");
    btnX.innerText = "x"
    div.appendChild(btnX);

    materialInputAddEventListener();
}

function deleteMaterial(idFormMaterial) {
    messageNotAddMaterialElement.classList.add("d-none");
    messageQuantityMaterialNullElement.classList.add("d-none");
    messageUnitMaterialNullElement.classList.add("d-none");
    messageNameMaterialNullElement.classList.add("d-none");
    idFormMaterial.remove();
    buttonAddFoodElement.disabled = false;
}

function deleteAllMaterial() {
    let listFromMaterial = document.querySelectorAll("#fromMaterial");
    for (let index = 0; index < listFromMaterial.length; index++) {
        listFromMaterial[index].remove();
    }
}

// 
function processGenTableFood() {
    if (listFood.length == 0) {
        if (document.getElementById("tblFood") != null) {
            document.getElementById("tblFood").remove();
        }
        messageNotDataIsFoodListElement.classList.remove("d-none");
    } else {
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
            if (key == "material") {
                let cell = rowBody.insertCell();
                for (key in element.material) {
                    let div = document.createElement("div");
                    let text = document.createTextNode(element.material[key].materialName + ": " + element.material[key].materialQuantity + " " + element.material[key].materialUnit);
                    div.appendChild(text);
                    cell.appendChild(div);
                }
            } else {
                let cell = rowBody.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
        let cellAction = rowBody.insertCell();
        let btnDeleteFood = document.createElement("button");
        btnDeleteFood.innerText = "Delete";
        btnDeleteFood.setAttribute("class", "btn btn-danger btn-sm");
        btnDeleteFood.setAttribute("onclick", "deleteElementFood('" + element.foodName + "')");
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
function addFood() {
    let listMaterial = []
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

    let materialName = document.querySelectorAll("#materialName");
    let materialQuantity = document.querySelectorAll("#materialQuantity");
    let materialUnit = document.querySelectorAll("#materialUnit");

    for (let index = 0; index < materialName.length; index++) {
        listMaterial.push({ "materialName": materialName[index].value, "materialQuantity": materialQuantity[index].value, "materialUnit": materialUnit[index].value })
    }

    let foodElement = {
        foodName: foodNameInputElement.value,
        price: priceInputElement.value,
        description: descriptionInputElement.value,
        material: listMaterial
    }

    listFood.push(foodElement);

    foodNameInputElement.value = null;
    priceInputElement.value = null;
    descriptionInputElement.value = null;
    deleteAllMaterial();

    processGenTableFood();
    $('#ModalAddFood').modal('toggle');
}