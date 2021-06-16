import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Bonjour nous sommes le groupe EasyGarden 🏡";
  }

  /**
   * A service that simulate what something
   * like the Trefle API would return
   * @returns Array of Plants
   */
  trefle() {
    
    return {
      "tomate":{
          id: "tmt-2332098",
          name: "Tomate",
          family: "Solanacées",
          best_temp: "20",
          time_to_grow: "30", 
        },
      "orange":
        {
          id: "or-232098",
          name: "Orange",
          family: "Rutacées",
          best_temp: "45",
          time_to_grow: "20",
        },
      };
  }
}
