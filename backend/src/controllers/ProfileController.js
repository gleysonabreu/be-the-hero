const connection = require("../database/connection");
module.exports = {

  async index(request, response){
    const { page = 1 } = request.query;

    const ong_id = request.headers.authorization;

    const [count] = await connection('incidents').count();
    
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .where('incidents.ong_id', ong_id)
    .limit(5)
    .offset((page - 1) * 5)
    .select(["incidents.*", 
    'ongs.name', 
    'ongs.email',
    'ongs.whatsapp', 
    'ongs.city', 
    'ongs.uf']);

    response.header("X-Total-Count", count['count(*)']);
    return response.json(incidents);
  }

}