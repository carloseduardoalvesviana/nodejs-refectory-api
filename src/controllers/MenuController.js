const MenuModel = require('../models/Menu');
var { getDate,getMonth, getYear } = require('date-fns');

class MenuController {
  async all(req, res) {
    const response = await MenuModel.find();
    return res.status(200).json(response);
  }

  async find(req, res) {
    const { id } = req.params;
    const response = await MenuModel.findOne({ _id: id });
    return res.json(response);
  }

  async index(req, res) {
    const response = await MenuModel.find(); 

    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    let mesAtual = '0';
    mesAtual += dataAtual.getMonth() + 1;
    const anoAtual = getYear(dataAtual);

    // console.log(diaAtual, mesAtual, anoAtual);

    response.map(menu => {
      const dayMenuExists = menu.date.split('/')[0];
      const mounthMenuExists = menu.date.split('/')[1];
      const yearMenuExists = menu.date.split('/')[2];

      // console.log(dayMenuExists,mounthMenuExists,yearMenuExists );

      if(dayMenuExists == diaAtual && mounthMenuExists == mesAtual && yearMenuExists == anoAtual) {
        return res.json(menu);
      }
    })

    return res.status(200).json(response);
  }

  async store(req, res) {
    
    const { date } = req.body;

    let dayMenu = date.split('/')[0];
    let mounthMenu =  date.split('/')[1];
    let yearMenu = date.split('/')[2];

    const result = await MenuModel.find();

    result.map(menu => {
      const dayMenuExists = menu.date.split('/')[0];
      const mounthMenuExists = menu.date.split('/')[1];
      const yearMenuExists = menu.date.split('/')[2];

      if(dayMenu == dayMenuExists && mounthMenu == mounthMenuExists && yearMenu == yearMenuExists) {
        return res.status(500).json({
          message: 'Já existe um menu nesse dia'
        });
      }
    })

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

      const response = await MenuModel.findOneAndUpdate({ _id: id }, {
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
      const { id } = req.body;
      console.log(id);
      const response = await MenuModel.findByIdAndDelete({ _id: id });
      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new MenuController();
