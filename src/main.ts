import 'dotenv/config'
import express from 'express'
import ScrapController from './Controllers/scrapper'

const app = express();
app.use(express.json())
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
app.get('/', (_,res)=>{
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebScrapper Asset/ MIT Plcean implementation</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: "Montserrat", sans-serif;
            background-color: #EBECF0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        
        .panel {
            width: 800px; /* Aumentamos el ancho para acomodar dos columnas */
            padding: 20px;
            background-color: #EBECF0;
            box-shadow: 8px 8px 12px -2px rgba(72, 79, 96, 0.4),
                        -6px -6px 12px -1px rgba(255, 255, 255, 1);
            border-radius: 20px;
            text-align: left; /* Alineamos el texto a la izquierda */
            display: flex; /* Usamos flexbox para distribuir elementos en dos columnas */
            flex-wrap: wrap; /* Permitimos que los elementos se envuelvan en múltiples líneas */
            gap: 20px; /* Espaciado entre elementos */
        }
        
        .column {
            flex: 1; /* Las columnas deben expandirse para ocupar el espacio disponible */
            min-width: 300px; /* Establecemos un ancho mínimo para las columnas */
        }
        
        h2 {
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-weight: 500;
            margin: 0 0 20px 0;
            color: #6C7587;
        }
        
        input, select, .open-modal-button {
            width: calc(100% - 20px);
            height: 54px;
            padding: 0 8px;
            margin-bottom: 10px;
            border: none;
            border-radius: 10px;
            background-color: #EBECF0;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
                        -5px -5px 10px rgba(255, 255, 255, 1);
            font-family: "Montserrat", sans-serif;
            font-size: 18px;
            line-height: 18px;
            color: #6C7587;
            transition: all 0.3s ease;
            outline: none;
            cursor: pointer;
        }
    
        label{
            display: flex;
            justify-content: left;
        }
        
        input:focus, .open-modal-button:focus {
            border: none;
            box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1),
                        inset -5px -5px 10px rgba(255, 255, 255, 1);
        }
        
        .button {
            width: calc(100% - 20px);
            height: 54px;
            padding: 0 8px;
            border: 3px solid rgba(255, 255, 255, 0);
            border-radius: 10px;
            background-color: #EBECF0;
            box-shadow: 8px 8px 12px -2px rgba(72, 79, 96, 0.4),
                        -6px -6px 12px -1px rgba(255, 255, 255, 1);
            font-family: "Montserrat", sans-serif;
            font-size: 18px;
            font-weight: 500;
            color: #6C7587;
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;
        }
        
        .button:hover {
            box-shadow: none;
            border: 3px solid rgba(255, 255, 255, 0.5);
        }
        
        .button:active {
            box-shadow: inset 8px 8px 12px -2px rgba(72, 79, 96, 0.4),
                        inset -6px -6px 12px -1px rgba(255, 255, 255, 1);
            border: 3px solid rgba(255, 255, 255, 0);
        }
    
        .dropdown-check-list {
          display: inline-block;
        }
        
        .dropdown-check-list .anchor {
          position: relative;
          cursor: pointer;
          display: inline-block;
          padding: 5px 50px 5px 10px;
          border: 1px solid #ccc;
        }
        
        .dropdown-check-list .anchor:after {
          position: absolute;
          content: "";
          border-left: 2px solid black;
          border-top: 2px solid black;
          padding: 5px;
          right: 10px;
          top: 20%;
          -moz-transform: rotate(-135deg);
          -ms-transform: rotate(-135deg);
          -o-transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }
        
        .dropdown-check-list .anchor:active:after {
          right: 8px;
          top: 21%;
        }
        
        .dropdown-check-list ul.items {
          padding: 2px;
          display: none;
          margin: 0;
          border: 1px solid #ccc;
          border-top: none;
        }
        
        .dropdown-check-list ul.items li {
          list-style: none;
        }
        
        .dropdown-check-list.visible .anchor {
          color: #0094ff;
        }
        
        .dropdown-check-list.visible .items {
          display: block;
        }
    
        .modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 600px;
          border-radius: 10px;
        }
        .modal-content h2 {
          text-align: center;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        .checkbox-list {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .checkbox-list li {
          width: 45%;
          margin: 8px 0;
        }
        .checkbox-list label {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .checkbox-wrapper-53 input[type="checkbox"] {
          visibility: hidden;
          display: none;
        }
      
        .checkbox-wrapper-53 .container {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          font-size: 20px;
          user-select: none;
        }
      
        .checkbox-wrapper-53 .checkmark {
          position: relative;
          margin-right: 10px;
          top: 0;
          left: 0;
          height: 1.3em;
          width: 1.3em;
          background-color: #ccc;
          border-radius: 100%;
          background: #e8e8e8;
          box-shadow: 3px 3px 5px #c5c5c5,
                      -3px -3px 5px #ffffff;
        }
      
        .checkbox-wrapper-53 .container input:checked ~ .checkmark {
          box-shadow: inset 3px 3px 5px #c5c5c5,
                      inset -3px -3px 5px #ffffff;
        }
      
        .checkbox-wrapper-53 .checkmark:after {
          content: "";
          position: absolute;
          opacity: 0;
        }
      
        .checkbox-wrapper-53 .container input:checked ~ .checkmark:after {
          opacity: 1;
        }
      
        .checkbox-wrapper-53 .container .checkmark:after {
          left: 0.45em;
          top: 0.25em;
          width: 0.25em;
          height: 0.5em;
          border: solid darkgray;
          border-width: 0 0.15em 0.15em 0;
          transform: rotate(45deg);
          transition: all 250ms;
        }
    </style>
    </head>
    <body>
        <div class="bg">
        <h2>Web Scrapper Asset</h2>
            <section class="panel">
            
            <div class="column">
                  <form id="scrapeForm">
                  <label for="tipo_de_busqueda">Tipo de Búsqueda:</label><br>
                  <select id="tipo_de_busqueda" name="tipo_de_busqueda">
                    <option value="Zonaprop">Zonaprop</option>
                    <option value="Mercadolibre">Mercadolibre</option>
                    <option value="Argenprop">Argenprop</option>
                    <option value="Properati">Properati</option>
                    <option value="Inmuebles Clarín">Inmuebles Clarín</option>
                    <option value="La Nación Propiedades">La Nación Propiedades</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Landfinder">Landfinder</option>
                  </select><br>
    
                  <label for="tipo_de_busqueda">Tipo propiedad:</label>
                  <button type="button" class="open-modal-button" onclick="openModal()">Seleccionar</button>
    
                    <div id="propertyModal" class="modal">
                      <div class="modal-content">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h2>Seleccionar</h2>

                        <ul class="checkbox-list checkbox-wrapper-53">
                        <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                                  
                                  <input type="checkbox" id="departamento" name="tipos_de_propiedad" value="departamento">
                                  <div class="checkmark"></div>
                                  Departamento
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                                  
                                  <input type="checkbox" id="depto-tipo-casa" name="tipos_de_propiedad" value="depto-tipo-casa">
                                  <div class="checkmark"></div>
                                  PH
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="casa" name="tipos_de_propiedad" value="casa">
                              <div class="checkmark"></div>
                              Casa
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="quinta" name="tipos_de_propiedad" value="quinta">
                              <div class="checkmark"></div>
                              Quinta
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="cochera" name="tipos_de_propiedad" value="cochera">
                              <div class="checkmark"></div>
                              Cochera
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="local" name="tipos_de_propiedad" value="local">
                              <div class="checkmark"></div>
                              Local
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="hotel" name="tipos_de_propiedad" value="hotel">
                              <div class="checkmark"></div>
                              Hotel
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="terreno" name="tipos_de_propiedad" value="terreno">
                              <div class="checkmark"></div>
                              Terreno
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="oficina" name="tipos_de_propiedad" value="oficina">
                              <div class="checkmark"></div>
                              Oficina
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="campo" name="tipos_de_propiedad" value="campo">
                              <div class="checkmark"></div>
                              Campo
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="fondo-comercio" name="tipos_de_propiedad" value="fondo-comercio">
                              <div class="checkmark"></div>
                              Fondo de comercio
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="galpon" name="tipos_de_propiedad" value="galpon">
                              <div class="checkmark"></div>
                              Galpón
                              </label>
                          </div>
                      </li>
                      <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                              <input type="checkbox" id="negocio-especial" name="tipos_de_propiedad" value="negocio-especial">
                              <div class="checkmark"></div>
                              Negocio especial
                              </label>
                          </div>
                      </li>

                        </ul>
                      </div>
                    </div>
    
                    <label for="tipo_de_busqueda">Tipo Transacción:</label>
                  <button type="button" class="open-modal-button" onclick="openModal()">Seleccionar</button>
    
                    <div id="propertyModal" class="modal">
                      <div class="modal-content">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h2>Seleccionar</h2>

                        <ul class="checkbox-list checkbox-wrapper-53">
                        <li>
                          <div class="checkbox-wrapper-53">
                              <label class="container">
                                  
                                  <input type="checkbox" id="departamento" name="tipos_de_propiedad" value="departamento">
                                  <div class="checkmark"></div>
                                  Departamento
                              </label>
                          </div>
                      </li>
                      </ul>
                      
                    <label for="m2_minimos">M2 Mínimos:</label><br>
                    <input type="number" id="m2_minimos" name="m2_minimos" value="0"><br>
                    <label for="m2_maximos">M2 Máximos:</label><br>
                    <input type="number" id="m2_maximos" name="m2_maximos" value="0"><br>
                    <label for="lista_de_barrios">Lista de Barrios:</label><br>
                    <input type="text" id="lista_de_barrios" name="lista_de_barrios" value="villa Elisa"><br>
                </div>
                <button type="button" class="button" onclick="submitForm()">Iniciar Scrapeo</button>
                <a href="https://assetrealestate.monday.com/boards/6001985151/" class="button">Monday</a>
            </form>
        </section>
    </div>
    
    <script>
        function submitForm() {
            const formData = {
                tipos_de_propiedad: Array.from(document.querySelectorAll('input[name="tipos_de_propiedad"]:checked')).map(el => el.value),
                tipos_de_transaccion: document.getElementById('tipos_de_transaccion').value.split(','),
                m2_minimos: parseInt(document.getElementById('m2_minimos').value),
                m2_maximos: parseInt(document.getElementById('m2_maximos').value),
                lista_de_barrios: document.getElementById('lista_de_barrios').value.split(','),
                tipo_de_busqueda: document.getElementById('tipo_de_busqueda').value
            };
    
            fetch('http://localhost:4000/scrap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    
        function openModal() {
          document.getElementById("propertyModal").style.display = "block";
        }
      
        function closeModal() {
          document.getElementById("propertyModal").style.display = "none";
        }
      
        window.onclick = function(event) {
          if (event.target == document.getElementById("propertyModal")) {
            closeModal();
          }
        }
    </script>
    </body>
    </html>
      
`)
})

app.get('/ping',(_req,res) => {//_req es un parametro que no se usa y por typescript se marca con _
    console.log(`llego la req!`)
    res.send("pong")
})

app.post('/scrap',ScrapController.modelAsigment)
