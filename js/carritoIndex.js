
const carritoDeCompras = []

const carritoIndex = (productoId)=>{

    const contenedorCarrito = document.getElementById("carrito-contenedor")

    const renderProductosCarrito = ()=> {
        let producto  = catalogoHombres.find( producto => producto.id == productoId )
        carritoDeCompras.push(producto)
        console.log(carritoDeCompras);

        // producto.cantidad = 1

        let div = document.createElement("div")
        // div.classList.add("productoEnCarrito")

        div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p> 
                        <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                        <button id="eliminar${producto.id}" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>`;
        contenedorCarrito.appendChild(div)

        localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras))

    }

    renderProductosCarrito()
}


let carritoContenedor=document.getElementById("carritoContenedor");
let carritoStorage = localStorage.getItem("carritoDeCompras");
/* 
let carrito = [];

if (carritoStorage) {
  carrito = JSON.parse(carritoStorage);
} */

let carrito = JSON.parse(carritoStorage) || []; // OPTIMIZANDO EL CODIGO. Las lineas 34 a 39 se expresan en la linea 41.


let carritoSubtotal = 0;
let carritoEnvio = 0;
let carritoTotal = 0;

for (const producto of carrito) {
    let div = document.createElement("div");
    div.innerHTML = `<div>
                        <img src="../img/${producto.img}" alt="${producto.id}">
                    </div>
                    <div class="product1-details">
                        <p>${producto.nombre} </p>
                        <b> $ ${producto.precio} </b>
                        <button class="btn btn-primary justify-content-center">Editar</button>
                        <button class="btn btn-primary justify-content-center" id="Eliminar${producto.id}">Eliminar</button>
                    </div>`;
    div.className = "cart-product1";
    div.id="carritoProduct";
    carritoContenedor.append(div);
    carritoSubtotal = carritoSubtotal + producto.precio;
    carritoEnvio = carrito.length * 50;
    carritoTotal = carritoSubtotal + carritoEnvio;
};

//RENDERIZA RESUMEN DE CARRITO
const totalValue = document.getElementById("totalValue")
let div = document.createElement("div");
    div.innerHTML = `<p>$${carritoSubtotal} </p>
                    <p>$${carritoEnvio} </p>
                    <p class="p-total-value">$${carritoTotal}</p>`;
    totalValue.append(div);

//BOTON PARA VACIAR CARRITO
  let botonVaciarCarrito = document.getElementById("btnVaciarCarrito");
  botonVaciarCarrito.addEventListener("click", () => {
    localStorage.clear();

    Swal.fire({
        text: '¿Estas seguro que quieres vaciar el carrito?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                text: 'Su carrito se ha vaciado.',
              });
            
            carritoContenedor.innerHTML=""; //Lo borra pero luego no se renderiza ningun item en el carrito
            //Resetea resumen de carrito
            totalValue.innerHTML="";
            carritoSubtotal = 0;
            carritoEnvio = 0;
            carritoTotal = carritoSubtotal + carritoEnvio;
            let div = document.createElement("div");
            div.innerHTML = `<p>$${carritoSubtotal} </p>
                    <p>$${carritoEnvio} </p>
                    <p class="p-total-value">$${carritoTotal}</p>`;
            totalValue.append(div);

        } else if (result.isDenied) {
        //   Swal.fire({'Su carrito no se ha vaciado', '', 'info'})
          Swal.fire({
            icon: 'info',
            text: 'Su carrito no se ha vaciado.',
          })
        }
      })
  })
