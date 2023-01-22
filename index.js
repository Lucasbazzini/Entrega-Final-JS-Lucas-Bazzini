function botonListo(){
    function Prestamo(nombre,apellido,prestamo,cuotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.prestamo = prestamo;
        this.cuotas = cuotas;
    }
    var nombreCapturar = document.getElementById("nombreValue").value;
    var apellidoCapturar = document.getElementById("apellidoValue").value;
    var prestamoCapturar = document.getElementById("prestamoValue").value;
    var cuotasCapturar = document.getElementById("cuotasValue").value;
    //console.log(nombreCapturar)
    //console.log(apellidoCapturar)
    //console.log(prestamoCapturar)
    //console.log(cuotasCapturar)
    nuevoPrestamo = new Prestamo (nombreCapturar, apellidoCapturar, prestamoCapturar, cuotasCapturar);
    console.log(nuevoPrestamo)
    agregarDatos();
}

var prestamoDatos = [];
function agregarDatos(){
    prestamoDatos.push(nuevoPrestamo);
    console.log(prestamoDatos);
    var intereses = nuevoPrestamo.cuotas*3;
    if (intereses > 60){
        alert("Ten cuidado! Los intereses son mayores a 60% anual");
    }
    else if (intereses < 60){
        alert ("Perfecto, el interes anual es menor al 60%")
    }
    document.getElementById("tablaInfo").innerHTML += '<tbody><tr><th>'+nuevoPrestamo.prestamo+'</th><td>'+nuevoPrestamo.nombre+'</td><td>'+nuevoPrestamo.apellido+'</td><td>'+nuevoPrestamo.cuotas+'</td><td id="intereses">'+nuevoPrestamo.cuotas*3+'</td></tr></tbody>'
}




