const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async list(req, res) {
        const { page = 1 } = req.query

        const incidents = await connection('incidents').select([
            'incidents.*',
            'ongs.name',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
            'ongs.email',
        ]).limit(5).offset((page - 1) * 5)
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')

        let [count] = await connection('incidents').count()
        count = count['count(*)']

        res.header('X-Total-Count', count)
        res.header('X-Total-Page', Math.ceil(count / 5))

        return res.json(incidents)
    },
    async listByOng(req, res) {
        const ongId = req.headers.authorization

        const incidents = await connection('incidents').select(
            '*'
        ).where({
            ong_id: ongId
        })
        return res.json(incidents)
    },
    async delete(req, res) {

        const { id } = req.params
        const ongId = req.headers.authorization
        console.log("delete -> ongId", ongId)

        const incidents = await connection('incidents').where({
            id
        }).select(`ong_id`).first()
        console.log("delete -> incidents", incidents)
        
        if (ongId !== incidents.ong_id)
            return res.status(401).json({
                error: 'Operation not allowed!'
            })

        await connection('incidents').delete().where({
            id
        })

        console.log('deleted')
    
        return res.status(204).send()
    },
    async create(req, res) {
        const { title, description, value } = req.body

        const ong_id = req.headers['authorization']
    
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
    
        return res.json({
            id
        })
    }
}