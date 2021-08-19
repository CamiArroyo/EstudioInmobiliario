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


//---------------------------> CREO EL FILTRO POR TIPO DE ACTIVIDAD <---------------------------

//1° generar select
selectActUI(tipoActividad, "#filtroTipoActividad")

//2° asociar el evento (podría ir en ready)
$("#filtroTipoActividad").change(function (e) { 
    $("#propiedadesContenedorInfo").empty();
    $("#propiedadesContenedor").fadeOut(600, function() {
        const value = e.target.value.toUpperCase();
        console.log(value); //hacemos esto para ver si funciona
        if(value === "Todas las acciones".toUpperCase()) {
            propiedadesUIjQuery(propiedades, "#propiedadesContenedor");
        } 
        else {
            const filtrados = propiedades.filter(propiedad => propiedad.actividad.toUpperCase() == value); //filtro los productos por tipo de actividad
            if (filtrados.length == 0) {
                console.log("NO hay propiedades") //hacemos esto para ver si funciona
                $("#propiedadesContenedorInfo").append(`<p>En este momento no hay propiedades disponibles para ${value}.</p>`);
            }
            propiedadesUIjQuery(filtrados, "#propiedadesContenedor"); //genero la interfaz
        }
    }).fadeIn(600);
});

//---------------------------> CREO EL FILTRO POR CATEGORÍAS <---------------------------

//1° generar select
selectCatUI(tipoPropiedad, "#filtroTipoPropiedad")

//2° asociar el evento (podría ir en ready)
$("#filtroTipoPropiedad").change(function (e) { 
    $("#propiedadesContenedorInfo").empty();
    $("#propiedadesContenedor").fadeOut(600, function() {
        const value = e.target.value.toUpperCase();
        console.log(value); //hacemos esto para ver si funciona
        if(value === "Todas las propiedades".toUpperCase()) {
            propiedadesUIjQuery(propiedades, "#propiedadesContenedor");
        } 
        else {
            const filtrados = propiedades.filter(propiedad => propiedad.tipo.toUpperCase() == value); //filtro los productos por categoría
            if (filtrados.length == 0) {
                console.log("NO hay propiedades") //hacemos esto para ver si funciona
                $("#propiedadesContenedorInfo").append(`<p>En este momento no hay propiedades disponibles de la categoría ${value}.</p>`);
            }
            propiedadesUIjQuery(filtrados, "#propiedadesContenedor"); //genero la interfaz
        }
    }).fadeIn(600);
});

//---------------------------> CREO EL FILTRO POR RANGO DE PRECIO <---------------------------

$(".inputPrecio").change(function (e) {
    $("#propiedadesContenedorInfo").empty(); 
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min > 0) && (max > 0)){ //el resulado de esto es verdadero
        const encontrados = propiedades.filter(propiedad => propiedad.precio >= min && propiedad.precio <= max);
        if (encontrados.length == 0) {
            console.log("NO hay propiedades") //hacemos esto para ver si funciona
            $("#propiedadesContenedorInfo").append(`<p>En este momento no hay propiedades disponibles entre $${min} y $${max}.</p>`)
        }
        propiedadesUIjQuery(encontrados, '#propiedadesContenedor');
    }
});

/*
let conjuntoFiltradosUno = propiedades;
let conjuntoFiltradosDos = [];
let conjuntoFiltradosTres = [];
let valueAct = "";
let valueCat = "";
let min = 8000;
let max = 50000;

selectActUI(tipoActividad, "#filtroTipoActividad");
$("#filtroTipoActividad").change(function (e) {  //filtro los productos por tipo de actividad
    valueAct = e.target.value.toUpperCase();
});

selectCatUI(tipoPropiedad, "#filtroTipoPropiedad");
$("#filtroTipoPropiedad").change(function (e) {  //filtro los productos por categoría
    valueCat = e.target.value.toUpperCase();
});

$(".inputPrecio").change(function (e) {
    min = $("#minProducto").val();
    max = $("#maxProducto").val();
});

$("#buttonFiltros").click(function() {

    if(valueAct == "Todas las acciones".toUpperCase()) {
        conjuntoFiltradosUno = propiedades;
    } 
    else {
        conjuntoFiltradosUno = propiedades.filter(propiedad => propiedad.actividad.toUpperCase() == valueAct); 
    }

    if(valueCat == "Todas las propiedades".toUpperCase()) {
        conjuntoFiltradosDos = conjuntoFiltradosUno;
    } 
    else {
        conjuntoFiltradosDos = conjuntoFiltradosUno.filter(propiedad => propiedad.tipo.toUpperCase() == valueCat); 
    }

    conjuntoFiltradosTres = conjuntoFiltradosDos.filter(propiedad => propiedad.precio >= min && propiedad.precio <= max);

    propiedadesUIjQuery(conjuntoFiltradosTres, '#propiedadesContenedor');
})
*/