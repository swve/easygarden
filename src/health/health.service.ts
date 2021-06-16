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
    createHealthDto.humidité=meteoG['main']['humidity']+"%";
    let tmp = parseInt(meteoG['main']['temp'])- 273;
    createHealthDto.température= tmp.toString()+" °C";

    createHealthDto.qualitéAir= await this.getPollution(sentLat, sentLon);


    createHealthDto.planteInfo="";

    let i=0;
    createHealthDto.plantsIds.forEach(element => {
      console.log(i);
      let infoTmp=this.appService.trefle()[""+element+""]['best_temp'];
      if(parseInt(infoTmp)<tmp){
        createHealthDto.planteInfo+="Les "+element+"s ont besoin de "+(tmp-parseInt(infoTmp))+" °C en moins. ";
      }else if(parseInt(infoTmp)>tmp){
        createHealthDto.planteInfo+="Les "+element+"s ont besoin de "+(parseInt(infoTmp)-tmp)+" °C en plus. ";
      }else if(parseInt(infoTmp)==tmp){
        createHealthDto.planteInfo+="Les "+element+"s sont à la bonne température. ";
      }
      i=i+1;
    });
    
    
   
    
  

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
    const qualiAirG=response['data']['data'];
    let tmp;

    if(parseInt(qualiAirG['current']['pollution']['aqius'])<=50){
      tmp="Air bon : "+qualiAirG['current']['pollution']['aqius']+" aqi."
    }else if(parseInt(qualiAirG['current']['pollution']['aqius'])<=100&&(parseInt(qualiAirG['current']['pollution']['aqius'])>50)){
      tmp="Air modérement bon: "+qualiAirG['current']['pollution'][' aqius']+" aqi."
    }else if(parseInt(qualiAirG['current']['pollution']['aqius'])<=150&&(parseInt(qualiAirG['current']['pollution']['aqius'])>100)){
      tmp="Air insalubre pour les groupes sensibles : "+qualiAirG['current']['pollution']['aqius']+"aqi."
    }else if(parseInt(qualiAirG['current']['pollution']['aqius'])<=200&&(parseInt(qualiAirG['current']['pollution']['aqius'])>150)){
      tmp="Air malsain : "+qualiAirG['current']['pollution']['aqius']+" aqi."
    }else if(parseInt(qualiAirG['current']['pollution']['aqius'])<=300&&(parseInt(qualiAirG['current']['pollution']['aqius'])>200)){
      tmp="Air très malsain : "+qualiAirG['current']['pollution']['aqius']+" aqi."
    }else if(parseInt(qualiAirG['current']['pollution']['aqius'])<=500&&(parseInt(qualiAirG['current']['pollution']['aqius'])>300)){
      tmp="Air dangereux : "+qualiAirG['current']['pollution']['aqius']+" aqi."
    }

  return tmp;
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
