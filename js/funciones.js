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
    //Importante: vaciar la interfaz primero
    $(id).empty();
    for (const propiedad of propiedades) {
        //1° genero la interfaz de los productos
        let honorariosProp = propiedad.montoHonorariosValor();
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
                                    <a id="${propiedad.id}" class="btn btn-secondary btnSoli boton">SOLICITAR</a>
                                    <a id="${propiedad.id}" class="btn btn-secondary btnProp boton">VER INFORMACIÓN</a>
                                </div>
                            </div>
                            <div id="infoProp${propiedad.id}" style="display: none;">
                                <p class="propSeleccInfo">Información de la propiedad: ${propiedad.calle} ${propiedad.numero}</p>
                                <p>Descripción: ${propiedad.descripcion}</p>
                                <p>El monto total de los honorarios a abonar es $${honorariosProp[0]}.</p>
                                <p>Podrás abonar en 1 pago de $${honorariosProp[0]}, 
                                    en 2 cuotas de $${honorariosProp[1]}, 
                                    en 3 cuotas de $${honorariosProp[2]} o
                                    en 4 cuotas de $${honorariosProp[3]}.</p>
                                <a id="${propiedad.id}" class="btn btn-secondary btnPropMenos boton">OCULTAR INFORMACIÓN</a>
                            </div>
                            <div id="propRep${propiedad.id}">
                            </div>
                        </div>
                        `)
        //2° asocio los eventos a los botones de la interfaz
        //Botón "ver información"
        $(".btnProp").click(function (e) {
            propID = e.target.id;
            $("#infoProp" + propID).slideDown();
        });
        //Botón "ocultar información"
        $(".btnPropMenos").click(function (e) {
            propID = e.target.id;
            $("#infoProp" + propID).slideUp();
        });
        //Botón "solicitar"
        $(".btnSoli").click(solicitudPropiedad);
        }
}

//Función para generar el select usado en filtro por categoría

function selectUI(lista, selector) {
    $(selector).empty(); //lo vaciamos por las dudas
    $(selector).append(`<option value="Todas las propiedades">Todas las propiedades</option>`)
    for (const element of lista) {
        $(selector).append(`<option value="${element}">${element}</option>`);
    }
}

//Función manejadora del evento "click" del botón "solicitar"

function solicitudPropiedad(e) {
    e.preventDefault(); //prevengo que se refresque la página cuando se presiona el botón "solicitar", que es un enlace (ver etiqueta <a></a>)
    const propiedadID = e.target.id;
    const propSeleccionada = propiedades.find(propiedad => propiedad.id == propiedadID);

    if (carrito.includes(propSeleccionada)) {
        //----> NECESITO AYUDA ACÁ
        /*
        $("#propRep" + propiedadID).animate(
            {margin: '30px',
            width: 500},
                500, function() {
                    this.innerHTML = `<p>¡Propiedad agregada con éxito!</p>`;
                }).
                    delay(1500).
                        slideUp();
        */
    }
    else {
        carrito.push(propSeleccionada);
        console.log(carrito);
    
        //Guardamos el carrito en el storage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //Creamos la interfaz del carrito nuevamente
        carritoUI(carrito);
        //Informo que la propiedad se agregó correctamente
        $("#propRep" + propiedadID).animate(
            {margin: '30px',
            width: 500},
                500, function() {
                    this.innerHTML = `<p>¡Propiedad agregada con éxito!</p>`;
                }).
                    delay(1500).
                        slideUp();
    }
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
    //Asociación de evento para eliminar una propiedad
    $(".btn-delete").on("click", eliminarCarrito);
}

function componenteCarrito(propiedad) {
    return `<p>${propiedad.calle} ${propiedad.numero} - Valor del alquier: $${propiedad.alquilerInicial}
            <a id='${propiedad.id}' class="btn btn-delete boton">X</a>`
}

function eliminarCarrito(e) {
    const propiedadID = e.target.id;
    //1°: busco la posición del elemento a eliminar
    let posicion = carrito.findIndex(producto => producto.id == propiedadID);
    //2°: corto el array carrito --> splice(desde qué posición, cuántos elementos borro)
    carrito.splice(posicion, 1);
    //3°: actualizar interfaz
    carritoUI(carrito);

    //Guardamos el carrito modificado en el storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}