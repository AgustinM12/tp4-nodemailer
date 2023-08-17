const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const nodemailer = require("nodemailer")

require("dotenv").config()

const port = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json())



const enviarMail = async ({subject, text, toEmail}) => {

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.USERMAIL,
            password: process.env.NODEMAILER_PASSWORD
        }
    }

    const transport = nodemailer.createTransport(config);

    const mensaje = {
        from: process.env.USERMAIL,
        to: process.env.USERMAIL,
        // to: "rodrigomazza336@gmail.com",
        subject: "CORREO DE PRUEBA",
        text: "XDLOL MENSAJE"
    }


    const info = await transport.sendMail(mensaje);

    console.log(info)

    return info;

}



app.post("/", async (req, res) => {
    try {
        const sentInfo = await enviarMail(req.body)

        res.status(200).json(sentInfo);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
});


app.listen(port, () => {
    console.log(`SERVIDOR EJECUTANDOSE EN EL PUERTO: ${port}`);
});