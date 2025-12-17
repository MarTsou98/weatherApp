/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // ✅ correct import
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios'; // ✅ import AxiosResponse for typing
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class WeatherService {
  private mapAirQuality(data: any) {
    const {
      time,
      pm10,
      pm2_5,
      carbon_monoxide,
      nitrogen_dioxide,
      ozone,
      european_aqi,
    } = data.hourly;

    return time.map((t: string, i: number) => ({
      time: t,
      aqi: european_aqi[i],
      pm10: pm10[i],
      pm2_5: pm2_5[i],
      carbonMonoxide: carbon_monoxide[i],
      nitrogenDioxide: nitrogen_dioxide[i],
      ozone: ozone[i],
    }));
  }

  constructor(private httpService: HttpService) {}

  async getWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(url),
    );
    response.data.latitude = lat;
    response.data.longitude = lon;
    return response.data;
  }

  async getWeatherOpp(lat: number, lon: number) {
    const oppLat = -lat;
    const oppLon = -lon;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${oppLat}&longitude=${oppLon}&current_weather=true`;

    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(url),
    );
    // response.data.current_weather.temperature = 25; // Invert temperature for opposite location
    response.data.latitude = oppLat;
    return response.data;
  }

  async getAirQuality(lat: number, lon: number) {
    const url =
      `https://air-quality-api.open-meteo.com/v1/air-quality` +
      `?latitude=${lat}&longitude=${lon}` +
      `&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi`;

    const response = await firstValueFrom(this.httpService.get(url));

    return this.mapAirQuality(response.data);
  }
  async getAirQualitySummary(lat: number, lon: number) {
    const url =
      `https://air-quality-api.open-meteo.com/v1/air-quality` +
      `?latitude=${lat}&longitude=${lon}` +
      `&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi`;
    const response = await firstValueFrom(this.httpService.get(url));
    const mappedData = this.mapAirQuality(response.data);
    const minAqi = Math.min(...mappedData.map((item: any) => item.aqi));
    const maxAqi = Math.max(...mappedData.map((item: any) => item.aqi));
    const avgAqi =
      mappedData.reduce((sum: number, item: any) => sum + item.aqi, 0) /
      mappedData.length;
    return { minAqi, maxAqi, avgAqi , worstAqiTime: mappedData.find((item: any) => item.aqi === maxAqi)?.time};
  }
async getCombinedWeatherAndAirQuality(lat: number, lon: number) {
    const [weather, airQuality] = await Promise.all([
      this.getWeather(lat, lon),
      this.getAirQuality(lat, lon),
    ]);
    const firstAirQuality = airQuality[0];
    const waaaatherWithAirQuality = {...weather, airQuality: firstAirQuality};
return { waaaatherWithAirQuality };
  }
  async getSatelliteRadiation(lat: number, lon: number) {
  try {
   const url = `https://satellite-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&hourly=shortwave_radiation,direct_radiation,diffuse_radiation&models=satellite_radiation_seamless`;

    const response = await firstValueFrom(this.httpService.get(url));

    const hourly = response.data.hourly;
    if (!hourly || !hourly.time || !hourly.shortwave_radiation) {
      throw new Error('Incomplete data from API');
    }

 const radiationData = hourly.time
  .map((t: string, i: number) => ({
    time: t,
    shortwave_radiation: hourly.shortwave_radiation[i]
  }))
  .filter(item => item.shortwave_radiation !== null)
  .filter(item => item.shortwave_radiation !== 0)
  .sort((a, b) => b.shortwave_radiation - a.shortwave_radiation);

    return radiationData;
  } catch (error) {
    console.error('Satellite Radiation API Error:', error.message || error);
    throw new InternalServerErrorException('Failed to fetch satellite radiation data');
  }
}

}
