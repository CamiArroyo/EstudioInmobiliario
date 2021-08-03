//Definición de la clase Propiedad

class Propiedad {
    constructor (id, calle, numero, tipo, alquilerInicial, img) {
        this.id = id;
        this.calle = calle;
        this.numero = parseInt(numero);
        this.tipo = tipo;
        this.alquilerInicial = parseInt(alquilerInicial);
        this.img = img;
    }

    mostrar() {
        return "Propiedad N° " + this.id +
                "\nCalle: " + this.calle + " " + this.numero +
                "\nTipo: " + this.tipo +
                "\nAlquiler inicial: $" + this.alquilerInicial
    }

    montoHonorarios() {
        //corresponde al 5% del total del contrato
        return "El monto de los honorarios a abonar es: $" + this.alquilerInicial * 36 * 0.05 ;
    }

    montoHonorariosValor() {
        //corresponde al 5% del total del contrato
        return this.alquilerInicial * 36 * 0.05 ;
    }
}