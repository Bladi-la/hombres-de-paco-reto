let regexDne = /^[0-9]{7}$/g;
let regexDnf = /^[0-9]{8}$/g;


let counterDnf = 0;
let counterDne = 0;
const LETRASDNF = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
const LETRASDNE = ['X', 'Y', 'Z'];
const TECLASOMITIDAS = ['Meta', 'Control', 'Fin', 'AltGraph', 'Alt', 'Ctrl', 'Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Insert'
    , 'Clear', 'Home', 'PageUp', 'PageDawn', 'CapsLock', 'Delete', 'End', 'NumLock', 'Shift', 'Escape', 'Backspace'];

let textDnf = '';
let textDne = '';
let dnf = document.getElementById('dnf');
let dne = document.getElementById('dne');
let dnfsGenerados = [];
let dnesGenerados = [];

window.onload = function () {

    dnf.addEventListener('keyup', verificaInput, false);
    dne.addEventListener('keyup', verificaInput, false);

};
function generarDnf() {

    //genera una letra del array letrasDNF

    if (dnf.value.match(regexDnf)) {

        let res = Math.floor((parseInt(dnf.value)) % 23);
        console.log(res)
        console.log(LETRASDNF[res])
        dnfsGenerados[counterDnf] = (dnf.value + LETRASDNF[res]);

        counterDnf++;

        let item = document.createElement('li');

        item.textContent = dnfsGenerados[dnfsGenerados.length - 1];

        document.getElementById('dnf-generado').appendChild(item);
    } else {
        document.getElementById('mensaje-error-dnf').innerHTML = "Solo se permiten numeros!";
    }
    textDnf = '';
    dnf.value = '';
    dnf.focus();
}

function generarDne() {


    if (dne.value.match(regexDne)) {
        //se obtiene el digito de control a patir de X:0,Y:1, o Z:2
        textDne = dne.value;
        textDne += LETRASDNE.indexOf(LETRASDNE[Math.floor(Math.random() * (LETRASDNE.length))]);

        //se aplica el mismo algoritmo que para el DNF
        let res = Math.floor(parseInt(textDne.trim()) % 23);

        dnesGenerados[counterDne] = (textDne + LETRASDNF[res]);

        counterDne++;

        let item = document.createElement('li');

        item.textContent = dnesGenerados[dnesGenerados.length - 1];

        document.getElementById('dne-generado').appendChild(item);

    } else {
        document.getElementById('mensaje-error-dne').innerHTML = "Solo se permiten numeros!";
    }
    textDne = '';
    dne.value = '';
    dne.focus();
}
function verificaInput(e) {

    let c = (e.charCode || e.keyCode);
    document.getElementById('mensaje-error-dnf').innerHTML = " ";
    document.getElementById('mensaje-error-dne').innerHTML = " ";

    if (c > 47 && c < 58 || e.key === 'ContextMenu') {

        generarDneDnf(e);

    } else {
        cleanInput(e);
    }

}

function cleanInput(e) {

    if (!TECLASOMITIDAS.includes(e.key) || ((e.keyCode) > 57 && (e.keyCode) < 166) || e.keyCode === '32') {
        if (e.target.value.length >= 0) {
            e.target.value = e.target.value.substr(0, (e.target.value.length - 1));
            document.getElementById('mensaje-error-' + e.target.id).innerHTML = "NO se permiten caracteres como: " + e.key + "!";
        }
    }
}
function generarDneDnf(e) {

    if (e.target.id === 'dne' && e.target.value.length === 7) {
        generarDne();
    } else {
        if (e.target.value.length === 8) {
            generarDnf();
        }
    }
}