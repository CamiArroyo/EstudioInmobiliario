/* DEFINICIÓN DE LAS FUNCIONES DE LA SECCIÓN "propiedades.html" */

//---------> MÉTODO READY: Todo esto ocurre una vez que el DOM ya fue generado

$(document).ready(function () {

    //Eliminar la propagación: cuando hago click en la cruz para borrar un elemento, no se cierra la ventana del carrito
    //Propagación (concepto): cuando hago un click adentro, por defecto, se propaga hacia el padre
    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });

    //Peticiones jquery: origen de la información local -> archivo "propiedades.json"
    $.get("../data/propiedades.json", function(datos, estado) {
        console.log(datos);
        console.log(estado);

        //Si obtuve la info correctamente, entonces agrego las propiedades
        if (estado == "success") {
            for (const literal of datos) {
                propiedades.push(new Propiedad(literal.actividad, literal.id, literal.calle, literal.numero, literal.tipo, literal.descripcion, literal.precio));
            }
        }
        console.log(propiedades);

    //Creo la interfaz dinámica (aquí porque es un proceso asíncrono)
    propiedadesUIjQuery(propiedades, '#propiedadesContenedor');
    })
})

//---------> MÉTODO LOAD APLICADO A WINDOW: Todo esto ocurre una vez que fueron cargados todos los elementos de la interfaz

//Desaparece el spinner de carga. Luego, aparece el buscador con filtros y las card de las propiedades
window.addEventListener("load", () => {
    $("#indicadorCarga").remove();
    $("#interfazPropiedadesDisp").fadeIn(1000, () => {
        console.log("Finalización de animación")
    });
})

//---------> FILTROS: filtro propiedades que cumplan si o si con todos los criterios

//Se generan los select
selectActUI(tipoActividad, "#filtroTipoActividad")
selectCatUI(tipoPropiedad, "#filtroTipoPropiedad")

//Método "click" asociado al botón "FILTRAR"
$("#buttonFiltros").click(function(e) {

    //1°) Obtengo el valor de los input
    actividad = $("#filtroTipoActividad").val().toUpperCase();
    console.log(actividad);
    tipo = $("#filtroTipoPropiedad").val().toUpperCase();
    console.log(tipo);
    min = $("#minProducto").val();
    console.log(min);
    max = $("#maxProducto").val();
    console.log(max);

    //2°) Filtro según los requisitos ingresados en todos los input
    $("#propiedadesContenedor").fadeOut(600, function() {
        $("#propiedadesContenedorInfo").empty();

        //Genero el array con las propiedades que cumplen los criterios
        const filtrados = propiedades.filter(propiedad => propiedad.actividad.toUpperCase() == actividad && 
                                            propiedad.precio >= min && propiedad.precio <= max && 
                                            propiedad.tipo.toUpperCase() == tipo);
        console.log(filtrados);

        //Si no hay propiedades según los filtros ingresados, se lo informa
        if (filtrados.length == 0) {
            console.log("NO hay propiedades")
            $("#propiedadesContenedorInfo").append(`<p>En este momento no hay propiedades disponibles de las características solicitadas.</p>`)
        }

        //Genero la interfaz con las propiedades filtradas que están en el array
        propiedadesUIjQuery(filtrados, "#propiedadesContenedor");

    }).fadeIn(600);
}) 

//Método "click" asociado al botón "LIMPIAR FILTROS"
$("#buttonLimpiarFiltros").click(function(e) {
    $("#propiedadesContenedorInfo").empty();

    $("#propiedadesContenedor").fadeOut(600, function() {

        //Genero un array con todas las propiedades, sin filtrar ninguna
        const noHayFiltrados = propiedades;
        console.log(noHayFiltrados);

        //Genero la interfaz con todas las propiedades
        propiedadesUIjQuery(noHayFiltrados, "#propiedadesContenedor");

    }).fadeIn(600);
})

//---------> FORMULARIO DE SOLICITUD: Si se seleccionó propiedades, permito enviar un formulario de solicitud

//Método "click" asociado al botón "ENVIAR SOLICITUD"
$("#buttonEnviarSoli").click(function(e) {
    $("#listaPropiedadesSoli").empty();
    $("#listaVaciaPropiedadesSoli").empty();

    if (carrito.length == 0) {
        $("#registroSolicitante").hide();
        $("#listaVaciaPropiedadesSoli").append(`<p>No ha seleccionado ninguna propiedad.</p>`)
    } else {
        $("#registroSolicitante").show();
        $("#listaPropiedadesSoli").append(`<p>Seleccionaste las siguientes propiedades:</p>`)
    }

    for (const propiedad of carrito) {
        $("#listaPropiedadesSoli").append(componenteCarritoForm(propiedad));
    }
    
})