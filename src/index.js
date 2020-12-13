
const express = require('express')
const cors = require('cors')
const app = express()
let port = process.env.PORT || 3000

//funciones
function Luhn(valor){
	var sumaT = 0;
	var aux;
	if (!isNaN(valor) && valor.length === 11) {
		var subValor = valor.substring(0,10);
		for (var i = 0; i <= subValor.length - 1; i++) {
			aux = parseInt(subValor[i]);
			if (i%2 !== 0) {
				aux = (aux*2).toString();
				aux.length === 2 ? 	sumaT += parseInt(aux[0]) + parseInt(aux[1]) : sumaT += parseInt(aux);
			}else{
				sumaT = sumaT + aux;
			}
		}
		aux = 10-(sumaT%10);
		if(aux===10)
			aux = 0;

		if(aux === parseInt(valor[valor.length-1]))
			return true;
		else
			return false;
	}
	return false;
}

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
	res.json({"Salidos":"Hola Mundo"});
});

app.post('/', (req, res) =>{
	console.log(req.body);

	const { cedula } = req.body;
	if(cedula){
		res.send(Luhn(cedula));
	}else{
		req.send("Error");
	}
})


//iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
