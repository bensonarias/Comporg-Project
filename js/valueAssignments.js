function reset() {
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = elements[i].defaultValue;
    }
    document.getElementById("counter").value = 0;
}

function assignValues() {
    var counterCheck = document.getElementById("counter").value;

    var source = "";
    if (document.getElementById('add').checked) {
        source = "/txtfiles/addition.txt";
    } else if (document.getElementById('sub').checked) {
        source = "/txtfiles/subtraction.txt";
    } else if (document.getElementById('con').checked) {
        source = "/txtfiles/conditional.txt";
    } else {
        source = "";
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
                    var newVal = tempAr[counterCheck].replace(/\D/g, '');
                    if (register == "eax") {
                        document.getElementById("eax_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "eax_hex");
                    } else if (register == "ecx") {
                        document.getElementById("ecx_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "ecx_hex");
                    } else if (register == "edx") {
                        document.getElementById("edx_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "edx_hex");
                    } else if (register == "ebx") {
                        document.getElementById("ebx_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "ebx_hex");
                    } else if (register == "esp") {
                        document.getElementById("esp_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "esp_hex");
                    } else if (register == "ebp") {
                        document.getElementById("ebp_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "ebp_hex");
                    } else if (register == "esi") {
                        document.getElementById("esi_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "esi_hex");
                    } else if (register == "edi") {
                        document.getElementById("edi_dec").value = newVal;
                        document.getElementById("counter").value++;
                        getHex(newVal, "edi_hex");
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
                        document.getElementById(tempAr[2].substr(12, 15) + "_dec").value = Number(valueTwo) + Number(valueOne);
                        getHex(Number(valueTwo) + Number(valueOne), tempAr[counterCheck].substring(12, 15) + "_hex");
                        document.getElementById("counter").value++;
                    } else if (arithmetic == "subl") {
                        document.getElementById(tempAr[2].substr(12, 15) + "_dec").value = Number(valueTwo) - Number(valueOne);
                        getHex(Number(valueTwo) - Number(valueOne), tempAr[counterCheck].substring(12, 15) + "_hex");
                        document.getElementById("counter").value++;
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