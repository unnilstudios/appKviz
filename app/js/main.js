// global vars:

let xmlhttp = new XMLHttpRequest();
let dodaj = document.getElementById('dodaj');
let lista = document.getElementById('lista');
let input = document.querySelector('input');
let listaArray = [];
let kraj = document.getElementById('kraj');
let deleteBtn = document.getElementsByClassName('delete');
let results;


// let`s start :)
window.onload = function() {
  let message = confirm("Hoces da igras mini-igricu?");
    if (message == true) {
        zapocniIgru();
    } else {
        console.log('nista onda');
    }
}

function zapocniIgru() {

 
  // get drugu stranicu
  let getPage = function() {
    let link = document.querySelector('link[rel="import"]');
    let content = link.import;
    // Grab DOM from drugi.htmls document.
    let el = content.querySelector('.drugi');
    document.body.appendChild(el.cloneNode(true));
  }
  
 getPage();

  //find json data
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      var oblast = myObj.oblast;
      document.getElementById('demo').innerHTML = `Oblast: ${oblast.toUpperCase()}`;

    let twoMinutes = 120,
    display = document.querySelector('#time');
    startTimer(twoMinutes, display);

    // function timer
    function startTimer(duration, display) {
      let timer = duration, minutes, seconds;
      let time = setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = `${minutes}:${seconds} minuta.` ;

          kraj.onclick = function() {
            if (listaArray.length < 4) {
              alert('ubacite jos gradova!');
            } else {
              clearInterval(time);
              twoMinutes = 0;
              rezultati();
            }
        }

          if (--timer < 0) {
            clearInterval(time);
            alert('isteklo je vreme!');
            rezultati();
            }
          }, 1000);
        }

//sledece strana rezultati
function rezultati() {
  input.disabled = true;
  let procenat = document.getElementById('procenat');
  let sliderWidth = document.getElementById('slider');
  let sliderNumber = document.getElementById('slider');
  let x = 0;

    for (let i = 0; i < listaArray.length; i++) {
      switch (listaArray[i])  {
        case myObj.tacno[0].toLowerCase():
        //  alert('Dobio si Zvezdana');
          x += 1;
          procenat.innerHTML = x;
          break;
        case myObj.tacno[1].toLowerCase():
       //  alert('Dobio si Bor');
          x += 1;
          procenat.innerHTML = x;
          break;
        case myObj.tacno[2].toLowerCase():
        //  alert('dobio si rudnu glavu');
          x += 1;
          procenat.innerHTML = x;
          break;
        case myObj.tacno[3].toLowerCase():
         // alert('dobio si Majdanpek');
          x += 1;
          procenat.innerHTML = x;
          break;
        default:
          procenat.innerHTML = x;
      }
    };
      switch(x) {
        case 1:
          sliderWidth.style.width = "25%";
          sliderNumber.innerHTML = "25%";
          break;
        case 2:
          sliderWidth.style.width = "50%";
          sliderNumber.innerHTML = "50%";
          break;
        case 3:
          sliderWidth.style.width = "75%";
          sliderNumber.innerHTML = "75%";
          break;
        case 4:
          sliderWidth.style.width = "100%";
          sliderNumber.innerHTML = "100%";
          break;
        default:
          sliderWidth.style.width = "0%";
          sliderNumber.innerHTML = "0%";
      }
    }

    // autocomplete input
    function autocomplete(val) {
      let gradovi = myObj.ponudjene; 
        let gradovi_return = [];

        for (let i = 0; i < gradovi.length; i++) {
          if (val === gradovi[i].toLowerCase().slice(0, val.length)) {
            gradovi_return.push(gradovi[i]);
        }
        }
      return gradovi_return;
    }

    // events
    input.onkeyup = function(e) {
        input_val = this.value.toLowerCase(); // updates the variable on each ocurrence

        if (input_val.length > 0) {
        let towns_to_show = [];

        autocomplete_results = document.getElementById("autocomplete-results");
        autocomplete_results.innerHTML = '';
        towns_to_show = autocomplete(input_val);
      
        for (let i = 0; i < towns_to_show.length; i++) {
            autocomplete_results.innerHTML += '<li>' + towns_to_show[i] + '</li>';

        }
        autocomplete_results.style.display = 'block';
        } else {
        towns_to_show = [];
        autocomplete_results.innerHTML = '';
        }
      }
    }
    }

    xmlhttp.open("GET", "podaci.json", true);
    xmlhttp.send();

  // create list
  dodaj.onclick = function() {
    listaArray.push(input.value.toLowerCase());
    console.log(listaArray);
    input.value = "";

    if (listaArray.length <= 4 && input.value === "") {
      createElements();
    
    } else {
      document.getElementById("h1").innerHTML = "Mozete uneti najvise 4.grada.";
      listaArray.pop(input.value);
    };
    
    // create li element with button(x)
    function createElements() {
      let li = document.createElement('LI');
      let btn = document.createElement('BUTTON');
      btn.className = "delete";
      btn.innerHTML = "\u00D7"; // x button

      

      listaArray.forEach(function(grad) {
        li.innerHTML = grad;
        lista.appendChild(li);
        li.appendChild(btn);

        // remove li elements 
        for (let i = 0; i < deleteBtn.length; i++) {
          deleteBtn[i].onclick = function() {
            let listItem = this.parentNode;
            let ul = listItem.parentNode;
            //Remove from the view
            ul.removeChild(listItem);
            //remove from the Array
            let thisGrad = listItem.innerText.slice(0, -1);
            removeFromArray(thisGrad);
            console.log(thisGrad);


            function removeFromArray(grad2){
              for (let i = 0; i < listaArray.length; i++) {
                if (listaArray[i] == grad2) {
                  listaArray.splice(i, 1);
                  console.log('radi '+ grad2);
                }
              }
            }
            console.log(listaArray);
          }
        }
      });
      return li;
    }
    
  }

}
