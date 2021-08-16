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

//---------------------------> AGREGO LAS PROPIEDADES (HARDCODEO) <---------------------------

propiedades.push(new Propiedad(tipoActividad[1], 1, "Velez Sársfield", 780, tipoPropiedad[1], "Cocina comedor integrada, una habitación, baño y cochera.", 15000, "../img/edificio1.jpg"));
propiedades.push(new Propiedad(tipoActividad[0], 2, "San Martín", 310, tipoPropiedad[1], "Cocina comedor integrada, dos habitaciones, baño, garage y patio.", 18000, "../img/edificio2.jpg"));
propiedades.push(new Propiedad(tipoActividad[0], 3, "Alem", 132, tipoPropiedad[0], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 30000, "../img/casa1.jpg"));
propiedades.push(new Propiedad(tipoActividad[1], 4, "Sarmiento", 100, tipoPropiedad[2], "Local amplio con vidriera a la calle, cocina y baño.", 22000, "../img/localComercial.jpg"));
propiedades.push(new Propiedad(tipoActividad[0], 5, "Velez Sársfield", 780, tipoPropiedad[1], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 14000, "../img/edificio1.jpg"));
propiedades.push(new Propiedad(tipoActividad[1], 6, "Buenos Aires", 35, tipoPropiedad[0], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 35000, "../img/casa2.jpg"));

//---------------------------> CREO LA INTERFAZ DINÁMICA <---------------------------

propiedadesUIjQuery(propiedades, '#propiedadesContenedor');

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
            const filtrados = propiedades.filter(propiedad => propiedad.actividad.toUpperCase() == value); //filtro los productos por categoría
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