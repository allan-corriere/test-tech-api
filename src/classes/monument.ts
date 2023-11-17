export class Monument {
  id: string;
  lat: number;
  long: number;
  type: string;
  date: number;
  ville: string;

  constructor(
    id: string,
    lat: number,
    long: number,
    type: string,
    date: number,
    ville: string,
  ) {
    this.id = id;
    this.lat = typeof lat === 'string' ? parseFloat(lat) : lat;
    this.long = typeof long === 'string' ? parseFloat(long) : long;
    this.type = type;
    this.date = typeof date === 'string' ? parseInt(date) : date;
    this.ville = ville;
  }
}
