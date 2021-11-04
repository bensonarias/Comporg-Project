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

                if (counterCheck == 0 || counterCheck == 1) {
                    register = tempAr[counterCheck].substr(tempAr[counterCheck].length - 3, 3);
                    var newVal = tempAr[counterCheck].replace(/\D/g, '');
                    if (register == "eax") {
                        document.getElementById("eax_dec").value = newVal;
                        document.getElementById("eax_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "ecx") {
                        document.getElementById("ecx_dec").value = newVal;
                        document.getElementById("ecx_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "edx") {
                        document.getElementById("edx_dec").value = newVal;
                        document.getElementById("edx_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "ebx") {
                        document.getElementById("ebx_dec").value = newVal;
                        document.getElementById("ebx_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "esp") {
                        document.getElementById("esp_dec").value = newVal;
                        document.getElementById("esp_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "ebp") {
                        document.getElementById("ebp_dec").value = newVal;
                        document.getElementById("ebp_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "esi") {
                        document.getElementById("esi_dec").value = newVal;
                        document.getElementById("esi_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    } else if (register == "edi") {
                        document.getElementById("edi_dec").value = newVal;
                        document.getElementById("edi_hex").value = "0x" + Number(newVal).toString(16).toUpperCase().padStart(8, 0);
                        document.getElementById("counter").value++;
                    }
                }

            }
        });




}