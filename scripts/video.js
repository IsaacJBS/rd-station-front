const modal = document.querySelector(".modal")
const btn = document.querySelector(".button-demonstration")
const span = document.getElementsByClassName("close")[0]
const iframe = document.querySelector(".iframe")

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  iframe.setAttribute('src', iframe.getAttribute('src'))
}     

window.onclick = function(event) {
  if (event.target == modal) 
  {                
    modal.style.display = "none";
    iframe.setAttribute('src', iframe.getAttribute('src'))
  }
}