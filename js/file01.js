import { fetchProducts } from './functions.js';
import { fetchCategories} from './functions.js';
"use strict";
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(() => {
    showToast();
    showVideo();
})();


const renderProducts = () => {
    fetchProducts('https://data-dawm.github.io/datum/reseller/products.json')
        .then(result => {
            if (result.success) {
                const container = document.getElementById('products-container');
                container.innerHTML = '';
                
                const products = result.body.slice(0, 6);
                
                products.forEach(product => {
                    // Plantilla con marcadores de posición
                    let productHTML = `
                        <div class="product-card">
                            <img src="{imgUrl}" alt="{title}">
                            <h3>{title}</h3>
                            <p class="price">${product.price}</p>
                            <a href="{productURL}" target="_blank">Ver producto</a>
                            <span class="category">Categoría: {category_id}</span>
                        </div>
                    `;
                    
                    // Reemplazar marcadores con replaceAll
                    productHTML = productHTML
                        .replaceAll('{imgUrl}', product.imgUrl)
                        .replaceAll('{title}', product.title)
                        .replaceAll('{price}', product.price)
                        .replaceAll('{productURL}', product.productURL)
                        .replaceAll('{category_id}', product.category_id);
                    
                    container.innerHTML += productHTML;
                });
            } else {
                // En caso que es false, mostrar alerta con el mensaje de error
                alert('Error al cargar los productos: ' + result.body);
            }
        });
};



const renderCategories = async () => {
    // Definir bloque try-catch
    try {
        /* bloque try */
        // Almacenar en result el resultado de await fetchCategories
        const result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml');
        
        // Utilizar estructura condicional para verificar result.success
        if (result.success) {
            // Almacenar en container la referencia al elemento con id "categories"
            const container = document.getElementById('categories');
            
            // Reemplazar el contenido anterior con la opción predeterminada deshabilitada
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;
            
            // Almacenar en categoriesXML el contenido de result.body
            const categoriesXML = result.body;
            
            // Aquí puedes continuar procesando el XML de categorías...
            console.log('Categorías XML:', categoriesXML);
            
        } else {
            console.error('Error al cargar categorías:', result.body);
        }
        
    } catch (error) {
        /* bloque catch */
        console.error('Error en renderCategories:', error);
    }
}
// Función de autoejecución que llama a renderProducts
(() => {

    renderProducts(); // Llamar a renderProducts aquí
    renderCategories();
})();
