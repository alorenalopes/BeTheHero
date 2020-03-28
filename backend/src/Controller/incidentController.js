const connection = require('../Database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query; 

        const [count] = await connection('incidents')
        .count();

        const incidents = await connection('incidents')
            .limit(4)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .offset((page - 1)* 4)
            .select(['incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf']);

        response.header('X-Total-Count',count['count(*)']);

        
        return response.json(incidents);
        
        },
        
    async delete(request, response){

        const{ id } = request.params;
        const ong_id = request.headers.authorization;
        console.log('ong autho' + ong_id);
        
        const incidents = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        console.log('ong' + incidents.ong_id);
        if(incidents.ong_id != ong_id){
            return response.status(401).json({error:'Operação não permitida'});
        }
        
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
            
    },
    
    async create(request,response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const[id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
    
        return response.json({ id });
    }
};