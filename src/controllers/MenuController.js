const MenuModel = require('../models/Menu');

class MenuController {
  async index(req, res) {
    const response = await MenuModel.find();
    return res.json(response);
  }

  async delete(req, res) {
    const id = req.body.id;
    await MenuModel.findOneAndDelete({ _id: id });
    return res.status(200).json({message: 'deleted'});
  }

  async store(req, res) {
    const response = await MenuModel.create(req.body);
    return res.json(response);
  }

  async update(req, res) {
    try {
      const id = req.body.id;
      const description = req.body.description;
      const title = req.body.title;
      const date = req.body.date;
      const type = req.body.type;
  
      let data = {
        description, 
        title, 
        date, 
        type
      }

      console.log(data);
  
      const response  = await MenuModel.findOneAndUpdate({ _id: id }, {
        description: description, 
        title: title, 
        date: date, 
        type: type
      }, { new: true });
  
      return res.json(response);
    } catch (error) {
      
    }
   
  }
}

module.exports = new MenuController();
