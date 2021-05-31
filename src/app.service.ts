import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AppService {

  getHello(): string {
    return "Bonjour nous sommes le groupe EasyGarden 🏡";
  }
}
