//PRIMERA + SEGUNDA ENTREGA DEL PROYECTO FINAL

//Definición de funciones

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

//-----------------------------PRIMERA PARTE: AGREGO LAS PROPIEDADES (HARDCODEO + LOCAL STORAGE)-----------------------------

const propiedades = [];
const asignacionPropiedad = [];

//Propiedades hardcodeadas
propiedades.push(new Propiedad(1, "Velez Sársfield", 780, "Departamento", "Cocina comedor integrada, una habitación, baño y cochera.", 15000, "../img/edificio1.jpg"));
propiedades.push(new Propiedad(2, "San Martín", 310, "Departamento", "Cocina comedor integrada, dos habitaciones, baño, garage y patio.", 18000, "../img/edificio2.jpg"));
propiedades.push(new Propiedad(3, "Alem", 132, "Casa", "Comedor amplio, cocina separada, dos habitaciones, dos baños, garage y patio amplio.", 30000, "../img/casa1.jpg"));
propiedades.push(new Propiedad(4, "Sarmiento", 100, "Local comercial", "Local amplio con vidriera a la calle, cocina y baño.", 22000, "../img/localComercial.jpg"));

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

for (const propiedad of propiedades) {
    //1° crear la etiqueta
    let divPropiedad = document.createElement("div");
    divPropiedad.classList.add("propiedadDisp");
    //2° definir el interior de la etiqueta
    divPropiedad.innerHTML = `<h3 class="tituloPropiedad">Calle: ${propiedad.calle} ${propiedad.numero}</h3>
                                <p class="infoPropiedad">Tipo de propiedad: ${propiedad.tipo}</p>
                                <p class="infoPropiedad">Valor del alquiler: $${propiedad.alquilerInicial}</p>
                                <img src="${propiedad.img}" width="150px" height="150px">
                                <button id="${propiedad.id}" class="btnProp">MÁS INFORMACIÓN</button>`
    //3° agregar la etiqueta al HTML
    document.getElementById("propiedadesDisp").appendChild(divPropiedad);
}

//-----------------------------TERCERA PARTE: CREACIÓN DE EVENTO + INTERFAZ DINÁMICA-----------------------------

seccionActual = document.getElementById("seleccionProp");

let idProp = "";

function seleccionPropiedad() {
    idProp = this.id;
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

    let linkFormulario = document.createElement("div");
    linkFormulario.classList.add("padreLinkFormulario");
    linkFormulario.innerHTML = `<a href="contacto.html#formulario" class="linkFormulario">IR AL FORMULARIO DE SOLICITUD</a>`
    seccionActual.appendChild(linkFormulario);

}

//1° acceder a los elementos
const botones = document.getElementsByClassName("btnProp");
console.dir(botones); 
//2° definirle el mismo evento a todos esos botones
for (const boton of botones) {
    boton.addEventListener("click", seleccionPropiedad);
}
