function showText() {

    var source = "";
    var text = document.getElementById('txtholder');


    if (document.getElementById('add').checked) {
        source = "/txtfiles/addition.txt";
    } else if (document.getElementById('sub').checked) {
        source = "/txtfiles/subtraction.txt";
    } else if (document.getElementById('con').checked) {
        source = "/txtfiles/conditional.txt";
    } else {
        source = "";
    }
    var clone = text.cloneNode(true);
    clone.setAttribute('src', source);
    text.parentNode.replaceChild(clone, text);

}