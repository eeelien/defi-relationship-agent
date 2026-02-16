
const express = require("express")
const cors = require("cors")

const axios = require("axios")


const path = require("path")
const app = express()
// Endpoint para obtener el precio actual de Bitcoin usando axios
app.get("/price", async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: "bitcoin",
        vs_currencies: "usd"
      }
    })
    res.json({ price: response.data.bitcoin.usd })
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo el precio" })
  }
})


app.use(cors())
app.use(express.json())


// Servir archivos estáticos (como index.html, CSS, JS)
app.use(express.static(__dirname));

// Servir index.html en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/analyze", (req, res) => {
  const userMessage = req.body.message.toLowerCase()

  const tipo = userMessage.includes("bitcoin") ? "bitcoin" :
               userMessage.includes("nft") ? "NFT" :
               userMessage.includes("defi") ? "DeFi" : "Otro"

  function calcularRiesgo(tipo) {
    switch(tipo){
      case "bitcoin": return Math.floor(Math.random() * 21) + 30
      case "NFT": return Math.floor(Math.random() * 41) + 60
      case "DeFi": return Math.floor(Math.random() * 31) + 50
      default: return Math.floor(Math.random() * 21) + 40
    }
  }

  const riesgo = calcularRiesgo(tipo)

  const respuesta = `
🔥 ${tipo.toUpperCase()} detectado
💰 Riesgo: ${riesgo}/100
🧠 Consejo: Mantén estrategia y controla emociones.
`

  console.log("Decisión registrada:", userMessage)

  res.json({ respuesta })
})

app.listen(3000, () => {
  console.log("🚀 DeFi Relationship Agent corriendo en http://localhost:3000")
})
