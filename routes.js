const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        //SELECT * FROM encuesta
        conn.query('SELECT * FROM encuesta, seccion, pregunta, tipo, respuesta', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO encuesta set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('encuesta añadida!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM encuesta WHERE id_encuesta = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('encuesta eliminada!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE encuesta set ? WHERE id_encuesta = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('encuesta actualizada!')
        })
    })
})

module.exports = routes