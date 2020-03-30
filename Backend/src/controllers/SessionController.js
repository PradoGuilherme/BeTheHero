const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body

        const ongs = await connection('ongs').select(
            'name'
        ).where({
            id
        }).first()

        if (!ongs)
            return res.status(400).send({
                error: 'No ONG found with this ID'
            })
    
        return res.json(ongs)
    }
}