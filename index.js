function botonListo() {
    function Prestamo(nombre, apellido, prestamo, cuotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.prestamo = prestamo;
        this.cuotas = cuotas;
    }
    if (localStorage.getItem("prestamoDatos")) {
        prestamoDatos = JSON.parse(localStorage.getItem("prestamoDatos"));
    }
    let nombreCapturar = document.getElementById("nombreValue").value;
    let apellidoCapturar = document.getElementById("apellidoValue").value;
    let prestamoCapturar = document.getElementById("prestamoValue").value;
    let cuotasCapturar = document.getElementById("cuotasValue").value;
    //console.log(nombreCapturar)
    //console.log(apellidoCapturar)
    //console.log(prestamoCapturar)
    //console.log(cuotasCapturar)
    nuevoPrestamo = new Prestamo(nombreCapturar, apellidoCapturar, prestamoCapturar, cuotasCapturar);
    //console.log(nuevoPrestamo)
    agregarDatos();
}

let prestamoDatos = [];
function agregarDatos() {
    prestamoDatos.push(nuevoPrestamo);
    localStorage.setItem("prestamoDatos", JSON.stringify(prestamoDatos));
    //console.log(prestamoDatos)
    //console.log(prestamoDatos);
    let intereses = nuevoPrestamo.cuotas * 3;
    if (intereses > 60) {
        alert("Ten cuidado! Los intereses son mayores a 60% anual");
    }
    else if (intereses < 60) {
        alert("Perfecto, el interes anual es menor al 60%")
    }
    document.getElementById("tablaInfo").innerHTML += '<tbody><tr><th>' + nuevoPrestamo.prestamo + '</th><td>' + nuevoPrestamo.nombre + '</td><td>' + nuevoPrestamo.apellido + '</td><td>' + nuevoPrestamo.cuotas + '</td><td id="intereses">' + nuevoPrestamo.cuotas * 3 + '</td><td><button style="background-color:red; width: 80%" onclick="eliminarFila(this)">Eliminar</button></td></tr></tbody>'

}
function eliminarFila(boton) {
    let fila = boton.parentNode.parentNode;
    fila.parentNode.remove(fila);
}

let historialButton = document.getElementById("historialButton");
historialButton.addEventListener("click", function () {
  if (localStorage.getItem("prestamoDatos")) {
    prestamoDatos = JSON.parse(localStorage.getItem("prestamoDatos"));
    let historial = "";
    prestamoDatos.forEach(prestamo => {
      historial += "Nombre: " + prestamo.nombre + " Apellido: " + prestamo.apellido + " Prestamo: " + prestamo.prestamo + " Cuotas: " + prestamo.cuotas + "\n";
    });
    alert("Historial de prestamos: \n" + historial);
  } else {
    alert("No hay historial de prestamos");
  }
});

let borrarHistorialButton = document.getElementById("borrarHistorialButton");
borrarHistorialButton.addEventListener("click", function () {
  localStorage.removeItem("prestamoDatos");
  prestamoDatos = [];
  alert("Historial de prestamos eliminado");
});

document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("night-mode");
});




