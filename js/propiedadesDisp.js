//---------------------------> MÉTODO READY <---------------------------

$(document).ready(function () { //Todo esto ocurre una vez que el DOM ya fue generado

    //1) Obtener propiedades desde el localStorage

    if ("propiedades" in localStorage) { 
        console.log("Existe la clave");
        const guardados = JSON.parse(localStorage.getItem("propiedades")); 
        console.log(guardados);
        for (const propiedad of guardados) {
            propiedades.push(new Propiedad(propiedad.id, propiedad.calle, propiedad.numero, propiedad.tipo, propiedad.descripcion, propiedad.precio, propiedad.img));
        }
    }

    //2) Eliminar la propagación: cuando hago click en la cruz para borrar un elemento, no se cierra la ventana el carrito

    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation(); //Propagación: cuando hago un click adentro, por defecto, se propaga hacia el padre
    });

    //3) Peticiones jquery: origen de la información local -> archivo "propiedades.json"
    $.get("../data/propiedades.json", function(datos, estado) {
        console.log(datos);
        console.log(estado);
        if (estado == "success") { //verifico haber obtenido la info correctamente
            for (const literal of datos) {
                propiedades.push(new Propiedad(literal.actividad, literal.id, literal.calle, literal.numero, literal.tipo, literal.descripcion, literal.precio));
            }
        }
        console.log(propiedades);
    //Creo la interfaz dinámica (aquí porque es un proceso asíncrono)
    propiedadesUIjQuery(propiedades, '#propiedadesContenedor');
    })

})

//---------------------------> MÉTODO LOAD APLICADO A WINDOW <---------------------------

window.addEventListener("load", () => { //Todo esto ocurre una vez que fueron cargados todos los elementos de la interfaz
    //Desaparece el spinner de carga
    $("#indicadorCarga").remove();
    //Aparecen las propiedades
    $("#propiedadesContenedor").fadeIn(1000, () => {
        console.log("Finalización de animación")
    });
})

//---------------------------> FILTROS <---------------------------

//1° generar select
selectActUI(tipoActividad, "#filtroTipoActividad")

//1° generar select
selectCatUI(tipoPropiedad, "#filtroTipoPropiedad")


$("#buttonFiltros").click(function(e) {
    actividad = $("#filtroTipoActividad").val().toUpperCase();
    console.log(actividad);
    tipo = $("#filtroTipoPropiedad").val().toUpperCase();
    console.log(tipo);
    min = $("#minProducto").val();
    console.log(min);
    max = $("#maxProducto").val();
    console.log(max);
    
    $("#propiedadesContenedor").fadeOut(600, function() {
        $("#propiedadesContenedorInfo").empty();

        const filtrados = propiedades.filter(propiedad => propiedad.actividad.toUpperCase() == actividad && 
                                            propiedad.precio >= min && propiedad.precio <= max && 
                                            propiedad.tipo.toUpperCase() == tipo);
        console.log(filtrados);

        if (filtrados.length == 0) {
            console.log("NO hay propiedades")
            $("#propiedadesContenedorInfo").append(`<p>En este momento no hay propiedades disponibles de las características solicitadas.</p>`)
        }
        propiedadesUIjQuery(filtrados, "#propiedadesContenedor");
        
    }).fadeIn(600);
}) 

$("#buttonLimpiarFiltros").click(function(e) {
    $("#propiedadesContenedorInfo").empty();
    $("#propiedadesContenedor").fadeOut(600, function() {

        const noHayFiltrados = propiedades;
        console.log(noHayFiltrados);

        propiedadesUIjQuery(noHayFiltrados, "#propiedadesContenedor");
        
    }).fadeIn(600);
})

//---------------------------> ENVÍO DE FORMULARIO DE SOLICITUD CON SELECCIÓN DE PROPIEDADES <---------------------------

$("#buttonEnviarSoli").click(function(e) {
    $("#listaPropiedadesSoli").empty();
    envioFormularioSolicitud();
})
