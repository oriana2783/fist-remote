
function calcuMorgage(e) {
    e.preventDefault();

    let mate = document.forms["fmortgage"]["cuota"].value;
    let valor = document.forms["fmortgage"]["valort"].value;
    let inte = document.forms["fmortgage"]["interes"].value;
    let plazo = document.forms["fmortgage"]["plazo"].value;
    // alert("hola el valor ingresado es: " + mate + " y el segunda es: " +valor+ " la suma es: "+[mate + valor] );//
    const Monst = 12;

    const mortgage = {
        costoTotalInmueble : 0,
        totalPrestamo: 0,
        totalInteres: 0,
        cuotaMensual: 0
    };
    mortgage.costoTotalInmueble = valor;
    mortgage.totalPrestamo = valor - mate;
    mortgage.totalInteres = mortgage.totalPrestamo * inte / 100;
    mortgage.cuotaMensual = (mortgage.totalPrestamo + mortgage.totalInteres) / (plazo * Monst);
   
    ouputMortgage(mortgage);
}

function ouputMortgage(finalMortgage) {
    
    document.getElementById("totalpres").innerHTML = ValueDollar (finalMortgage.totalPrestamo);
    document.getElementById("valom").innerHTML = ValueDollar (finalMortgage.cuotaMensual);
    var totalpretamoporcentaje = 0;
    totalpretamoporcentaje = finalMortgage.totalPrestamo * 100 / finalMortgage.costoTotalInmueble;
    alert(totalpretamoporcentaje);
    if (totalpretamoporcentaje > 90) {
        document.getElementById("totalpres").className += " porcentaje";
    } else {
        document.getElementById("totalpres").className  = " form-control";
    }
}

function resetform() {
    document.forms["fmortgage"].reset();

}

function reset() {
    document.forms["contactos"].reset();

}



function ValueDollar(value){
    const dollarformatter = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2} )
    return dollarformatter.format(value);
}






