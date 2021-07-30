const MenuModel = require('../models/Menu');

class MenuController {
  async index(req, res) {
    const response = await MenuModel.find();
    return res.json(response);
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

  async delete(req, res) {
    try {
      const {id} = req.body;
      console.log(id);
      const response = await MenuModel.findByIdAndDelete({ _id: id });
      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new MenuController();
