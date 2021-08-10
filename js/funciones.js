//Funciones para filtros

function mostrarTodos(array) {
    let salida = "";
    for(let i=0 ; i<array.length ; i++) {
        salida += "PROPIEDAD N° " + array[i].id + "\n" +
                "Calle: " + array[i].calle +
                " Número: " + array[i].numero + 
                " Tipo: " + array[i].tipo +
                " Alquiler: $" + array[i].alquilerInicial + "\n"
    }
    return salida;
}

function buscarPropiedadNumero() {
    let nroPropiedad = prompt("Ingrese el número de propiedad sobre la cual desea saber más");
    const propiedadEncontrada = propiedades.find(propiedad => propiedad.id == nroPropiedad);
    if (propiedadEncontrada != undefined) {
        alert("Propiedad encontrada. Mostramos a continuación toda la información")
        alert(propiedadEncontrada.mostrar());
        return propiedadEncontrada;
    } else {
        alert("No existe propiedad con el número ingresado");
        return 0;
    }
}

function buscarPropiedadRango() {
    let minimo = prompt("Ingrese valor mínimo:");
    let maximo = prompt("Ingrese valor máximo:");
    const filtrados = propiedades.filter(propiedad => (propiedad.alquilerInicial <= maximo) && (propiedad.alquilerInicial >= minimo));
    if (filtrados.length != 0) {
        alert(mostrarTodos(filtrados));
        alert("Ahora sí debe seleccionar una propiedad");
        const propiedadEncontrada = buscarPropiedadNumero();
        return propiedadEncontrada;
    } else {
        alert("No existen propiedades en ese rango de precios");
        return 0;
    }
}

function buscarPropiedad(opcion) {
    switch (opcion) {
        case 1:
            const propiedadEncontradaNumero = buscarPropiedadNumero();
            return propiedadEncontradaNumero;
        case 2:
            const propiedadEncontradaRango = buscarPropiedadRango();
            return propiedadEncontradaRango;
        default:
            alert("La opción ingresada es incorrecta");
            return 0;
    }
}

//Función que genera los elementos HTML en la interfaz dinámica

function propiedadesUIjQuery(propiedades, id) {
    for (const propiedad of propiedades) {
        $(id).append(`<div class="card mb-4 h-100 text-center" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${propiedad.img}" alt="..." width="200px" height="200px">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h5 class="card-title tituloPropiedad">${propiedad.calle} ${propiedad.numero}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted infoPropiedad">${propiedad.tipo}</h6>
                                    <p class="card-text infoPropiedad">Valor del alquiler: $${propiedad.alquilerInicial}</p>
                                    <a id="${propiedad.id}" class="btn btn-primary btnProp">MÁS INFORMACIÓN</a>
                                    <a id="${propiedad.id}" class="btn btn-primary btnSoli">SOLICITAR</a>
                                </div>
                            </div>
                        </div>
                        `)
    }
}

//Función manejadora del evento "click" del botón "más información"

function seleccionPropiedad() {
    let seccionActual = document.getElementById("infoPropiedad"); 
    const idProp = this.id;

    console.log("Se seleccionó la propiedad: " + idProp);
    const propiedadEncontrada = propiedades.find(propiedad => propiedad.id == idProp);
    console.log(propiedadEncontrada.mostrar());

    seccionActual.innerHTML = "";

    let divNombreProp = document.createElement("h3");
    divNombreProp.classList.add("propSeleccInfo");
    divNombreProp.innerHTML = `Se ha seleccionado la propiedad: ${propiedadEncontrada.calle} ${propiedadEncontrada.numero}`;
    seccionActual.appendChild(divNombreProp);

    let divDescripcion = document.createElement("p");
    divDescripcion.innerHTML = `${propiedadEncontrada.descripcion}`;
    seccionActual.appendChild(divDescripcion);

    let divInfoHonorarios = document.createElement("p");
    divInfoHonorarios.innerHTML = propiedadEncontrada.montoHonorarios();
    seccionActual.appendChild(divInfoHonorarios);

    const honorarios1 = propiedadEncontrada.montoHonorariosValor();
    const honorarios2 = propiedadEncontrada.montoHonorariosValor() / 2;
    const honorarios3 = propiedadEncontrada.montoHonorariosValor() / 3;

    let opciones = document.createElement("p");
    opciones.innerHTML = `Podrás abonar en 1 cuota de $${honorarios1}, en 2 cuotas de $${honorarios2} o en 3 cuotas de $${honorarios3}`;
    seccionActual.appendChild(opciones);
}

//Función manejadora del evento "click" del botón "solicitar"

function solicitudPropiedad(e) {
    e.preventDefault(); //prevengo que se refresque la página cuando se presiona el botón "solicitar", que es un enlace (ver etiqueta <a></a>)
    const propiedadID = e.target.id;
    const propSeleccionada = propiedades.find(propiedad => propiedad.id == propiedadID);
    carrito.push(propSeleccionada);
    console.log(carrito);
    carritoUI(carrito);
}
function carritoUI(carrito) {
    //Modifico la cantidad
    $("#carritoCantidad").html(carrito.length);
    //Elimino todo lo que esté acumulado para evitar duplicación de información
    $("#carritoPropiedades").empty();
    //Modifico la lista de las propiedades del carrito
    for (const propiedad of carrito) {
        $("#carritoPropiedades").append(componenteCarrito(propiedad));
    }
}
function componenteCarrito(propiedad) {
    return `<p>${propiedad.calle} ${propiedad.numero} - Valor del alquier: $${propiedad.alquilerInicial}<button>X</button></p>`
}