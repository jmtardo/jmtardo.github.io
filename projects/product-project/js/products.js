/* globals $ _ */

//call-back pattern - event driven architech
$(document).ready(function() {
    $.getJSON('data/product.json', onProductData);
});

function onProductData(products) {
    //initilaize ui 
    initilaizeUI(products);
    showProducts(products)
}

//create product ul 
function initilaizeUI(products) {
    $('<ul>')
        .attr('id', 'products')
        .addClass('list-products')
        .appendTo('main');
}

//show all products showProducts(products) 

function showProducts(products) {
    //clear any products in dom - using empty function 
    $('#products')
        .empty()
        .append(createProductListItems(products));
        
        //add event listerners 
}

//create all list items 

function createProductListItems(products) {
    return _.map(products, function(product) {
        return $('<li>') //outer box
            .addClass('li-product')
            .data('product', product)
            //desc, price, stock, image(wrap in a div) factories 'flexbox'
            .text(product.desc)
            .append(createProductImageDiv(`img/product/thumbs/ ${product.img}`, 'product-thumb'))
            .append(createProductsDetailsDiv(product.desc, product.price, product.stock));

    });
}

 
function createProductImageDiv(url, cssClass) {
  //use jquery to create and return a div that wraps an image that uses the url as its src   
    //cssClass makes more flexible 
}

function createProductsDetailsDiv(desc, price, stock){
    //create div with 3 children divs, one for desc, one for price, one for stock 
    // give each a unique class
}


 
function onProductClick(event) {
    //use on method to show product on click
    const product = $(event.currentTarget).data('product');
    showProductDetails(product);
}


 
function showProductDetails(product) {
//take single product, create markup for product detail & show product details 

}

function search(collection, term){
    // 1. create output array to collect your output []
    // 2. iterate collection .each or .reduce(hipper)   
    
    _.each(collection, function(value){
    // recursive case : 
    // iscollection, scratchpad - is array or object? 
    //is this value a collection?
    //IF yes, call search(value, term)
    
    // base case: IF is this a string?(*subsearch* / substring) & IF this string contain search term? (must be case insensitve)
                //3.  IF yes, collect this product into your output array 
    //recurisve function 
    //has own array??? "match" value is pushed into array, resolves to result of calling search IF subsearch match 
    //IF search.length 0 = falsy 
    //value = product  (can happen many times because nested structure)
    
    });
    
     //return the output thingy (collection) array 
}
function isCollection(value) {
    //is this value an array or true object 
      // iscollection, scratchpad - is array or object? 
}