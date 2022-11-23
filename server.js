import app from './src/app.js' //quando eh import precisa da extensao arquivo

const port = 3000; //or process.env.PORT

app.listen(port, () => {
    console.log(`Servidor escutando na porta http://localhost:${port}`)  
})