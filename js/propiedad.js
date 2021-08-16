//Definición de la clase Propiedad

class Propiedad {
    constructor (actividad, id, calle, numero, tipo, descripcion, precio, img) {
        this.actividad = actividad.toUpperCase();
        this.id = id;
        this.calle = calle.toUpperCase();
        this.numero = parseInt(numero);
        this.tipo = tipo.toUpperCase();
        this.descripcion = descripcion;
        this.precio = parseInt(precio);
        this.img = img;
    }

    mostrar() {
        return "Propiedad N° " + this.id +
                "\nCalle: " + this.calle + " " + this.numero +
                "\nTipo: " + this.tipo +
                "\nDescripción: " + this.descripcion +
                "\nAlquiler inicial: $" + this.precio
    }

    montoHonorarios() {
        //corresponde al 5% del total del contrato
        return "El monto de los honorarios a abonar es: $" + this.precio * 36 * 0.05 ;
    }

    montoHonorariosValor() {
        //corresponde al 5% del total del contrato, pudiendo pagarse en 1, 2, 3 o 4 cuotas
        const honorarios = [];
        honorarios.push(this.precio * 36 * 0.05);
        honorarios.push((this.precio * 36 * 0.05) / 2);
        honorarios.push((this.precio * 36 * 0.05) / 3);
        honorarios.push((this.precio * 36 * 0.05) / 4);
        return honorarios;
    }
}