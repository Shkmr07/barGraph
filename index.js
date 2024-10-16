let prodBtn = document.getElementById('prodBtn')
let prodFormDiv = document.getElementById('prodFormDiv')
let prodBar = document.getElementById('prodBar')
let nameInput = document.getElementById('name')
let priceInput = document.getElementById('price')
let ratingInput = document.getElementById('rating')
let prodForm = document.getElementById('prodForm')
let selectTag = document.getElementById('opt')
let xaxis = document.getElementById('xaxis')

function openForm(){
    prodBtn.style.display='none'
    prodFormDiv.style.display='block'
}


function addProductData(){
    let products = JSON.parse(localStorage.getItem('products')) || []

    let name = nameInput.value
    let price = +priceInput.value
    let rating = +ratingInput.value

    if(!name || !price || !rating){
        alert('Every fields are mandotary')
        return
    }

    products.push({name,price,rating})
    localStorage.setItem('products',JSON.stringify(products))
    fetchProductData()
}
    
        
function formSubmit(event){
    event.preventDefault()

    prodBtn.style.display='block'
    prodFormDiv.style.display='none'
    addProductData()
    prodForm.reset()
}


function fetchProductData(){

    let products = JSON.parse(localStorage.getItem('products')) || []
    let maxPrice = products.reduce((acc,el)=>{
        if(acc<el.price) acc = el.price
        return acc
    },0)

    prodBar.innerHTML = ''

    products.forEach(product=>{
        prodBar.appendChild(createBar(product,maxPrice))
    })
}


function createBar(item,maxPrice){

    let div = document.createElement('div')
    let pTag = document.createElement('p')
    let st = selectTag.value

    div.style.cssText = `width:50px; height:${(200/maxPrice)*item.price}px; border: 1px solid black;background-color: #4CAF50; position: relative;`
    pTag.textContent = `${st==='price'?`$${item.price}`:st==='rating'?item.rating:`$${item.price}`}`
    pTag.style.cssText = 'position: absolute;bottom: 0; color: white; text-align: center; width: 100%;'
    div.appendChild(pTag)
    return div
}


selectTag.addEventListener('change',()=>{
    
    let products = JSON.parse(localStorage.getItem('products')) || []

    let maxPrice = products.reduce((acc,el)=>{
        if(acc<el.price) acc = el.price
        return acc
    },0)

    if(selectTag.value ==='price'){
        products.sort((a,b)=>a.price-b.price)
        xaxis.textContent = 'Prices'
    }
    else if (selectTag.value ==='rating'){
        products.sort((a,b)=>a.rating-b.rating)
        xaxis.textContent = 'Ratings'
    }
    else xaxis.textContent = 'Prices'

    prodBar.innerHTML = ''

    products.forEach(product=>{
        prodBar.appendChild(createBar(product,maxPrice))
    })

})
    
prodForm.addEventListener('submit',formSubmit)

fetchProductData()
    