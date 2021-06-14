import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppService } from "src/app.service";
import { CreateHealthDto } from "./dto/create-health.dto";
import { UpdateHealthDto } from "./dto/update-health.dto";
import { Health, HealthDocument } from "./entities/health.entity";
const axios = require("axios");

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(Health.name) private healthModel: Model<HealthDocument>,
    private readonly appService: AppService
  ) {}



  async create(createHealthDto: CreateHealthDto) {


    const sentGeo = createHealthDto.gardenGeo;


    var geoG=new Array();

    geoG=await this.getCompleteAddress(sentGeo);
      //recup localisation
    const sentVille=geoG[0]['properties']['city'];
    
    const sentLat=geoG[0]['geometry']['coordinates'][1];
    const sentLon=geoG[0]['geometry']['coordinates'][0]; //recup des données faire gaffe longitude donnée avant latitude

    createHealthDto.ville = sentVille;
    
    var meteoG= new Array();

     meteoG= await this.getMeteo(sentVille);


    
    createHealthDto.meteo = meteoG['weather'][0]['main'];
    createHealthDto.humidité=meteoG['main']['humidity'];



    var qualiAirG= new Array();

    qualiAirG= await this.getPollution(sentLat, sentLon);

    createHealthDto.qualitéAir= qualiAirG['current']['pollution']['aqius'];
    console.log(qualiAirG);
    
   

    // save data to the mongoDB database
    const createdHealth = new this.healthModel(createHealthDto);
    return createdHealth.save();
  }

 
  async getCompleteAddress(geo) {
    // get the response from the API
    const response = await axios.get("https://api-adresse.data.gouv.fr/search/?q="+geo);
    return response.data.features;
  }
 

  async getMeteo(ville) {
    // get the response from the API
    const response = await axios.get("http://api.openweathermap.org/data/2.5/weather?q="+ville+"&appid=9f2e39ff6af958d1980ff533fec45072"); 
    return response['data'];
  }

  async getPollution(lat, lon) {
    // get the response from the API
    const response = await axios.get("http://api.airvisual.com/v2/nearest_city?lat="+lat+"&lon="+lon+"&key=e9fcaa43-0b53-42d5-8219-d71319e993ce");   
    return response['data']['data']; //probleme retour undefined et si on laisse juste la reponse c'est trop gros
  }


  async findAll() {
    const health = await this.healthModel.find().exec();
    return health;
    }

    findOne(id: number) {
      return `This action returns a #${id} health`;
    }

    update(id: number, updateHealthDto: UpdateHealthDto) {
      return `This action updates a #${id} health`;
    }

    remove(id: number) {
      return `This action removes a #${id} health`;
    }



}
