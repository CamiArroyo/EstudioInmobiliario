//-----------------------------PRIMERA PARTE: AGREGO LAS PROPIEDADES (HARDCODEO + LOCAL STORAGE)-----------------------------

//Propiedades hardcodeadas
propiedades.push(new Propiedad(1, "Velez Sársfield", 780, tipoPropiedad[1], "Cocina comedor integrada, una habitación, baño y cochera.", 15000, "../img/edificio1.jpg"));
propiedades.push(new Propiedad(2, "San Martín", 310, tipoPropiedad[1], "Cocina comedor integrada, dos habitaciones, baño, garage y patio.", 18000, "../img/edificio2.jpg"));
propiedades.push(new Propiedad(3, "Alem", 132, tipoPropiedad[0], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 30000, "../img/casa1.jpg"));
propiedades.push(new Propiedad(4, "Sarmiento", 100, tipoPropiedad[2], "Local amplio con vidriera a la calle, cocina y baño.", 22000, "../img/localComercial.jpg"));
propiedades.push(new Propiedad(5, "Velez Sársfield", 780, tipoPropiedad[1], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 14000, "../img/edificio1.jpg"));
propiedades.push(new Propiedad(6, "Buenos Aires", 35, tipoPropiedad[0], "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 30000, "../img/casa2.jpg"));

//Agrego propiedades desde el Local Storage
if ("propiedades" in localStorage) { 
    console.log("Existe la clave");
    const guardados = JSON.parse(localStorage.getItem("propiedades")); 
    console.log(guardados);
    for (const propiedad of guardados) {
        propiedades.push(new Propiedad(propiedad.id, propiedad.calle, propiedad.numero, propiedad.tipo, propiedad.descripcion, propiedad.alquilerInicial, propiedad.img));
    }
}

//-----------------------------SEGUNDA PARTE: CREO LA INTERFAZ DINÁMICA-----------------------------

propiedadesUIjQuery(propiedades, '#propiedadesContenedor');

//-----------------------------TERCERA PARTE: MOSTRAR INFORMACIÓN DE LA PROPIEDAD-----------------------------

const botonesInfo = $(".btnProp");
for (const boton of botonesInfo) {
    boton.onclick = seleccionPropiedad;
}

//-----------------------------CUARTA PARTE: SOLICITAR PROPIEDAD-----------------------------

const botonesSolicitud = $(".btnSoli");
for (const boton of botonesSolicitud) {
    boton.onclick = solicitudPropiedad;
}