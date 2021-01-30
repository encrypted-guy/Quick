function openNav() {
    document.getElementById("myNav").style.height = "100%";
}
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}
AOS.init();

let Description = document.querySelectorAll('.Description');
for(let i =0; i < Description.length; i++){ 
    let DescriptionValue = document.querySelector('.Description').innerText;
    if(DescriptionValue.length > 200){
        render = DescriptionValue.substring(0,200);
    }
    Description[i].innerText = `${render}.`;
}




// add to cart
const button = document.querySelectorAll('.add-cart');
button.forEach(button => {
    button.addEventListener('click', () => {
        let id = button.value;
        fetch(`/add/cart/${id}`)
        .then(response => {
            if(response.ok){
                console.log(`clicked was recoded`);
                return;
            }else{
                throw new Error('Request failed.');
            }
        }).catch(error => {
            console.log(`catched ERROR: |${error}`);
        });
        console.log(button.value);
    });
});

document.querySelector('.make-oder').addEventListener('click', () => {
    setInterval(() => {
        window.location.replace('/success-check');
    }, 1000)
});

// const btn = document.querySelectorAll('.add-cart');
// btn.forEach(button => {
//     button.addEventListener('click', () => {
//         fetch('/cartvalue', {method: 'GET'})
//         .then(response => {
//             if(response.ok) {
//                 return response.json()
//             }
//             throw new Error('Request failed.');
//         })
//         .then(data => {
//             console.warn(data)
//             document.querySelector('.cart-number').innerText = data;
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     });
// });

// setInterval(() => {
   
// }, 1000)
