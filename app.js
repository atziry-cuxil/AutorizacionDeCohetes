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
        if (this.primero != null) {
            let peek = `<h3>${this.primero.nombre}</h3>
                            <p>
                                <strong>Agencia:</strong>${this.primero.agencia} 
                            </p>
                            <p>
                                <strong>Misión:</strong> ${this.primero.mision}
                            </p>
                            <p>
                                <strong>Combustible:</strong> ${this.primero.combustible}
                            </p>
                            <hr>
                            <p class="status">
                                Siguinte en fila
                            </p>`
            return peek;
        } else {
            return 'No hay cohete pendiente...'
        }

    }

    peek2() {
        return this.primero;
    }

    enqueue(nombre, agencia, mision, combustible) {//agrega al ultimo
        let nuevoCohete = new Cohete(nombre, agencia, mision, combustible)

        if (this.lenght == 0) {
            this.primero = nuevoCohete;
            this.ultimo = nuevoCohete;
        } else {
            this.ultimo.next = nuevoCohete
            this.ultimo = nuevoCohete
        }
        this.lenght++;
        return this;
    }

    dequeue() {//Borra el primero
        if (this.lenght != 0) {

            let temporal = this.primero.next;
            this.primero = temporal
            this.lenght--;

            if (this.primero == null) {
                this.ultimo = null
            }

        }
        return this;
    }

    pintarLista() {
        let contador = 1;
        let html = ""
        let actual = { ...this.primero }
        while (contador <= this.lenght) {
            html += ` <li class="list-group-item">
                        🚀 ${actual.nombre}
                    </li>`
            let temporal = actual.next
            actual = temporal
            contador++
        }
        if (html.length == 0) {
            return 'No hay cohetes pendientes'
            //btnAutorizar.classList.add('d-none')
        }
        return html
    }

}

class Historial {//Este podria ser un stack

    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.lenght = 0;
    }

    peek() {
        if (this.primero.nombre != null) {

            let peek = `<h3>${this.primero.nombre}</h3>
                            <p>
                                <strong>Agencia:</strong> ${this.primero.agencia}
                            </p>
                            <p>
                                <strong>Misión:</strong> ${this.primero.mision}
                            </p>
                            <p>
                                <strong>Combustible:</strong> ${this.primero.combustible}
                            </p>
                            <hr>
                            <p class="status">
                                <i class="bi bi-broadcast"></i>
                                Estado: DESPEGANDO...
                            </p>`

            return peek;
        } else {
            return 'No hay ningun cohete despegando  <br>🚀'
        }

    }

    push(cohete) {
        if (this.lenght == 0) {
            this.primero = cohete;
            this.ultimo = cohete;
        } else {
            let temporal = this.primero;
            this.primero = cohete;
            this.primero.next = temporal

            //cohete.next = this.primero;
            //this.primero = cohete;
        }
        this.lenght++

        return this;
    }

    pintarHistorial() {
        let contador = 1;
        let actual = { ...this.primero };
        let html = ''
        while (contador <= this.lenght) {
            // if (contador == 1) {
            //     html += `<tr>
            //             <td>${actual.nombre}</td>
            //              <td>${actual.agencia}</td>
            //             <td>${actual.mision}</td>
            //             <td>${actual.NoAutirizacion}</td>
            //             <td>
            //                 <span class="badge bg-warning text-dark">
            //                     Pendiente...
            //                 </span>
            //             </td>
            //         </tr>`
            // } else {
            html += `<tr>
                        <td>${actual.nombre}</td>
                         <td>${actual.agencia}</td>
                        <td>${actual.mision}</td>
                        <td>${actual.NoAutirizacion}</td>
                        <td>
                            <span class="badge bg-success">
                                Completado
                            </span>
                        </td>
                    </tr>`
            //}
            let temporal = actual.next
            actual = temporal
            contador++
        }

        return html;

    }

}

const registroDeCohetesPendientes = new CohetesPendientes();
const historialDeAutorizados = new Historial();

let form = document.querySelector('#formulario')
let inputNombre = document.querySelector('#Nombre')
let inputAgencia = document.querySelector('#Agencia')
let inputMision = document.querySelector('#Mision')
let selectCombustible = document.querySelector('#Combustible')

let contenedorLista = document.querySelector('#contenedorLista')
let contenedorHistorial = document.querySelector('#contenedorHistorial')
let coheteDespegando = document.querySelector('#coheteDespegando')
let coheteSiguiente = document.querySelector('#coheteSiguiente')
let contenedorDespegue = document.querySelector('#contenedorDespegue')

let btnRegistrar = document.querySelector('#Registrar')
let btnAutorizar = document.querySelector('#Autorizar')

let trMensaje = document.querySelector('#mensaje')

btnRegistrar.addEventListener('click', (event) => {
    event.preventDefault()
    contenedorHistorial.innerHTML = ''
    contenedorLista.innerHTML = ''
    registroDeCohetesPendientes.enqueue(inputNombre.value, inputAgencia.value, inputMision.value, selectCombustible.value)
    contenedorLista.innerHTML = registroDeCohetesPendientes.pintarLista()
    coheteSiguiente.innerHTML = registroDeCohetesPendientes.peek()
    form.reset()
})

btnAutorizar.addEventListener('click', (event) => {
    trMensaje.classList.add('d-none')
    coheteDespegando.innerHTML = ''
    coheteSiguiente.innerHTML = ''
    contenedorLista.innerHTML = ''
    let coheteFuera = { ...registroDeCohetesPendientes.peek2() }
    if (coheteFuera.nombre != undefined) {
        btnAutorizar.classList.add('d-none')
        contenedorDespegue.classList.remove('d-none')
        historialDeAutorizados.push(coheteFuera)
        coheteDespegando.innerHTML = historialDeAutorizados.peek();
        hablar(`Despegue del Cohete: ${coheteFuera.nombre} con la mision de ${coheteFuera.mision}`)
        hablar(`Numero de autorizacion: ${coheteFuera.NoAutirizacion}`)
        hablar(" 5, 4, 3, 2, 1... Despegue!!!");
        setTimeout(() => {
            contenedorDespegue.classList.add('d-none')
            btnAutorizar.classList.remove('d-none')
            contenedorHistorial.innerHTML = ''
            contenedorHistorial.innerHTML = historialDeAutorizados.pintarHistorial()
        }, 20000)
    } else {
        coheteDespegando.innerHTML = 'NO hay cohetes despegando'
    }
    registroDeCohetesPendientes.dequeue()
    coheteSiguiente.innerHTML = registroDeCohetesPendientes.peek()
    contenedorLista.innerHTML = registroDeCohetesPendientes.pintarLista();
})

function hablar(texto) {
    const mensaje = new SpeechSynthesisUtterance(texto)
    mensaje.lang = "es-ES"
    mensaje.rate = 1
    mensaje.pitch = 1
    speechSynthesis.speak(mensaje)
}

