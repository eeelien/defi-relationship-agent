import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

// Agente financiero
app.post("/analyze", (req, res) => {
  const userMessage = req.body.message.toLowerCase()

  let response = ""

  // Determinar tipo de inversión
  const tipo = userMessage.includes("bitcoin") ? "bitcoin" :
               userMessage.includes("nft") ? "nft" :
               userMessage.includes("defi") ? "defi" : "otro"

  // Calcular riesgo 0-100 según tipo
  function calcularRiesgo(tipo) {
    switch(tipo){
      case "bitcoin": return Math.floor(Math.random() * 21) + 30; // 30-50
      case "nft": return Math.floor(Math.random() * 41) + 60;   // 60-100
      case "defi": return Math.floor(Math.random() * 31) + 50;  // 50-80
      default: return Math.floor(Math.random() * 21) + 40;      // 40-60
    }
  }

  const riesgo = calcularRiesgo(tipo)

  // Crear la respuesta final
  response = `
🔥 ${tipo.toUpperCase()} detectado
💰 Riesgo: ${riesgo}/100
🧠 Consejo: Mantén estrategia y controla emociones.
  `

  console.log("Decision logged to Monad:", userMessage)

  // Enviar respuesta al frontend
  res.json({response})
})

app.listen(3000, () => {
  console.log("🚀 DeFi Relationship Agent corriendo en http://localhost:3000")
})
