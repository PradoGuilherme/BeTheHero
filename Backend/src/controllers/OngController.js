const crypto = require('crypto')
const connection = require('../database/connection')


module.exports = {
    async list(req, res) {
        const ongs = await connection('ongs').select(
            '*'
        )
    
        return res.json(ongs)
    },
    async create(req, res) {
        const id = crypto.randomBytes(4).toString('HEX').toUpperCase()
        const { name, email, whatsapp, city, uf } = req.body
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return res.json({
            id
        })
    }
}