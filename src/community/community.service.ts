import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppService } from "../app.service";
import { CreateCommunityDto } from './dto/create-community.dto';
import { FindCommunitiesDTO } from './dto/find-communities.dto';
import { FindCommunityAdressDTO } from './dto/find-adress.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community, CommunityDocument } from "./entities/community.entity";
const axios = require("axios");


// Fonctionnalités :
// Un magasin de plantes peut s'inscrire pour apparaitre dans nos communautés
// Un utilisateur inscrit peut trouver les communautés près de chez lui 
// Un utilisateur peut trouver des communautés près de l'adresse qu'il a entré

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    private readonly appService: AppService
  ) {}
  
  // Création d'une communauté à partir d'un nom, d'une adresse (adresse + ville + code postal) et d'un site internet (optionnel)
  async create(createdCommunityDto: CreateCommunityDto) {
    const sentGeo = createdCommunityDto.communityGeo;
    createdCommunityDto.communityPreciseGeo = await this.getCompleteAddress(sentGeo); 
    createdCommunityDto.communityVille = await this.getVille(sentGeo); 
    createdCommunityDto.communityContext = await this.getContext(sentGeo); 
    
    const createdCommunity = new this.communityModel(createdCommunityDto);
    return createdCommunity.save();
  }

  async getCompleteAddress(geo) {
    const response = await axios.get("https://api-adresse.data.gouv.fr/search/?q="+geo);
    return response.data.features[0];
  }

  async getVille(geo) {
    const response = await axios.get("https://api-adresse.data.gouv.fr/search/?q="+geo);
    return response.data.features[0].properties.city;
  }

  async getContext(geo) {
    const response = await axios.get("https://api-adresse.data.gouv.fr/search/?q="+geo);
    return response.data.features[0].properties.context;
  }

  async findAll() {
    const communities = await this.communityModel.find().exec();
    return communities;
  }

  async findOne(id: string) {
    const communities = await this.communityModel.findById(id).exec();
    return communities;
  }

  // filter : ville ou context (département)
  // sort : valeur à comparer en fonction du filtre
  async findCommunities(findCommunitiesDTO: FindCommunitiesDTO) {
    var communities;
    if (findCommunitiesDTO.filter == "ville") {
      communities = await this.communityModel.find({communityVille: findCommunitiesDTO.sort}).exec();
    } else if (findCommunitiesDTO.filter == "context") {
      communities = await this.communityModel.find({communityContext: findCommunitiesDTO.sort}).exec();
    } else {
      communities = 'Pas de community à proximité';
    }
    return communities;
  }

  async findCommunitiesReduced(findCommunitiesDTO: FindCommunitiesDTO) {
    var communities;
    if (findCommunitiesDTO.filter == "ville") {
      communities = await this.communityModel.find({communityVille: findCommunitiesDTO.sort}).exec();
    } else if (findCommunitiesDTO.filter == "context") {
      communities = await this.communityModel.find({communityContext: findCommunitiesDTO.sort}).exec();
    } 

    var communitiesReduced = [];
    communities.forEach(community => {
      communitiesReduced.push([community.communityName, community.communityGeo, community.communityWebsite]);
    });

    return communitiesReduced;
  }

  async findCommunitiesByAdress(findCommunityAdressDTO: FindCommunityAdressDTO) {
    var communities;

    if (findCommunityAdressDTO.filtre == "ville") {
      const ville = await this.getVille(findCommunityAdressDTO.adresse);
      communities = await this.communityModel.find({communityVille: ville}).exec();
    } else if (findCommunityAdressDTO.filtre == "context") {
      const context =  await this.getContext(findCommunityAdressDTO.adresse);
      communities = await this.communityModel.find({communityContext: context}).exec();
    } 
    
    var communitiesReduced = [];
    communities.forEach(community => {
      communitiesReduced.push([community.communityName, community.communityGeo, community.communityWebsite]);
    });

    return communitiesReduced;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    const task = await this.communityModel.updateOne({ id: id }, updateCommunityDto);
    return task;
  }

  async remove(id: string) {
    const task = await this.communityModel.deleteOne({ id: id });
    return task;
  }

}