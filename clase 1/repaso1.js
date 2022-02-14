// decalraciones de variables en javascript: const variable cosntante que no cambia en el tiempo y let variable que va a cambiar. var NO lo usamos es obsoleto (para hacer salto de linea alt+z)
// tipos de variables:
// -string cadena de caracters 'Hola',
// -int numeros enteros
// -float numeros con decimales
// -objetos {variable1, variable2}
// -arrays [string, string]

const nombre = 'Jon';
const persona = {
    nombre: 'Jon',
    edad: 20,
    hobbies: ['Musica 🎸', 'Programar'],
};

const personas = [
    {
        nombre: 'Jon',
        edad: 20,
        hobbies: ['Musica 🎸', 'Programar'],
    },
    {
        nombre: 'Messi',
        edad: 33,
        hobbies: ['Futbol'],
    }
];

const esMayor = (persona) => {
    //si (tal cosa) { entonces} sino {}
    if (persona.edad >= 21){
        console.log("es mayor!");
    }
    else{
        console.log('es menor!');
    }
}


// esMayor(personas[0]);
// esMayor(personas[1]);

// for(let i = 0; i < personas.length; i++) {
//     console.log(personas[i].nombre);
//     esMayor(personas[i]);
// }
personas.forEach(persona => {
    console.log(persona.nombre);
});