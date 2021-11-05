var canExecute = false;

function reset() {
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = elements[i].defaultValue;
    }
    document.getElementById("counter").value = 0;
    document.getElementById("zf").value = 0;
    document.getElementById("sf").value = 0;
    document.getElementById("of").value = 0;
}

function assignValues() {
    var counterCheck = document.getElementById("counter").value;

    var source = "";
    if (document.getElementById('add').checked && canExecute) {
        source = "/txtfiles/addition.txt";
    } else if (document.getElementById('sub').checked && canExecute) {
        source = "/txtfiles/subtraction.txt";
    } else if (document.getElementById('con').checked && canExecute) {
        source = "/txtfiles/conditional.txt";
    } else {
        source = "/txtfiles/error.txt";
        var text = document.getElementById('txtholder');
        var clone = text.cloneNode(true);
        clone.setAttribute('src', source);
        text.parentNode.replaceChild(clone, text);
    }

    fetch(source)
        .then(response => response.text())
        .then(data => {
            if (source != "") {
                var temp = data;
                temp = temp.split("\n").join(".");
                temp = temp.split("\r").join("");
                var tempAr = temp.split(".");

                var register = "";
                var arithmetic = "";
                var valueOne = "";
                var valueTwo = "";

                if (counterCheck == 0 || counterCheck == 1) {
                    register = tempAr[counterCheck].substr(tempAr[counterCheck].length - 3, 3);
                    var newVal = tempAr[counterCheck].replace(/[^\d-]/g, '');
                    if (register == "eax") {
                        getDec(newVal, "eax_dec");
                        getHex(newVal, "eax_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "ecx") {
                        getDec(newVal, "ecx_dec");
                        getHex(newVal, "ecx_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "edx") {
                        getDec(newVal, "edx_dec");
                        getHex(newVal, "edx_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "ebx") {
                        getDec(newVal, "ebx_dec");
                        getHex(newVal, "ebx_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "esp") {
                        getDec(newVal, "esp_dec");
                        getHex(newVal, "esp_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "ebp") {
                        getDec(newVal, "ebp_dec");
                        getHex(newVal, "ebp_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "esi") {
                        getDec(newVal, "esi_dec");
                        getHex(newVal, "esi_hex");
                        document.getElementById("counter").value++;
                    } else if (register == "edi") {
                        getDec(newVal, "edi_dec");
                        getHex(newVal, "edi_hex");
                        document.getElementById("counter").value++;
                    }
                } else if (counterCheck == 2) {
                    arithmetic = tempAr[2].substr(0, 4);
                    valueOne = tempAr[2].substring(6, 9);
                    valueTwo = tempAr[2].substring(12, 15);

                    if (valueOne == "eax") {
                        valueOne = document.getElementById("eax_dec").value;
                    } else if (valueOne == "ecx") {
                        valueOne = document.getElementById("ecx_dec").value;
                    } else if (valueOne == "edx") {
                        valueOne = document.getElementById("edx_dec").value;
                    } else if (valueOne == "ebx") {
                        valueOne = document.getElementById("ebx_dec").value;
                    } else if (valueOne == "esp") {
                        valueOne = document.getElementById("esp_dec").value;
                    } else if (valueOne == "ebp") {
                        valueOne = document.getElementById("ebp_dec").value;
                    } else if (valueOne == "esi") {
                        valueOne = document.getElementById("esi_dec").value;
                    } else if (valueOne == "edi") {
                        valueOne = document.getElementById("edi_dec").value;
                    }

                    if (valueTwo == "eax") {
                        valueTwo = document.getElementById("eax_dec").value;
                    } else if (valueTwo == "ecx") {
                        valueTwo = document.getElementById("ecx_dec").value;
                    } else if (valueTwo == "edx") {
                        valueTwo = document.getElementById("edx_dec").value;
                    } else if (valueTwo == "ebx") {
                        valueTwo = document.getElementById("ebx_dec").value;
                    } else if (valueTwo == "esp") {
                        valueTwo = document.getElementById("esp_dec").value;
                    } else if (valueTwo == "ebp") {
                        valueTwo = document.getElementById("ebp_dec").value;
                    } else if (valueTwo == "esi") {
                        valueTwo = document.getElementById("esi_dec").value;
                    } else if (valueTwo == "edi") {
                        valueTwo = document.getElementById("edi_dec").value;
                    }

                    if (arithmetic == "addl") {
                        getDec(Number(valueTwo) + Number(valueOne), tempAr[2].substr(12, 15) + "_dec");
                        getHex(Number(valueTwo) + Number(valueOne), tempAr[counterCheck].substring(12, 15) + "_hex");
                        setFlag(Number(valueTwo) + Number(valueOne));
                        document.getElementById("counter").value++;
                    } else if (arithmetic == "subl") {
                        getDec(Number(valueTwo) - Number(valueOne), tempAr[2].substr(12, 15) + "_dec");
                        getHex(Number(valueTwo) - Number(valueOne), tempAr[counterCheck].substring(12, 15) + "_hex");
                        setFlag(Number(valueTwo) - Number(valueOne));
                        document.getElementById("counter").value++;
                    }
                } else if (counterCheck == 3) {
                    var sf = document.getElementById("sf").value;
                    var zf = document.getElementById("zf").value;
                    var checkCondition = tempAr[3].substring(0, 6);

                    switch (checkCondition) {
                        case "cmovg ":
                            if (zf == 0 && sf == 0) {
                                setMoveCondition(tempAr[3].substring(7, 10), tempAr[3].substring(13, 16));
                            }
                            break;
                        case "cmovge":
                            if (sf == 0) {
                                setMoveCondition(tempAr[3].substring(8, 11), tempAr[3].substring(14, 17));
                            }
                            break;
                        case "cmove ":
                            if (zf == 1) {
                                setMoveCondition(tempAr[3].substring(7, 10), tempAr[3].substring(13, 16));
                            }
                            break;
                        case "cmovne":
                            if (zf == 0) {
                                setMoveCondition(tempAr[3].substring(8, 11), tempAr[3].substring(14, 17));
                            }
                            break;
                        case "cmovle":
                            if (zf == 1 || sf == 1) {
                                setMoveCondition(tempAr[3].substring(8, 11), tempAr[3].substring(14, 17));
                            }
                            break;
                        case "cmovl ":
                            if (sf == 1) {
                                setMoveCondition(tempAr[3].substring(7, 10), tempAr[3].substring(13, 16));
                            }
                            break;
                        default:
                            console.log("no conditions");
                    }
                }
            }
        });
}

function getHex(val, name_id) {
    if (val >= 0) {
        document.getElementById(name_id).value = "0x" + Number(val).toString(16).toUpperCase().padStart(8, 0);
    } else {
        document.getElementById(name_id).value = "0x" + Number(val >>> 0).toString(16).toUpperCase().padStart(8, 0);
    }
}

function getDec(val, name_id) {
    document.getElementById(name_id).value = val;
}

function setMoveCondition(firstNameId, secondNameId) {
    document.getElementById(secondNameId + "_dec").value = document.getElementById(firstNameId + "_dec").value
    getHex(document.getElementById(secondNameId + "_dec").value, secondNameId + "_hex")
}

function setFlag(val) {
    if (val == 0) {
        document.getElementById("zf").value = 1;
    } else if (val < 0) {
        document.getElementById("sf").value = 1;
    } else if (val > 4294967293) {
        document.getElementById("of").value = 1;
    }
}


function showText() {
    var source = "";
    var text = document.getElementById('txtholder');

    if (document.getElementById('add').checked) {
        source = "/txtfiles/addition.txt";
        canExecute = true;
    } else if (document.getElementById('sub').checked) {
        source = "/txtfiles/subtraction.txt";
        canExecute = true;
    } else if (document.getElementById('con').checked) {
        source = "/txtfiles/conditional.txt";
        canExecute = true;
    } else {
        source = "/txtfiles/error.txt";
        canExecute = false;
    }
    var clone = text.cloneNode(true);
    clone.setAttribute('src', source);
    text.parentNode.replaceChild(clone, text);

}