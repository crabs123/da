import { Degree } from "../math";
import { CartesianCoordinate } from "./CartesianCoordinate";
import { Coordinate } from "./Coordinate";

export class PolarCoordinate extends Coordinate {
  coordX = 0;

  coordY = 0;

  radius = 0;

  angle = 0;

  constructor({ coordX, coordY, radius, angle }: { coordX: number; coordY: number; radius: number; angle: number }) {
    super();
    this.coordX = coordX;
    this.coordY = coordY;
    this.angle = angle;
    this.radius = radius;
  }

  toCartesian = (): CartesianCoordinate => {
    const startAngle = this.angle - 90;
    const angleInRadians = new Degree(startAngle).toRadian();

    return {
      x: this.coordX + this.radius * Math.cos(angleInRadians),
      y: this.coordY + this.radius * Math.sin(angleInRadians),
    };
  };
}
