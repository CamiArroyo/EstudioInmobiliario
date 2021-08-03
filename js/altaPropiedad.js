//Obtengo el formulario desde el DOM
const formulario = document.getElementById("registroPropiedad");

//Creo un array vacío donde ir guardando las propiedades
const propiedadesRegistradas = [];

//Le asocio a cada envío de formulario un evento para registrar esa propiedad en el Local Storage
formulario.addEventListener("submit", function(e) {

    //Evito que se refresque la página en cada envío de formulario <--IMPORTANTE
    e.preventDefault();

    //Solamente para controlar, con cada click en "registrar" me traigo el formulario
    console.log(formulario);
    
    //Obtengo los datos que se ingresaron en cada input (los inputs son los hijos del formulario)
    const inputs = formulario.children; //"inputs" es un array

    //Creo una nueva propiedad con esos datos
    const nueva = new Propiedad(inputs[0].value, 
                                inputs[1].value, 
                                inputs[2].value, 
                                inputs[3].value, 
                                inputs[4].value,
                                inputs[5].value);

    //Agrego la nueva propiedad al array de propiedades
    propiedadesRegistradas.push(nueva);

    //Agrego el array de propiedades al Local Storage bajo la clave "propiedades", con cada envío lo actualizo
    localStorage.setItem("propiedades", JSON.stringify(propiedadesRegistradas));

})