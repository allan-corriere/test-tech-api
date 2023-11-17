import { Injectable } from '@nestjs/common';
import { Monument } from './classes/monument';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  tranformResponseArmentieres(rawMonuments: Record<string, any>[]): Monument[] {
    return rawMonuments.map((rawMonument) => {
      return new Monument(
        rawMonument['reference_mh'],
        rawMonument['coordonnees_geographiques']['lat'],
        rawMonument['coordonnees_geographiques']['lon'],
        rawMonument['appellation_courante'],
        rawMonument['datation'],
        rawMonument['commune'],
      );
    });
  }

  tranformResponseLille(rawMonuments: Record<string, any>[]): Monument[] {
    return rawMonuments.map((rawMonument) => {
      return new Monument(
        rawMonument['reference_mh'],
        rawMonument['coord_geo'].split(', ')[0],
        rawMonument['coord_geo'].split(', ')[1],
        rawMonument['edifice'],
        rawMonument['datation_bati_lmcu'],
        rawMonument['commune'],
      );
    });
  }

  tranformResponseRoubaix(rawMonuments: Record<string, any>[]): Monument[] {
    return rawMonuments.map((rawMonument) => {
      return new Monument(
        rawMonument['monum_his_com_id'],
        rawMonument['lat'],
        rawMonument['long'],
        rawMonument['appellation_courante'],
        rawMonument['epoque'],
        rawMonument['commune'],
      );
    });
  }

  async fetchAllApis(): Promise<Monument[]> {
    const dataArmentieres = await fetch(
      'https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/monuments-historiques-armentieres/records',
    );
    const dataLille = await fetch(
      'https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/monuments-historiques-lille/records',
    );
    const dataRoubaix = await fetch(
      'https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/liste-monuments-historiques-de-roubaix/records',
    );

    const jsonArmentieres = await dataArmentieres.json();
    const monumentsArmentieres = this.tranformResponseArmentieres(
      jsonArmentieres.results,
    );

    const jsonLille = await dataLille.json();
    const monumentsLille = this.tranformResponseLille(jsonLille.results);

    const jsonRoubaix = await dataRoubaix.json();
    const monumentsRoubaix = this.tranformResponseRoubaix(jsonRoubaix.results);

    return monumentsArmentieres.concat(monumentsLille, monumentsRoubaix);
  }

  stringArrayToSet(stringArray: string[]): string[] {
    return [...new Set(stringArray)];
  }

  extractTypes(monuments: Monument[]): string[] {
    return monuments.map((monument) => {
      return monument.type;
    });
  }

  filterMonuments(monuments: Monument[], filters: object): Monument[] {
    const filterKeys = Object.keys(filters);
    return monuments.filter((monument) => {
      return filterKeys.every((key) => {
        if (!filters[key]) return true;
        if (key === 'lat' || key === 'long') {
          filters[key] = parseFloat(filters[key]);
        }
        if (key === 'date') {
          filters[key] = parseInt(filters[key]);
        }
        return filters[key] === monument[key];
      });
    });
  }

  async findAll(queries?: object): Promise<Monument[]> {
    const allMonuments = await this.fetchAllApis();

    if (Object.keys(queries).length > 0) {
      return this.filterMonuments(allMonuments, queries);
    }

    return allMonuments;
  }

  async markAsBest(id: string): Promise<Monument> {
    const allMonuments = await this.fetchAllApis();

    return allMonuments.find((monument) => monument.id === id);
  }

  async findAllTypes(): Promise<string[]> {
    const allMonuments = await this.fetchAllApis();

    const allTypes = this.extractTypes(allMonuments);

    return this.stringArrayToSet(allTypes);
  }
}
