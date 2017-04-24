/* globals $ _ */

//call-back pattern - event driven architech
$(document).ready(function() {
    $.getJSON('data/product.json', onProductData);
});

function onProductData(products) {
    //initilaize ui 
    initilaizeUI(products);
    showProducts(products);
    findMyTerm(products);
    filterAutoPopulate(whatInDatFilter(products));
    filterBy(products);
    ifAnythingClicked(products);
    lightBox(products);
    //onProductClick(products);
    pricesArray(products);
    highToLow(products);
    showProductDetails(products);
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
    lightBox(products);
    //add event listerners 
}

//create all list items 

function createProductListItems(products) {
    return _.map(products, function(product) {
        return $('<li>') //outer box
            .addClass('li-product')
            .data('product', product)
            //desc, price, stock, image(wrap in a div) factories 'FLEXBOX!'
            //.text(product.desc)
            .append(createProductImageDiv(`img/product/thumbs/${product.image}`, 'product-thumb'))
            .append(createProductsDetailsDiv(product.desc, product.price, product.stock))
            .append(createProductImageDiv(`img/product/${product.image}`, 'product-image').hide())
            .attr("image", product.image)
            .attr("desc", product.desc)
            .attr("type", product.type)
            .attr("availableColors", product.availableColors)
            .attr("specs", product.specs)
            .attr("price", product.price)
            .attr("stock", product.stock);
    });
}


function createProductImageDiv(url, cssClass) {
    //use jquery to create and return a div that wraps an image that uses the url as its src   
    //cssClass makes more flexible 
    return $('<div>')
        .append("<img src='" + url + "'>")
        .addClass(cssClass);
}

function createProductsDetailsDiv(desc, price, stock) {
    return $("<div>")
        .addClass("product-details")
        .append($("<div>").addClass("product-description").text(desc))
        .append($("<div>").addClass("product-price").text("Yours for only: $" + price))
        .append($("<div>").addClass("product-stock").text("Why wait? Only " + stock + " left in stock!!"));

}

function showProductDetails(products) {
    //take single product, create markup for product detail & show product details 
    $("<div>")
        .addClass("more-product-details")
        .data("product", products);
}

function findMyTerm(products) {
    $("#search-me-pls").on("click", function() {
        let term = $("input.form-control").val();
        showProducts(search(products, term));
        lightBox(products);
    });

}

//search
function search(products, term) {

    // 1. create output array to collect your output []
    // 2. iterate collection .each or .reduce(hipper)   
    return _.reduce(products, function(previousProducts, currentProduct, i, product) {
        if (isCollection(currentProduct)) {
            if (search(currentProduct, term).length) {
                previousProducts.push(currentProduct);
            }
        }

        else if (typeof currentProduct === "string") {
            if (currentProduct.toLowerCase().search(term.toLowerCase()) > -1) {
                previousProducts.push(currentProduct);
            }
        }
        return previousProducts;
    }, []);
}



function isCollection(value) {
    if (value === "null") {
        return false;
    }
    else if (value instanceof Date) {
        return false;
    }
    else if (Array.isArray(value)) {
        return true;
    }
    else if (typeof value === "object") {
        return true;
    }
    else if (typeof value !== "object") {
        return false;
    }
}

//filters
function whatInDatFilter(products) {
    var container = {};
    _.reduce(products, function(filteredProds, currentProd, i, products) {
        if (!container.hasOwnProperty(currentProd["type"])) {
            container[currentProd["type"]] = [currentProd];
        }
        else if (container.hasOwnProperty(currentProd["type"])) {
            container[currentProd["type"]].push(currentProd);
        }
    }, {});
    return container;
}

function filterAutoPopulate(products) {
    var theFilter = _.each(products, function(val, key, products) {
        $("<li>").addClass("filtered-products").attr("id", key).text(key + "s " + " (" + val.length + ") ").prependTo(".dropdown-menu").append($("<li>").addClass("divider").appendTo(".dropdown-menu"));
    })
    $("<li>").addClass("prices-low-to-high").attr("id", "prices-low-to-high").text("Prices: Low to High").prependTo(".dropdown-menu").append($("<li>").addClass("divider").appendTo(".dropdown-menu"));
    $("<li>").addClass("prices-high-to-low").attr("id", "prices-high-to-low").text("Prices: High to Low").prependTo(".dropdown-menu").append($("<li>").addClass("divider").appendTo(".dropdown-menu"));;
    $("<li>").addClass("anything").attr("id", "any-product").text("All Products").appendTo(".dropdown-menu");

}



function filterBy(products) {
    $(".filtered-products").click(function() {
        let productType = $(event.currentTarget);
        return showProducts(whatInDatFilter(products)[productType.attr("id")]);
    });

    $(".prices-low-to-high").click(function() {
        let productType = $(event.currentTarget);
        return showProducts(lowToHigh(products));
    });

    $(".prices-high-to-low").click(function() {
        let productType = $(event.currentTarget);
        return showProducts(highToLow(products));
    });

}


function ifAnythingClicked(products) {
    $(".anything").click(function() {
        return showProducts(products);
    });
}


function pricesArray(products) {
    let output = [];
    _.each(products, function(val, i, products) {
        output.push(val.price)
    });
    output.sort(function(a, b) {
        return a - b;
    });
    return _.unique(output);
}

function lowToHigh(products) {
    let orderedArray = [];
    _.each(pricesArray(products), function(val, pos, prices) {
        _.each(products, function(item, i, products) {
            //console.log("prices", val); 
            if (item.price === prices[pos]) {
                orderedArray.push(item);
            }
        });
    });
    return orderedArray;
}

//on click function to call this and pass it to showProducts()
function highToLow(products) {
    let orderedArray = [];
    _.each(pricesArray(products).reverse(), function(val, pos, prices) {
        _.each(products, function(item, i, products) {
            //console.log("prices", val); 
            if (item.price === prices[pos]) {
                orderedArray.push(item);
            }
        });
    });
    return orderedArray;
}



//lightbox


function lightBox(products) {
    $('.li-product').on("click", function(event) {
        let product = $(event.currentTarget);
        let src = product.attr("image");


        if (!$("#light-box").length > 0) {
            $("body").append("<div id='light-box'>") //<img src='img/product/"  + src + "'><span class='material-icons'>CLOSE</span></div>")
            $("<img class = 'light-box-image' src='img/product/" + src + "'>").appendTo("#light-box");
            $("<span class='material-icons'>CLOSE</span>").appendTo("#light-box");
            $("<div>").addClass("product-detail-text").appendTo("#light-box").css("background-color", "pink")
                // .append("<li>").text(product.attr("image"))
                .append($("<li>").text("Product: " + product.attr("type").toUpperCase()),
                    $("<li>").text(product.attr("desc")),
                    $("<li>").text("Available colors: " + product.attr("availableColors")),
                    $("<li>").text("Specs: " + product.attr("specs")),
                    $("<li>").text("Only  $" + product.attr("price") + "!!!"),
                    $("<li>").text("Hurry! There are " + product.attr("stock") + " left in stock!"));
            // $("#light-box").append("<li>").data("data", src);
            $("#light-box").show();
            $(".search-bar").hide();


            $("body").on("click", "#light-box span", function() {
                $("#light-box").remove();
                $(".search-bar").show();

            });
        }
        else {
            $("#light-box").show();
            $("body").append("<div id='light-box'> <img class = 'light-box-image' src='img/product/" + src + "'><span class='material-icons'>CLOSE</span></div>");
            $("body").on("click", "#light-box span", function() {
                $("#light-box").remove();

            });
        }
    });
}