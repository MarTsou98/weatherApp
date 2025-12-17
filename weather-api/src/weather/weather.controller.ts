import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { get } from 'axios';
import { BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { ParseFloatPipe } from '@nestjs/common';
@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  async getCurrentWeather(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ) {
    if (!lat || !lon) {
      return { error: 'Please provide lat and lon query parameters' };
    }

    return this.weatherService.getWeather(+lat, +lon);
  }

  @Get('opposite')
  async getOppositeWeather(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ) {
    if (!lat || !lon) {
      return { error: 'Please provide lat and lon query parameters' };
    }

    return this.weatherService.getWeatherOpp(+lat, +lon);
  }

  @Get('test')
  async testEndpoint() {
    return { message: 'Test endpoint is working!' };
  }

  @Get('compare')
  async compareWeather(@Query('lat') lat: string, @Query('lon') lon: string) {
    if (!lat || !lon) {
      return { error: 'Please provide lat and lon query parameters' };
    }
    const currentWeather = await this.weatherService.getWeather(+lat, +lon);
    const oppositeWeather = await this.weatherService.getWeatherOpp(+lat, +lon);

    return {
      currentLocation: currentWeather,
      oppositeLocation: oppositeWeather,
    };
  }
  @Get('air-quality')
  async getAirQuality(@Query('lat') lat: string, @Query('lon') lon: string) {
    if (!lat || !lon) {
      throw new BadRequestException('lat and lon are required');
    }

    return this.weatherService.getAirQuality(+lat, +lon);
  }
  @Get('air-quality-summary')
  async getAirQualitySummary(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
  ) {
    // If lat or lon is invalid, ParseFloatPipe will throw an error automatically
    if (!lat || !lon) {
      throw new BadRequestException('lat and lon must be valid numbers');
    }

    try {
      return this.weatherService.getAirQualitySummary(lat, lon);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch air quality data',
      );
    }
  }
  @Get('combined')
  async getCombinedWeatherAndAirQuality(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
  ) {
    if (!lat || !lon) {
      throw new BadRequestException('lat and lon must be valid numbers');
    }
    return this.weatherService.getCombinedWeatherAndAirQuality(lat, lon);
}
  @Get('satellite-radiation')
  async getSatelliteRadiation(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
  ) {
    if (!lat || !lon) {
      throw new BadRequestException('lat and lon must be valid numbers');
    }
    return this.weatherService.getSatelliteRadiation(lat, lon);
  }
}
