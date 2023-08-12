

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const productos = [
    {
        id: 1,
        nombre: "Hill's",
        precio: 200,
        imagen: "https://www.hillspet.es/content/dam/pim/hills/es_es/sd/dry/sp-feline-science-plan-kitten-healthy-development-chicken-dry-productShot_zoom.jpg",
        enCarrito: 0
    },
    {
        id: 2,
        nombre: "Purina",
        precio: 250,
        imagen: "https://purina.cl/sites/default/files/2023-02/PurinaLatam-CatChow-DRY-Adulto-Pescado-01.png",
        enCarrito: 0
    },
    {
        id: 3,
        nombre: "Equilibrio",
        precio: 300,
        imagen: "https://www.equilibriototalalimentos.com.br/es/arquivos/imagens/racoes/2/47/racao-equilibrio-gatos-adultos-salmao.png",
        enCarrito: 0
    },
    {
        id: 4,
        nombre: "Whiskas",
        precio: 350,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_747095-MLA49116624923_022022-F.webp",
        enCarrito: 0
    }
];

let carrito = [];

let productosEnCarrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio}$</p>
    `;
    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
        let productoActual = {
            id: product.id,
            img: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            enCarrito: product.enCarrito
        };

        productos[product.id-1].enCarrito += 1;

        Toastify({
            text: "Producto añadido con éxito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();

        let encontre = productosEnCarrito.some(item => item.id === productoActual.id);

        if (!encontre) {
            productosEnCarrito.push(productoActual);
            carrito.push(productoActual);  
        }

    });
});



verCarrito.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    modalContainer.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src = "${product.img}">
            <h3>${product.nombre}</h3>
            <p>Qty: ${productos[product.id-1].enCarrito}</p>
            <p>${product.precio} $</p>
    `;
        modalContainer.append(carritoContent);
    });
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-pagar"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying)
});
// Función para guardar el carrito en el almacenamiento local
function saveCartToLocal() {
    const jsonCart = convertToJSON(carrito);
    localStorage.setItem("carrito", jsonCart);
    console.log("El carrito se ha guardado en el almacenamiento local.");
}

// Agregar el evento click al botón de guardar carrito
guardarCarritoBtn.addEventListener("click", () => {
    saveCartToLocal();
});


// Función para convertir el carrito a formato JSON
function convertToJSON(cart) {
    const jsonCart = JSON.stringify(cart);
    return jsonCart;
}

// Agregar el botón para guardar el carrito como JSON
const guardarCarritoBtn = document.createElement("button");
guardarCarritoBtn.innerText = "Guardar Carrito como JSON";
guardarCarritoBtn.className = "guardar-carrito-btn";
document.body.appendChild(guardarCarritoBtn);

// Función para descargar el carrito como archivo JSON
function downloadCartAsJSON() {
    const jsonCart = convertToJSON(carrito);
    const blob = new Blob([jsonCart], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carrito.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Agregar el evento click al botón de guardar carrito
guardarCarritoBtn.addEventListener("click", () => {
    downloadCartAsJSON();
});

