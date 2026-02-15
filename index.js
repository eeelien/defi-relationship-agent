import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

// Agente financiero
app.post("/analyze", (req,res)=>{
  const userMessage = req.body.message.toLowerCase()

  let response = ""

  if(userMessage.includes("bitcoin")){
    response = `
🔥 Bitcoin detectado
💰 Riesgo: Medio
📈 Potencial: Alto largo plazo
🧠 Consejo: No entres por FOMO.
`
  }

  else if(userMessage.includes("nft")){
    response = `
🔥 NFT detectado
💰 Riesgo: Alto
⚠️ Volatilidad extrema.
🧠 Consejo: Investiga el proyecto.
`
  }

  else{
    response = `
🤖 Analizando inversión...
💰 Riesgo: Medio
`
  }

  res.json({response})
})

app.listen(3000,()=>{
  console.log("🚀 DeFi Relationship Agent corriendo en http://localhost:3000")
})
