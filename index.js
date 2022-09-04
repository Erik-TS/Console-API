import fs from 'fs'
import express from "express";

const port = 5300
const app = express()

app.get('/search/name/:name', (req, res) => {
    fs.readFile('./consolesDataset.json', (err, data) => {
        err && res.send(`<h1>${err}</h1>`)
        const result = JSON.parse(data)

        const arr = result.consoleList.filter(value => {
            return value.name.toLowerCase().includes(req.params.name.toLowerCase()) || value.nickname.toLowerCase().includes(req.params.name.toLowerCase())
        })
        res.send(arr)
    })
})

app.get('/search/year/:year', (req, res) => {
    fs.readFile('./consolesDataset.json', (err, data) => {
        err && res.send(`<h1>${err}</h1>`)
        const result = JSON.parse(data)

        const arr = result.consoleList.filter( value => {

            let aux = value.launchYear.some( value => {
                return value.year === parseInt(req.params.year)
            })

            return aux
        })
        
        res.send(arr)
    })
})

app.get('/search/company/:company', (req, res) => {
    fs.readFile('./consolesDataset.json', (err, data) => {
        err && res.send(err)
        const result = JSON.parse(data)

        let arr = result.consoleList.filter( value => {
            return value.companyName.toLowerCase() === req.params.company.toLowerCase()
        })

        res.send(arr)
    })
})

app.listen(port, () => { console.log(`Server is running on port ${port}`) })