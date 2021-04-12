const container =document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);
})



function buscarClima(e){
    e.preventDefault();

    console.log('buscando el clima')
    //validar datos    
    const ciudad= document.querySelector('#ciudad').value;
    const pais= document.querySelector('#pais').value;



    if(ciudad==='' || pais ===''){
        mostrarError('Ambos campos son obligatorios','error');
        return
        }

   //consultar api
        consultarApi(ciudad,pais);
}


function consultarApi(ciudad, pais){
    const appId= '7d94e583996985712662522d8005f4a9';
    const url= `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`;
   fetch(url)
    .then(resultado=>resultado.json())
    .then(datos=>{
        limpiarHTML();// limpiar html previo
        if (datos.cod=== '404'){
            mostrarError('La ciudad no existe')
            return;
        }

        //mostrar respuesta html

        mostrarClima(datos);
    })
}

function mostrarClima(datos){
    const  {main:{temp, temp_max,temp_min }}=datos;
    
    const centigrados= kelvinACent(temp);
    const cMin= kelvinACent(temp_min);
    const cMax= kelvinACent(temp_max);
    

    const actual= document.createElement('p');
    actual.innerHTML= ` ${centigrados} &#8451;`
    actual.classList.add('font-bold','text-6xl');

    const resultadoDiv= document.createElement('div');
    resultado.classList.add('text-center','text-white');
    resultadoDiv.appendChild(actual);


    resultado.appendChild(resultadoDiv);



}

//funcion helper
const  kelvinACent= grados=> parseInt(grados);

function mostrarError(mensaje,tipo){

    const alerta= document.querySelector('.bg-red-100');
  

    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML= `
        <strong class=" font-bold"> Error! </strong>
        <span className="block">${mensaje}</span>
        `;
    
    

        container.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        },3000)
    }
   

}


function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}