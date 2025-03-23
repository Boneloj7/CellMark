// Función para buscar productos
function searchProducts() {
    // Obtener el valor de búsqueda y convertirlo a minúsculas
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
   
    // Si no hay término de búsqueda, no hacer nada
    if (searchTerm === '') {
    return;
    }
   
    // Obtener todos los productos
    const productCards = document.querySelectorAll('.product-card');
   
    // Variable para contar resultados encontrados
    let resultsFound = 0;
   
    // Iterar sobre cada producto y comprobar si coincide con la búsqueda
    productCards.forEach(card => {
    // Obtener el título del producto y la descripción
    const productTitle = card.querySelector('h3').textContent.toLowerCase();
    const productDesc = card.querySelector('p:not(.product-price)').textContent.toLowerCase();
    const productLocation = card.querySelector('.product-location').textContent.toLowerCase();
   
    // Comprobar si el término de búsqueda está en el título, descripción o ubicación
    if (productTitle.includes(searchTerm) ||
    productDesc.includes(searchTerm) ||
    productLocation.includes(searchTerm)) {
   
    // Si coincide, mostrar el producto y resaltarlo
    card.style.display = 'block';
    card.style.boxShadow = '0 0 10px 2px #4CAF50';
    resultsFound++;
    } else {
    // Si no coincide, ocultar el producto
    card.style.display = 'none';
    }
    });
   
    // Mostrar resultados o mensaje de no encontrado
    const searchResultsMessage = document.getElementById('search-results') || createSearchResultsElement();
   
    if (resultsFound > 0) {
    searchResultsMessage.textContent = `Se encontraron ${resultsFound} resultados para "${searchTerm}"`;
    searchResultsMessage.style.color = '#4CAF50';
    } else {
    searchResultsMessage.textContent = `No se encontraron resultados para "${searchTerm}"`;
    searchResultsMessage.style.color = '#f44336';
    }
   
    // Limpiar resaltado después de 3 segundos
    setTimeout(() => {
    productCards.forEach(card => {
    card.style.boxShadow = '';
    });
    }, 3000);
   }
   
   // Función para crear el elemento de resultados de búsqueda
   function createSearchResultsElement() {
    const resultsElement = document.createElement('div');
    resultsElement.id = 'search-results';
    resultsElement.style.margin = '10px 0';
    resultsElement.style.padding = '10px';
    resultsElement.style.backgroundColor = '#f8f8f8';
    resultsElement.style.borderRadius = '5px';
    resultsElement.style.textAlign = 'center';
    resultsElement.style.fontWeight = 'bold';
   
    // Insertar después del encabezado de productos
    const productsHeader = document.querySelector('.products-header');
    productsHeader.after(resultsElement);
   
    return resultsElement;
   }
   
   // Función para resetear la búsqueda y mostrar todos los productos
   function resetSearch() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
    card.style.display = 'block';
    card.style.boxShadow = '';
    });
   
    const searchResultsMessage = document.getElementById('search-results');
    if (searchResultsMessage) {
    searchResultsMessage.textContent = '';
    }
   
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
   }
   
   // Función para inicializar la búsqueda
   function initSearch() {
    // Obtener la barra de búsqueda
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input');
    searchInput.id = 'search-input';
   
    // Obtener el icono de búsqueda
    const searchIcon = searchBar.querySelector('.material-icons');
   
    // Añadir event listener al hacer clic en el icono de búsqueda
    searchIcon.addEventListener('click', searchProducts);
   
    // Añadir event listener para la tecla Enter
    searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
    searchProducts();
    }
    });
   
    // Crear botón de reseteo
    const resetButton = document.createElement('span');
    resetButton.className = 'material-icons reset-search';
    resetButton.textContent = 'close';
    resetButton.style.cursor = 'pointer';
    resetButton.style.marginLeft = '5px';
    resetButton.title = 'Limpiar búsqueda';
    resetButton.addEventListener('click', resetSearch);
   
    // Añadir botón de reseteo a la barra de búsqueda
    searchBar.appendChild(resetButton);
   }
   
   // Inicializar la búsqueda cuando el DOM se haya cargado
   document.addEventListener('DOMContentLoaded', initSearch);