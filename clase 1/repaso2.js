// hacer un array de objetos con personajes que tengan nombre vida y un ataque hacer la funcion de ataque que gire dos dados y dependiendo de la suma de estos dos dados la efectividad del ataque (hasta el 6 efectividad del 50%, del 7 al 9 efectividad del 80%, 10 y 11 efectividad del 100% y 12 golpe critico efectividad 150%) tener dos personajes que se eligan aleatoriamente y vayan ejectuando la funcion de ataque hasata que uno gane (2 o 3 ataque falla).
const characters = [
    {
        nombre: 'caballero',
        vida: 150,
        ataque: 10
    },
    {
        nombre: 'maga',
        vida: 100,
        ataque: 17
    },
    {
        nombre: 'arquero',
        vida: 75,
        ataque: 22
    },
    {
        nombre: 'escudero',
        vida: 200,
        ataque: 5
    },
    {
        nombre: 'messi el asesino',
        vida: 50,
        ataque: 40
    }
];

const atacar = (character, enemy) => {
    const dadoAtaque1 = Math.floor(Math.random() *6 + 1);
    const dadoAtaque2 = Math.floor(Math.random() *6 + 1);
    const totalDados = dadoAtaque1 + dadoAtaque2;
    console.log(character.nombre + " ataca a " + enemy.nombre + " y saco un " + totalDados);
    if(totalDados <= 3){
        console.log("el total fue demasiado bajo el ataque fallo :(");
    }
    else {
        if(totalDados <= 6){
            enemy.vida = enemy.vida - character.ataque*0.5;
            console.log("el ataque tuvo un 50% de efectividad la vida del enemigo ahora es de " + enemy.vida);
        }
        else {
            if(totalDados <= 9){
                enemy.vida = enemy.vida - character.ataque*0.8;
                console.log("el ataque tuvo un 80% de efectividad la vida del enemigo ahora es de " + enemy.vida);
            }
            else {
                if(totalDados <= 11){
                    enemy.vida = enemy.vida - character.ataque;
                    console.log("el ataque tuvo un 100% de efectividad la vida del enemigo ahora es de " + enemy.vida);
                }
                else {
                    enemy.vida = enemy.vida - character.ataque*1.5;
                    console.log("golpe critico! el ataque tuvo un 150% de efectividad la vida del enemigo ahora es de " + enemy.vida);
                }
            }
        }
    }
}

const curacion = (character) => {
    //funcion curacion
    console.log("curacion");
}

const defensa = (character, enemy) => {
    //funcion defensa
    console.log("defensa");
}

const habilidad = (character, enemy, habilidad) => {
    if(habilidad == 0){
        // se ejecuta funcion curacion
        curacion(character);
    }
    else{
        // se ejecuta funcion defensa
        defensa(character, enemy);
    }
}

const game = (characters) => {
    //codigo de nuestro juego
    let character1 = characters[Math.floor(Math.random() *5)];
    console.log(character1);
    let character2 = characters[Math.floor(Math.random() *5)];
    console.log(character2);
    console.log("Bienvenido al juego:\n el personaje 1 es "+ character1.nombre + ". \n el personaje 2 es " + character2.nombre + ".");

    const numeroChar1 = Math.floor(Math.random() *2);
    if(numeroChar1 == 0){
        console.log("el personaje 1 saco la habilidad de curacion");
    }
    else {
        console.log("el personaje 1 saco la habilidad de defensa");
    }

    const numeroChar2 = Math.floor(Math.random() *2);
    if(numeroChar2 == 0){
        console.log("el personaje 2 saco la habilidad de curacion");
    }
    else {
        console.log("el personaje 2 saco la habilidad de defensa");
    }

    let dadoHabilidad1 = Math.floor(Math.random() *6 + 1)
    if (dadoHabilidad1 == 6){
        habilidad(character1, character2, numeroChar1);
    }
    else {
        atacar(character1, character2);
    }

    while(character1.vida > 0 && character2.vida > 0){

        let dadoHabilidad2 = Math.floor(Math.random() *6 + 1);
        if (dadoHabilidad2 == 6){
            habilidad(character2, character1, numeroChar2); 
        }
        else{
            atacar(character2, character1);
        }
        

        if(character1.vida > 0){

            dadoHabilidad1 = Math.floor(Math.random() *6 + 1)
            if (dadoHabilidad1 == 6){
                habilidad(character1, character2, numeroChar1);
            }
            else{
            atacar(character1, character2);
            }
        }

        else{
            console.log(character2.nombre + " es el ganador");
        }
    }

    if(character2.vida <= 0){
        console.log(character1.nombre + " es el ganador");
    }
}

game(characters);




// implementar defensa y curacion
// dependiendo del dado que saca el personaje al principo tiene la habilidad de curacion o defensa
// curaciones: se tira un dado de 6 caras si el dado saca un 6 se realiza la funcion de curacion y pierde el turno de ataque la cual consiste en tirar un dado de 6 caras y si saca del 4 al 6 se realiza una curacion de 30 puntos, si saca 2 o 3 se realiza una curacion de 10 puntos y si saca un 1 no se realiza ninguna curacion.
// defensa: se tira un dado de 6 caras si el dado saca un 6 se realiza la funcion de defensa y pierde el turno de ataque la cual consiste en tirar un dado de 6 caras y si saca del 4 al 6 se le quita al rival un 10% de danio de ataque, si saca 2 o 3 se le quita al rival un 5% de danio de ataque y si saca un 1 no se realiza ningun cambio al ataque del rival.