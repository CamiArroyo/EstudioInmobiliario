//Definición de la clase Inquilino

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