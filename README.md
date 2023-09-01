# Challenge Legendaryum

## `Programas necesarios`

- DOCKER 24.0.2
- DOCKER COMPOSE (V2) v2.18.1

## Puesta en Marcha

### Git

```bash
git clone
```

### Variables de entorno

> Como es un challenge decidi subir las variables entorno junto con el repositoro.
> Para hacer puesta en marcha mas facil.

### _El puerto por defecto en el `3001`_

```bash
 ls -a ./api_lengendaryum # linux
.env.local
```

### DOCKER

```bash
# para dejarlo en segundo plano
docker compose -f docker-compose.local.yaml up --build -d
# para dejarlo en primer plano
docker compose -f docker-compose.local.yaml up --build
# para ver los log
docker logs api_local -f
# para aceder a Reddis
docker exec -it redis_local redis-cli
```

---

## Primeros pasos

Apenas levante el servidor cargara una **habitacion** con sus 9 **monedas**

> Las **habitaciones** que se creen tendran tienen la siguientes especificaciones:

- id
- nombre
- dimensiones con un limite de **_X100-Y100-Z100_**
- un array con los ids de las monedas
- un array vacio para las personas que se conecten
- la cantidad de monedas.
- la duracion de la vida util de las monedas (**1 hora**)
  > Las **Monedas** que se cree tendran las siguientes especificaciones:
- id
- nombre
- dimensiones con un limite de **_X1-Y1-Z1_**
- posicionamiento con el limite de la **habitacion** asignada **_X1-Y1-Z1_**
- id de habitacion
- id de la futura persona a unir
- el mecanismo de _REDIS_ TLL

---

## CRON (`node cron` )

> Se resolvio la manera de restaturar las monedas borradas por TLL.

    con las siguientes formas

- la **habitacion** tiene una propiedad de tiempo que al momento de su creacion se le adelanto (**1 hora**)
- al pasar la hora se borran las **Monedas** por TLL.
- cada un minuto se avalua la vida util de las **Monedas** .
- si se expira el tiempo se crearan nuevas **Monedas** .
- se respetara el espacio de la **habitacion**.
- se posicionaran de forma aleatoriamente.
- se validan las posiciones para que no haya coliciones.
- se le pondra TLL para que se expire en (**1 hora**).
- se actualizara la propiedad de tiempo para el ciclo se repita.

---

## Documentacion (`SWAGGER POSTMAN`)

> Si se puedo mantener el PUERTO _3001_ puede acceder al swagger con el siguiente link: [SWAGGER](http://localhost:3001/docs) sino http://localhost:{{PUERTO}}/docs

> Si desea utilizar Postman le dejo esta ruta.
> en las carpetas estaran las rutas para poder colsultar

```bash
 cd api_legendaryum/src/api/doc
 ls
 # coin person room
```

### Las validaciones para **habitacion** son:

- no se puede repetir el nombre de las **habitaciones**
- minimo de 5 **Monedas** y 10 de maximo.
- no se pueden repetir las cordenadas de las **Monedas** .
- se validara las propiedad y el tipo del body

### Las respuestas siempre tendran el mismo formato:

```js
{
  content: "ejemplo";
}
{
  content: [];
}
{
  content: 1;
}
{
  content: {
    length: 1;
  }
}
```

### Tanto en Swagger como en los archivos de doc hay ejemplos.

---

## SOCKET . IO

> Lo primero es quien manda la primera señal, y el from es el encargado de hacer la tarea pero como solo estoy haciendo back te explicare como lo implemente.

```js
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");
// ahora es momento de enviar la primera señal

  socket.on("roomChoise", (response) => {
    console.log(respose.content); //['uuid','uuid']
  });

/**
 con la primera señal el backend nos dara un array de ids de habitaciones
**/
/**
 ahora hay que elegir una habitacion y un nombre que sera con este formato
**/
const miDecision = {roomId:"string",namePerson:"string"}

const handleOnSubmit = (event) => {
    e.preventDefault();
    //esta accion creara un usuario y se le unira con una habitacion.
    socket.emit("createAndSearch", miDecision);
  };

/**
 Ahora puede pasar dos cosas todo sale bien y recibimos
 la habitacion o puede salir un error.
 Por esos hay que tener dos se señales una para los aciertos
 y otra para los errores
**/

// capturador de Error
  socket.on("receivingNameAndId", (error) => {
    console.log(error.content);//<= string
// mensaje del error  ^^^^^^^   y  como se soluciona.
  });

// capturador de Exito

 socket.on("search", (find) => {
    console.log(find.content);
  });
//ahora te mostrare que tiene find.content
/** el objeto se divide en informacion privada y publica
el objeto "room" es visible con las demas personas conectadas a  la
habitacion y el objeto "person" solo lo es visible por el usuario que lo
creo.
*/
const result = {
    person: {
        "namePerson": "Ezequiel", // el usuario que elegiste
        "positionOfPersonInXYZ": "X1-Y1-Z1", // la posicion donde comenzas
        "idPerson": "aa21ad76-15e2-48d6-b7f5-f29eeba5c9be", // tu id
        "obtainingCoin": false, // se pondra en true si agaraste una moneda
        "acquiredCoins": [] //tu lista de monedas
    },
    room: {
        "idRoom": "aaa37f28-b6f1-4977-9957-116d23c3d65c",//id de la habitacion
        "nameRoom": "cubo", // el nombre elegido por el admin
        "dimensionRoom": "X50-Y50-Z50", //los limites de la habitacion
        "coinPositionsInRoom": [
            "X31-Y22-Z17", // todas las posiciones de las monedas!!!!
            "X46-Y33-Z49",
            "X32-Y13-Z7",
            "X48-Y1-Z49",
            "X6-Y15-Z41",
            "X25-Y12-Z18",
            "X33-Y28-Z24",
            "X34-Y6-Z31",
            "X35-Y17-Z18"
        ]
    }
}

/*
Asi comienza el cirquito yo mando la constante busqueda y
me da el mismo objeto pero actualizado con mis movimientos.
*/
const busqueda = {
	idPerson:"aa21ad76-15e2-48d6-b7f5-f29eeba5c9be",
	positionOfPersonInXYZ:"X1-Y10-Z1"
 }
  const handleOnclikFind = (e) => {
    e.preventDefault();
    socket.emit("search",busqueda);
  };

/**
esto tiene una condicion:
 no se puede ir mas de los limites, porque si te vas te regresare al limite
 permitido.
**/

/* si tus coordenadas coindiciden con unas de las monedas,
  automaticamente se te sumara su id a tu array,
  ademas a todos los usuarios vinculado a la habitacion,
  se le modificara el objeto "room",
  haciendo que  la moneda desaparezca para ellos y para vos pero ya la tenes en tu array.
*/

const result = {
    person: {
        "namePerson": "Ezequiel", /
        "positionOfPersonInXYZ":"X31-Y22-Z17",
        "idPerson": "aa21ad76-15e2-48d6-b7f5-f29eeba5c9be", // tu id
        "obtainingCoin": true, // se puso en true
        "acquiredCoins": [ "bb21ffd76-95e2-4416-b7d5-f29edasd"]//se sumo uno
    },
    room: {
        "idRoom": "aaa37f28-b6f1-4977-9957-116d23c3d65c",//id de la habitacion
        "nameRoom": "cubo", // el nombre elegido por el admin
        "dimensionRoom": "X50-Y50-Z50", //los limites de la habitacion
        "coinPositionsInRoom": [
				            // se elimino uno!!!!
            "X46-Y33-Z49",
            "X32-Y13-Z7",
            "X48-Y1-Z49",
            "X6-Y15-Z41",
            "X25-Y12-Z18",
            "X33-Y28-Z24",
            "X34-Y6-Z31",
            "X35-Y17-Z18"
        ]
    }
}

/* paso aclarar que pueden haber muchas habitaciones con muchas personas */

```

# Quiero agradecer al equipo de Legendaryum por darme la oportunidad de participar en este Challenge!!!
