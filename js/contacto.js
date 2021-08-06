
const miSelect = document.getElementById("miSelect");
for (const propiedad of propiedades) {
    miSelect.innerHTML += "<option>" + propiedad.tipo + ": " + propiedad.calle + " " + propiedad.numero + " - Valor del alquiler: $" + propiedad.alquilerInicial + "</option>";
}