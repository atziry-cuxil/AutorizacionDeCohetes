class Cohete {
    constructor(nombre, agencia, mision, combustible) {
        this.nombre = nombre;
        this.agencia = agencia;
        this.mision = mision;
        this.combustible = combustible;
        this.NoAutirizacion = (Math.floor(Math.random() * 10)) + Date.now()
        this.next = null
    }
}

class CohetesPendientes {

    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.lenght = 0;
    }

    peek() {
        return this.primero;
    }

    enqueue(nombre, agencia, mision, combustible) {//agrega al ultimo
        let nuevoCohete = new Cohete(nombre, agencia, mision, combustible)
        if (this.lenght == 0) {
            this.primero = nuevoCohete;
            this.ultimo = nuevoCohete;
        } else {
            // let temporal = this.ultimo
            // nuevoCohete.next = temporal
            this.ultimo.next = nuevoCohete
            this.ultimo = nuevoCohete
        }
        this.lenght++;
        return this;
    }

    dequeue() {//Borra el primero
        if (this.lenght != 0) {
            let temporal = this.primero.next;
            //let coheteDespegando = this.primero
            //coheteAutorizado.next = null;            
            this.primero = temporal
            this.lenght--;
            if (this.primero == null) {
                this.ultimo = null
            }
        }
            //return coheteDespegando;
        return this;
    }

    pintarLista(){
                                   ` <li class="list-group-item">
                                🚀 Falcon Heavy
                            </li>`
    }

}

class Historial {//Este podria ser un stack

    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.lenght = 0;
    }

    push(cohete) {
        if (this.lenght == 0) {
            this.primero = cohete;
            this.ultimo = cohete;
        } else {
            cohete.next = this.primero;
            this.primero = cohete;
        }
        this.lenght++
    }

    pintarHistorial(){

    }

}
//colocar un nuevo cohete cuando llenen el formulario y le den al botn agregar
const registroDeCohetesPendientes = new CohetesPendientes();
const historialDeAutorizados = new Historial();
let coheteFuera;

let form = document.querySelector('#formulario')
let inputNombre = document.querySelector('#Nombre')
let inputAgencia = document.querySelector('#Agencia')
let inputMision = document.querySelector('#Mision')
let selectCombustible = document.querySelector('#Combustible')

let contenedorLista = document.querySelector('#contenedorLista')
let contenedorHistorial = document.querySelector('#contenedorHistorial')
let coheteDespegando = document.querySelector('#coheteDespegando')
let coheteSiguiente = document.querySelector('#coheteSiguiente')

let btnRegistrar = document.querySelector('#Registrar')
let btnAutorizar = document.querySelector('#Autorizar')

btnRegistrar.addEventListener('click', (event) => {
    event.preventDefault()
    registroDeCohetesPendientes.enqueue(inputNombre.value, inputAgencia.value, inputMision.value, selectCombustible.value)
    form.reset()
    contenedorLista.innerHTML = registroDeCohetesPendientes.pintarLista()
    //console.log(registroDeCohetesPendientes)
})

btnAutorizar.addEventListener('click', (event) => {
    coheteDespegando.innerHTML = ''//pintar el peek; peek anterior
    coheteSiguiente.innerHTML = ''//pintar le peek.limpiar antes ; pell nuevo
    let coheteFuera = registroDeCohetesPendientes.peek()
    //console.log(coheteFuera)
    //console.log(registroDeCohetesPendientes.peek())
    coheteDespegando.innerHTML = `<h3>${coheteFuera.nombre}</h3>
                            <p>
                                <strong>Agencia:</strong> ${coheteFuera.agencia}
                            </p>
                            <p>
                                <strong>Misión:</strong> ${coheteFuera.mision}
                            </p>
                            <p>
                                <strong>Combustible:</strong> ${coheteFuera.combustible}
                            </p>
                            <hr>
                            <p class="status">
                                <i class="bi bi-broadcast"></i>
                                Estado: DESPEGANDO...
                            </p>`



    historialDeAutorizados.push(coheteFuera)
    historialDeAutorizados.pintarHistorial()//Que devulva un string, pintamos en la lista correspondiente.
    registroDeCohetesPendientes.dequeue()
    let  coheteAutorizado = registroDeCohetesPendientes.peek()
    //console.log(registroDeCohetesPendientes.peek())
    //console.log(coheteAutorizado)
    coheteSiguiente.innerHTML = `<h3>${coheteAutorizado.nombre}</h3>
                            <p>
                                <strong>Agencia:</strong>${coheteAutorizado.agencia} 
                            </p>
                            <p>
                                <strong>Misión:</strong> ${coheteAutorizado.mision}
                            </p>
                            <p>
                                <strong>Combustible:</strong> ${coheteAutorizado.combustible}
                            </p>
                            <hr>
                            <p class="status">
                                Estado: Pendiente...
                            </p>`

    console.log(registroDeCohetesPendientes)

    contenedorHistorial.innerHTML = historialDeAutorizados.pintarHistorial()
})

