let previousMinPrice;
let previousMaxPrice;
let count = 0;
var slide1;
var slide2;

function getVals() {
  var parent = this.parentNode;
  var slides = parent.getElementsByClassName("range");
  slide1 = parseFloat( slides[0].value );
  slide2 = parseFloat( slides[1].value );
  if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }



  var display_firstElement = parent.getElementsByClassName("rangeValues1")[0];
  var display_secondElement = parent.getElementsByClassName("rangeValues2")[0];

  if(slide1 === 0) {
      addDefinedClass(display_firstElement, 'zero');
  } else {
      removeDefinedClass(display_firstElement, 'zero');
  }

  if(count > 1) {
      // defineUrl(slide1, slide2);
  }

  count++;
  display_firstElement.innerHTML =  slide1;
  display_secondElement.innerHTML = slide2;
}

window.onload = function(){
    const display_firstElement = document.getElementsByClassName("rangeValues1")[0];
    const display_secondElement = document.getElementsByClassName("rangeValues2")[0];
    const slides = document.getElementsByClassName("range");

    let currentParams  = window.location.search;
    if(currentParams.indexOf('price_min') !== -1){
        const minP = currentParams.split('price_min')[1].split('&')[0].substring(1);
        display_firstElement.innerHTML = minP;
        slides[0].value = minP;
    }

    if(currentParams.indexOf('price_max') !== -1) {
        const maxP = currentParams.split('price_max')[1].split('&')[0].substring(1);
        display_secondElement.innerHTML = maxP;
        slides[1].value = maxP;
    }

  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByClassName("range");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
                sliders[y].oninput = getVals;
                sliders[y].onchange = test;
                sliders[y].oninput();
          }
        }
    }
}
function test(){
    defineUrl(slide1, slide2);
    previousMinPrice = slide1;
    previousMaxPrice = slide2;
}
function defineUrl(minPrice, maxPrice) {
    const mainUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    let cUrl  = window.location.search;

    if(cUrl) {
        if(previousMinPrice !== minPrice && cUrl.indexOf('price_min') !== -1) {
            cUrl = cUrl.replace(`price_min=${previousMinPrice}`, `price_min=${minPrice}`);
        }
        if(previousMaxPrice !== maxPrice && cUrl.indexOf('price_max') !== -1) {
            cUrl = cUrl.replace(`price_max=${previousMaxPrice}`, `price_max=${maxPrice}`);
        }
        if(cUrl.indexOf('price_min') === -1 && cUrl.indexOf('price_max') === -1) {
            cUrl += `&price_min=${minPrice}&price_max=${maxPrice}`;
        }
    } else {
        cUrl += `?price_min=${minPrice}&price_max=${maxPrice}`
    }

    window.history.replaceState({ path: `${mainUrl}${cUrl}` }, '', `${mainUrl}${cUrl}`);
    sendReguest(window.location.href);
}

function removeDefinedClass(element, className) {
    if(element.classList.value.indexOf(className) !== -1){
        element.classList.remove(className);
    }
}

function addDefinedClass(element, className) {
    if(element.classList.value.indexOf(className) === -1){
        element.classList.add(className);
    }
}
