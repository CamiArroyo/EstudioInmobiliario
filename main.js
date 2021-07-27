//PRIMERA ENTREGA DEL PROYECTO FINAL

//Definición de clases

class Inquilino {
    constructor (nombre, dni, fechaNac, telefono) {
        this.nombre = nombre;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.telefono = telefono;
    }

    mostrar() {
        return "Nombre: " + this.nombre +
                "\nDNI: " + this.dni +
                "\nFecha de nacimiento: " + this.fechaNac +
                "\nTeléfono: " + this.telefono 
    }
}

class Propiedad {
    constructor (id, calle, numero, tipo, alquilerInicial) {
        this.id = id;
        this.calle = calle;
        this.numero = parseInt(numero);
        this.tipo = tipo;
        this.alquilerInicial = parseInt(alquilerInicial);
    }

    mostrar() {
        return "Propiedad N° " + this.id +
                "\nCalle: " + this.calle +
                "\nNúmero: " + this.numero +
                "\nTipo: " + this.tipo +
                "\nAlquiler inicial: $" + this.alquilerInicial
    }

    todosAlquileres() {
        //Considerando un contrato de 3 años, con aumento anual del 30%
        let primerPeriodo = this.alquilerInicial;
        let segundoPeriodo = primerPeriodo * 1.3;
        let tercerPeriodo = segundoPeriodo * 1.3;
        return "El primer año pagarás: $" + primerPeriodo + 
                "\nEl segundo año pagarás: $" + segundoPeriodo + 
                "\nEl tercer año pagarás: $" + tercerPeriodo;
    }

    montoHonorarios() {
        //corresponde al 5% del total del contrato
        return this.alquilerInicial * 36 * 0.05 ;
    }
}

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

//Programa principal

const propiedades = [];
const asignacionPropiedad = [];
propiedades.push(new Propiedad(1, "Velez Sársfield", 780, "Departamento", 15000));
propiedades.push(new Propiedad(2, "San Martín", 310, "Departamento", 17000));
propiedades.push(new Propiedad(3, "Alem", 132, "Casa", 30000));
propiedades.push(new Propiedad(4, "Sarmiento", 100, "Local comercial", 22000));

/*
alert("Mostramos a continuación las propiedades disponibles en este momento")
alert(mostrarTodos(propiedades));

let opcionMuestra = prompt("Ingrese 1 si desea buscar una propiedad por número de propiedad, o 2 si desea buscar en un rango de precios");
const propiedadEncontrada = buscarPropiedad(parseInt(opcionMuestra));

if (propiedadEncontrada != 0) {
    asignacionPropiedad.push(propiedadEncontrada);
    alert("Ya ha seleccionado una propiedad. Ahora ingrese sus datos personales")
    asignacionPropiedad.push(new Inquilino(prompt("Ingrese nombre y apellido:"), prompt("Ingrese DNI:"), prompt("Ingrese fecha de nacimiento:"), prompt("Ingrese número de teléfono:")));
    alert("ENTONCES LA PROPIEDAD SELECCIONADA ES:\n\n" + asignacionPropiedad[0].mostrar());
    alert("EL VALOR DEL ALQUILER A ABONAR ES:\n\n" + asignacionPropiedad[0].todosAlquileres());
    alert("LOS HONORARIOS A ABONAR SON:\n\n" + "$" + asignacionPropiedad[0].montoHonorarios());
    alert("TUS DATOS PERSONALES SON:\n\n" + asignacionPropiedad[1].mostrar());
    alert("Muchas gracias por visitarnos! Nos comunicaremos pronto con usted!");
} else {
    alert("No ha seleccionado ninguna propiedad. Debe comenzar de nuevo")
}
*/

let mensajeBienvenida = document.getElementById("tituloBienvenida");

//1° crear la etiqueta
let tituloBienvenida = document.createElement("h2");
//1° definir el interior de la etiqueta
let nombre = prompt("Ingrese su nombre");
tituloBienvenida.innerHTML = "Bienvenid@ " + nombre + ". Te presentamos a continuación las propiedades disponibles.";
//3° agregar la etiqueta al HTML
mensajeBienvenida.appendChild(tituloBienvenida);

let seccionPropiedades = document.getElementById("propiedadesDisp");

for (const propiedad of propiedades) {
    //1° crear la etiqueta
    let divPropiedad = document.createElement("div");
    divPropiedad.classList.add("propiedadDisp");
    //2° definir el interior de la etiqueta
    divPropiedad.innerHTML = `<h3 class="tituloPropiedad">Calle: ${propiedad.calle} ${propiedad.numero}</h3>
                                <p class="infoPropiedad">Tipo de propiedad: ${propiedad.tipo}</p>
                                <p class="infoPropiedad">Valor del alquiler: ${propiedad.alquilerInicial}</p>`
    //3° agregar la etiqueta al HTML
    seccionPropiedades.appendChild(divPropiedad);
}