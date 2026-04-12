export interface Vehicle {
  id: number;
  vin: string;
  stockNumber: string;
  makeName: string;
  modelName: string;
  productionYear: number;
  trim: string;
  marketingTrim: string;
  bodyType: string;
  color: string;
  engine: string;
  transmissionType: string;
  drivetrainType: string;
  fuelType: string;
  doors: number;
  mileage: number;
  askingPrice: number;
  condition: string;
  sold: boolean;
  floor: boolean;
  rentable: boolean;
  rentPerDay: number;
  vehiclePictures: string[];
  websiteBadge: string;
  badgeColor: string;
  adSettings: Record<string, unknown>;
  adBodyText: string;
}
