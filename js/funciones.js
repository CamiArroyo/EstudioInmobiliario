//Funciones para filtros

function mostrarTodos(array) {
    let salida = "";
    for(let i=0 ; i<array.length ; i++) {
        salida += "PROPIEDAD N° " + array[i].id + "\n" +
                " Actividad: " + array[i].actividad +
                " Calle: " + array[i].calle +
                " Número: " + array[i].numero + 
                " Tipo: " + array[i].tipo +
                " Alquiler: $" + array[i].precio + "\n"
    }
    return salida;
}

//Función que genera los elementos HTML en la interfaz dinámica

function propiedadesUIjQuery(propiedades, id) {
    //Importante: vaciar la interfaz primero
    $(id).empty();
    for (const propiedad of propiedades) {
        //1° genero la interfaz de los productos
        let honorariosProp = propiedad.montoHonorariosValor();
        $(id).append(`<div class="card text-center" style="width: 40rem;">

                            <div class="card-header">
                                <h3>${propiedad.actividad}</h3>
                            </div>

                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="../img/casa1.jpg" class="d-block w-100" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="../img/casa2.jpg" class="d-block w-100" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="../img/edificio1.jpg" class="d-block w-100" alt="...">
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>

                            <div class="card-body">
                                <h3 class="card-title tituloPropiedad">${propiedad.calle} ${propiedad.numero}</h3>
                                <h3 class="card-subtitle">${propiedad.tipo}</h3>
                                <p class="card-text">Valor: $${propiedad.precio}</p>
                                <a id="${propiedad.id}" type="button" class="btn btn-primary btnSoli boton" data-toggle="modal" data-target="#exampleModal">SOLICITAR</a>
                                <a id="${propiedad.id}" class="btn btn-secondary btnProp boton">VER INFORMACIÓN</a>
                            </div>

                            <div id="infoProp${propiedad.id}" style="display: none;">
                                <h3 class="propSeleccInfo">Información de la propiedad: ${propiedad.calle} ${propiedad.numero}</h3>
                                <p>Descripción: ${propiedad.descripcion}</p>
                                <p>El monto total de los honorarios a abonar es $${honorariosProp[0]}.</p>
                                <p>Podrás abonar en 1 pago de $${honorariosProp[0]}, 
                                    en 2 cuotas de $${honorariosProp[1]}, 
                                    en 3 cuotas de $${honorariosProp[2]} o
                                    en 4 cuotas de $${honorariosProp[3]}.</p>
                                <a id="${propiedad.id}" class="btn btn-secondary btnPropMenos boton">OCULTAR INFORMACIÓN</a>
                            </div>

                        </div>
                        `)
        }
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

//Función para generar el select usado en filtro por tipo de actividad

function selectActUI(lista, selector) {
    $(selector).empty(); //lo vaciamos por las dudas
    $(selector).append(`<option value="Todas las acciones">Todas las acciones</option>`)
    for (const element of lista) {
        $(selector).append(`<option value="${element}">${element}</option>`);
    }
}

//Función para generar el select usado en filtro por categoría

function selectCatUI(lista, selector) {
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

    let bandera = false;

    if (carrito.includes(propSeleccionada)) {
        console.log("Propiedad repetida, no puede agregarse");
    }
    else {
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

function mostrarResultado(bandera) {
    if(bandera == true) {
        $("#contenidoModal").empty();
        $("#contenidoModal").append("Propiedad agregada con éxito");
        
        $("#tituloModal").empty();
        $("#tituloModal").append("Listo!")
    } else {
        $("#contenidoModal").empty();
        $("#contenidoModal").append("Esta propiedad ya fue agregada");

        $("#tituloModal").empty();
        $("#tituloModal").append("Error!")
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
    return `<p>${propiedad.calle} ${propiedad.numero} - Valor del alquier: $${propiedad.precio}
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