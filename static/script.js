btn = document.querySelector('button')
inputField = document.querySelector('input')
namesUl = document.querySelector('ul')
temperatureEl = document.getElementById('ip1')
resultEl = document.getElementById('ip2')
loader = document.querySelector('.loader')
sp1 = document.querySelector('.p1')
sp2 = document.querySelector('.p2')
resultEl.addEventListener('change',(event)=>{
    sp2.textContent = `Max Results ${event.target.value}`

})
temperatureEl.addEventListener('change',(event)=>{
    sp1.textContent = `Temperature ${(event.target.value * 0.1).toFixed(1)}`

})

const generateOutput = async () => {
    prefix = inputField.value
    const res = await fetch('/generate?' + new URLSearchParams({
        prefix: prefix,
        temperature: (temperatureEl.value) * 0.1,
        n: (resultEl.value),
    }))
    body = await res.json()
    
    for (nam of body.names) {
        li = document.createElement('li')
        li.textContent = nam;
        namesUl.appendChild(li)
    }
    inputField.value = ''



}
btn.addEventListener('click', ()=>{
    namesUl.innerHTML = '';
    loader.style.display = 'block';
    generateOutput().then(()=>{
        loader.style.display = "none"; 
    })
    

})
