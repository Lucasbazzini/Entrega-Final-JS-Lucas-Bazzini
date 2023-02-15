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
      Toastify({
        text: "Cuidado, los intereses son mayores al 60%",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #db0000, #fa0202,#f75c40,#fa4a2a,#fa4a2a,#ff5203)",
        },
        onClick: function(){}
      }).showToast();
    }
    else if (intereses < 60) {
      Toastify({
        text: "Perfecto,los intereses son menores al 60%",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #19bf00, #20e602,#24ff03,#20e602,#19bf00)",
        },
        onClick: function(){}
      }).showToast();
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
    Toastify({
      text: "No hay historial de prestamos",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #0021c7, #0027ed,#0021c7,#0027ed)",
      },
      onClick: function(){}
    }).showToast();
  }
});

let borrarHistorialButton = document.getElementById("borrarHistorialButton");
borrarHistorialButton.addEventListener("click", function () {
  localStorage.removeItem("prestamoDatos");
  prestamoDatos = [];
  Toastify({
    text: "Historial de prestamos borrado",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ed0c5b, #fc035a,#ed0c5b,#fc035a)",
    },
    onClick: function(){}
  }).showToast();
});

  //API 
  function obtenerTiposDeCambio() {
    fetch('https://openexchangerates.org/api/latest.json?app_id=c399996bf77a4669aeef6e3c5fe7865e&symbols=ARS,BRL,CLP,GBP')
      .then(response => response.json())
      .then(data => {
        const tiposDeCambio = data.rates;
        const tipoDeCambioUSD = 1;
        const exchangeRateElementARS = document.getElementById('exchange-rate-ars');
        const exchangeRateElementBRL = document.getElementById('exchange-rate-brl');
        const exchangeRateElementCLP = document.getElementById('exchange-rate-clp');
        const exchangeRateElementGBP = document.getElementById('exchange-rate-gbp');
        
        exchangeRateElementARS.innerText = `1 USD = ${tiposDeCambio.ARS.toFixed(2)} ARS`;
        exchangeRateElementBRL.innerText = `1 USD = ${tiposDeCambio.BRL.toFixed(2)} BRL`;
        exchangeRateElementCLP.innerText = `1 USD = ${tiposDeCambio.CLP.toFixed(2)} CLP`;
        exchangeRateElementGBP.innerText = `1 USD = ${tiposDeCambio.GBP.toFixed(2)} GBP`;
      })
      .catch(error => console.error(error));
  }
  
  window.onload = function() {
    obtenerTiposDeCambio();
  };

document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("night-mode");
});