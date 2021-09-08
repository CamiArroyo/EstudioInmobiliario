/* DEFINICIÓN DE LA CLASE "PROPIEDAD" Y SUS MÉTODOS ASOCIADOS */

class Propiedad {
    constructor (actividad, id, calle, numero, tipo, descripcion, precio) {
        this.actividad = actividad.toUpperCase();
        this.id = id;
        this.calle = calle.toUpperCase();
        this.numero = parseInt(numero);
        this.tipo = tipo.toUpperCase();
        this.descripcion = descripcion;
        this.precio = parseInt(precio);
    }

    //Muestra los datos completos de la propiedad
    mostrar() {
        return "Propiedad N° " + this.id +
                "\nTipo: " + this.tipo +
                "\nActividad: " + this.actividad +
                "\nCalle: " + this.calle + " " + this.numero +
                "\nDescripción: " + this.descripcion +
                "\nValor: " + this.precio
    }

    //Si la propiedad se vende, muestra el valor en pesos argentinos
    //Si la propiedad se alquila, muestra el valor en dólares
    mostrarValor() {
        if (this.actividad == "COMPRAR") {
            return this.precio + "USD" ;
        }
        if (this.actividad == "ALQUILAR") {
            return "$" + this.precio ;
        }
    }

    //Si la propiedad se vende, se informa que existen medios de financiación
    //Si la propiedad se alquila, se informa el monto de los honorarios a abonar y las cuotas
    mostrarHonorarios() {
        if (this.actividad == "COMPRAR") {
            return "Comunicate con nosotros para conocer plazos de pago y medios de financiación." ;
        }
        if (this.actividad == "ALQUILAR") {
            //Honorarios: el 5% del total del contrato, a pagar hasta en 4 cuotas
            let porcentaje = (this.precio * 36 * 0.05);
            let honorarios = 
            "El monto total de los honorarios a abonar es: $" + porcentaje + "." +
            "\nPodrás abonar en 1 pago de $" + porcentaje + "." +
            "\nEn dos cuotas de $" + (porcentaje / 2) + "." +
            "\nEn tres cuotas de $" + (porcentaje / 3) + "." +
            "\nO en cuatro cuotas de $" + (porcentaje / 4) + "."
            return honorarios;
        }
    }
}