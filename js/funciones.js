/* DEFINICIÓN DE FUNCIONES GENERALES */

//---------> Funcion que muestra una cadena con todas las propiedades del array

function mostrarTodos(array) {
    let salida = "";
    for(let i=0 ; i<array.length ; i++) {
        salida += "PROPIEDAD N° " + array[i].id + "\n" +
                " Tipo: " + array[i].tipo +
                " Actividad: " + array[i].actividad +
                " Calle: " + array[i].calle + array[i].numero +
                " Descripcion: " + array[i].descripcion +
                " Valor: " + array[i].precio + "\n"
    }
    return salida;
}

//---------> Función que genera los elementos HTML (propiedades) en la interfaz dinámica

function propiedadesUIjQuery(propiedades, id) {
    //Importante: vaciar la interfaz primero
    $(id).empty();
    //Agrego a la interfaz propiedad por propiedad
    for (const propiedad of propiedades) {

        //1° genero la interfaz de los productos
        let montoValor = propiedad.mostrarValor();
        let infoHonorarios = propiedad.mostrarHonorarios();
        $(id).append(`<div class="card cardNro${propiedad.id} text-center">

                            <div class="card-header">
                                <h3>${propiedad.actividad}</h3>
                            </div>

                            <div id="carouselExampleIndicators${propiedad.id}" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators${propiedad.id}" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators${propiedad.id}" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators${propiedad.id}" data-slide-to="2"></li>
                                    <li data-target="#carouselExampleIndicators${propiedad.id}" data-slide-to="3"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="../img/propiedad${propiedad.id}/img1.jpeg" class="d-block w-100" alt="img1">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="../img/propiedad${propiedad.id}/img2.jpeg" class="d-block w-100" alt="img2">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="../img/propiedad${propiedad.id}/img3.jpeg" class="d-block w-100" alt="img3">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="../img/propiedad${propiedad.id}/img4.jpeg" class="d-block w-100" alt="img4">
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators${propiedad.id}" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators${propiedad.id}" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>

                            <div class="card-body">
                                <h3 class="badge badge-pill badge-secondary tipoProp">${propiedad.tipo}</h3>
                                <h3 class="card-title tituloPropiedad">${propiedad.calle} ${propiedad.numero}</h3>
                                <p class="card-text p2">VALOR: ${montoValor}</p>
                                <a id="${propiedad.id}" type="button" class="btn btn-secondary btnSoli boton" data-toggle="modal" data-target="#exampleModal">SOLICITAR</a>
                                <a id="${propiedad.id}" class="btn btn-secondary btnProp boton">VER INFORMACIÓN</a>
                            </div>

                            <div id="infoProp${propiedad.id}" style="display: none;">
                                <h4 class="propSeleccInfo">INFORMACIÓN DE LA PROPIEDAD: ${propiedad.calle} ${propiedad.numero}</h4>
                                <p>Descripción: ${propiedad.descripcion}</p>
                                <p>${infoHonorarios}</p>
                                <a id="${propiedad.id}" class="btn btn-secondary btnPropMenos boton">OCULTAR INFORMACIÓN</a>
                            </div>

                        </div>
                        `)
        }

        //2° asocio los eventos a los botones de la interfaz
        //Botón "VER INFORMACIÓN"
        $(".btnProp").click(function (e) {
            propID = e.target.id;
            $("#infoProp" + propID).slideDown();
        });
        //Botón "OCULTAR INFORMACIÓN"
        $(".btnPropMenos").click(function (e) {
            propID = e.target.id;
            $("#infoProp" + propID).slideUp();
        });
        //Botón "SOLICITAR"
        $(".btnSoli").click(solicitudPropiedad);
}

//---------> Función para generar el select usado en filtro por tipo de actividad

function selectActUI(lista, selector) {
    $(selector).empty(); //lo vaciamos por las dudas
    for (const element of lista) {
        $(selector).append(`<option value="${element}">${element}</option>`);
    }
}

//---------> Función para generar el select usado en filtro por categoría

function selectCatUI(lista, selector) {
    $(selector).empty(); //lo vaciamos por las dudas
    for (const element of lista) {
        $(selector).append(`<option value="${element}">${element}</option>`);
    }
}

//---------> Función manejadora del evento "click" del botón "solicitar"

function solicitudPropiedad(e) {
    //Prevengo que se refresque la página cuando se presiona el botón "solicitar", que es un enlace <a></a>
    e.preventDefault();

    const propiedadID = e.target.id;
    const propSeleccionada = propiedades.find(propiedad => propiedad.id == propiedadID);

    let bandera = false;

    if (carrito.includes(propSeleccionada)) {
        console.log("Propiedad repetida, no puede agregarse");
    } else {
        carrito.push(propSeleccionada);
        console.log(carrito);
        console.log("¡Propiedad agregada con éxito!")
    
        //Guardamos el carrito en el storage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //Creamos la interfaz del carrito nuevamente
        carritoUI(carrito);

        bandera = true;
    }
    console.log(bandera);
    mostrarResultado(bandera);
}

//---------> Función que genera la interfaz del carrito

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

//---------> Función que agrega los datos de una propiedad al carrito

function componenteCarrito(propiedad) {
    let valorProp = datosValor(propiedad);

    return `<p>${propiedad.calle} ${propiedad.numero} - ${valorProp}
            <a id="${propiedad.id}" class="btn btn-delete boton botonX">X</a></p>`
}

//---------> Función que define cómo se agrega la información del valor (alquiler o compra) de la propiedad a la interfaz del carrito

function datosValor(propiedad) {
    let valor = propiedad.mostrarValor();
    if (propiedad.actividad == "ALQUILAR") {
        return "Valor de alquiler: " + valor
    } else {
        return "Valor de compra: " + valor
    }
}

//---------> Función manejador del evento "click" del botón "X", para eliminar una propiedad del carrito

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

//---------> Función que agrega el contenido del modal que informa si la propiedad pudo agregarse al carrito o no

function mostrarResultado(bandera) {
    if(bandera == true) {
        $("#contenidoModal").empty();
        $("#contenidoModal").append("<p>Propiedad agregada con éxito.</p>");
        
        $("#tituloModal").empty();
        $("#tituloModal").append(`<h4 class="modalListo">LISTO!</h4>`)
    } else {
        $("#contenidoModal").empty();
        $("#contenidoModal").append("<p>Esta propiedad ya fue agregada.</p>");

        $("#tituloModal").empty();
        $("#tituloModal").append(`<h4 class="modalError">ERROR!</h4>`)
    }
}

//---------> Función que agrega los datos de una propiedad al formulario

function componenteCarritoForm(propiedad) {
    let valorProp = datosValor(propiedad);
    return `<p class="listaContenido">${propiedad.calle} ${propiedad.numero} - ${valorProp}</p>`
}