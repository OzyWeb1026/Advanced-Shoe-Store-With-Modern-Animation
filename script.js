//Getting all elements from the DOM
const imgContainer = document.querySelector(".showcase > div");
const img = document.querySelector(".showcase img");
const shadow = document.querySelector(".shadow");

const thumb = document.querySelectorAll(".thumbs img");
const titleOverlay = document.querySelector(".titleOverlay");
const title = document.querySelector(".titleText");
const desc = document.querySelector(".description");

const sizes = document.querySelectorAll(".sizes > li");
const stars = document.querySelectorAll(".stras span");
const price = document.querySelector(".price");
const colorBtn = document.querySelectorAll(".color");

const pag = document.querySelectorAll(".pag");
const prev = document.querySelector(".arr-left");
const next = document.querySelector(".arr-right");
const shoeNum = document.querySelector(".shoe.num");
const shoeTotal = document.querySelector(".shoe-total");

//ID variables
let id = 1;
let colorType = 1;
let shoe = 1;

//shoe details / data
const colors = [
    [
        "#ae001b",
        "#111111"
    ],
    [
        "linear-gradient(0deg, orange, red)",
        "#bda08e"
    ],
    [
        "linear-gradient(0deg, #00b8ea 0%, #e6882d 50%, #e56da6 100%)",
        "linear-gradient(0deg, #dae766, #b2afaa)"
    ],
];

const prices = ["150", "250", "175"];

const names = [
    [
        "Red Nike Jordan Max Aura 3",
        "Black Nike Jordan Max Aura 3"
    ],
    [
        "Black/Orange Nike Air Max 95",
        "Beige/Gray Nike Air Max 95"
    ],
    [
        "Colorful NIKE Jordan Delta 2 SP",
        "Gray NIKE Jordan Delta 2 SP"
    ],
];

const description = [
    [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ea quo consectetur quasi nihil corrupti iste necessitatibus, optio a doloribus ipsa!"
    ],
    [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo consectetur quasi nihil corrupti iste necessitatibus, optio a doloribus ipsa!"
    ],
    [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo consectetur quasi nihil corrupti iste necessitatibus, optio a doloribus ipsa!"
    ],
];

const rating = [4, 5, 3];

/*========= Functions =========*/
//Retriving image from folder path
function getImage(imgType, shoe, colorType, id, extension) {
    return "img/" +
    imgType + "/shoe" + shoe + "-" +
    colorType + "/img" + id + "-" + extension;
}

//Reset Active State to Buttons video da 13:42
function resetActive(element, elementClass, i) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove(elementClass + "-active");
    }
    element[i].classList.add(elementClass + "-active");
}

//Fire animations
function animate(element, time, anim) {
    element.style.animation = anim;

    setTimeout(() => {
        element.style.animation = "none";
    }, time);
}

//assing colors to color buttons
function assignColors(i, shoe) {
    colorBtn[i],style.background = colors[shoe - 1][i];
}

//set rating by filling out stars
function resetStars(shoe) {
    for(let i = 0; i < stars.length; i++) {
        stars[i].innerHTML = "full-star";
    }

    //add the ratings
    for (let i = 0; i < ratings[shoe]; i++) {
        stars[i].innerHTML = "star";
    };
}

//changing shoe size
for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", (e) => {
        resetActive(sizes, "size", i);
    });
}

/*Setting up all of the initial data for the first 
shoe that loads*/
shoeTotal.innerText = "0" + pag.length;  /*1*/
shoeNum.innerText = "0" + shoe;          /*2*/   
price.innerText = "$" + prices[0];       /*3*/
resetStars(shoe - 1);                    /*4*/
title.innerText = names[0][0];           /*5*/
desc.innerText = descriptions[0];        /*6*/

/*Changing Images*/
for (let i = 0; i < thumb.length; i++) {
    thumb[i].addEventListener("click", (e) => {
        id = i + 1;

        img.scr = getImage(
            "showcase", shoe, colorType, id, "png"
        );
        //adding the active class to the clicked thumbnail
        resetActive(thumb, "thumb", i);

        //adding the fade in animation on the shoe
        animate(imgContainer, 550, "fade 500ms ease-in-out");
    });
}

for (let i = 0; i < colorBtn.length; i++) {
    //setting up colors to the color btn
    assignColors(i, shoe);

//changing colors
colorBtn[i].addEventListener("click", () => {
    //change color type of shoes
    colorType = i + 1;
    //change showcase Image
    setTimeout(() => {
        img.src = getImage(
            "showcse", shoe, colorType, id, "png"
        );
    }, 450);
    //change thumbnails
    for (let i = 0; i <thumb.length; i++) {
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }
    //set active class to clicked button
    resetActive(colorBtn, "color", i);
    
    //change the shoe title
    title.innerText = names[shoe - 1][i];

    //adding all of the animations
    animate(img, 550, "jump 500ms ease-in-out");
    animate(shadow, 550, "shadow 500ms ease-in-out");
    animate(titleOverlay, 850, "title 800ms ease-in-out");
});
}

//slider
function slider(shoe) {
    
    //change showcase Image
    setTimeout(() => {
        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        );
    }, 600);

    //change thumbnails
    for (let i = 0; i < thumb.length; i++){
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }

    //changing the colors on the color buttons
    for (let i = 0; i < colorBtn.length; i++) {
        assignColors(i, shoe);
    }

    //set active class to clicked button
    resetActive(pag, "pag", shoe - 1);

    //reassing all of the shoe data
    desc.innerText = description[shoe - 1];
    title.innerText = names[shoe - 1][colorType - 1];
    price.innerText = "$" + prices[shoe - 1];
    resetStars(shoe - 1);
    shoeNum.innerText = "0" + shoe;

    //adding all of the animations
    animate(img, 1550, "replace 1.5s ease-in");
    animate(shadow, 1550, "shadow2 1.5s ease-in");
    animate(titleOverlay, 850, "title 800ms ease");
}

//previous shoe
prev.addEventListener("click", () => {

    //decrement img id
    shoe--;

    if(shoe < 1){
        shoe = pag.length;
    }
    //run the slider function
    slider(shoe);
});

//next shoe
next.addEventListener("click", () => {
    shoe++;

    if (shoe > pag.length){
        shoe = 1;
    }
    slider(shoe);
});

//pagination
for (let i = 0; i < pag.length; i++) {
    //add click event for all pagination
    pag[i].addEventListener("click", () => {
        slider(i + 1);
        
        shoe = i + 1;
    });
}
