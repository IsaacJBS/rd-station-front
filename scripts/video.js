const video = document.querySelector("#myVideo")
const modal = document.querySelector(".modal")
const btn = document.querySelector(".button-demonstration")
const span = document.getElementsByClassName("close")[0]

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}     

window.onclick = function(event) {
  if (event.target == modal) 
  {                
    modal.style.display = "none";
  }
}