const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
module.exports = {
  async index(req,res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude} = req.body;
  
    let developer = await Dev.findOne({github_username});

    if(developer) 
      return res.json({message: "Você ja possui uma conta", dev: developer});
      // se ja possui um dev com esse username ele finaliza o metodo aqui
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`)
  
    const {name = login, avatar_url, bio} = apiRes.data;
  
    const techsArray = parseStringAsArray(techs);
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    })
    return res.json(dev)
  },
  async update(req, res){
    
    const dev = await Dev.findById(req.params.id);

    const { name, avatar_url, bio} = req.body;
    dev.name = name;
    dev.bio = bio;
    dev.avatar_url = avatar_url;
    await dev.save();

    //Update para atualizar dados do git
    // const apiRes = await axios.get(`https://api.github.com/users/${dev.github_username}`)
    
    // const {name = login, avatar_url, bio} = apiRes.data;
    // dev.update({
    //   name,
    //   avatar_url,
    //   bio
    // })
    //Update para atualizar dados do git

    return res.json(dev)
  },
  async destroy(req, res){
    // const dev = await Dev.findById(req.params.id);
    Dev.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.json({message: "Erro ao deletar Dev, verifique as informações (id) do dev"})

      return res.json({message: "Dev deletado com sucesso"})
    });
  }
};