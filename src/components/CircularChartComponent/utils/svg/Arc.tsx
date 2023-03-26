import { PolarCoordinate } from "../coordinate/PolarCoordinate";

export type ArcParams = Pick<Arc, "coordX" | "coordY" | "startAngle" | "endAngle" | "radius">;

export class Arc {
  coordX = 0;

  coordY = 0;

  radius = 0;

  startAngle = 0;

  endAngle = 0;

  constructor(props: ArcParams) {
    this.coordX = props.coordX;
    this.coordY = props.coordY;
    this.radius = props.radius;
    this.startAngle = props.startAngle;
    this.endAngle = props.endAngle;
  }

  getDrawPath(): string {
    const start = new PolarCoordinate({
      coordX: this.coordX,
      coordY: this.coordY,
      radius: this.radius,
      angle: this.endAngle,
    }).toCartesian();

    const end = new PolarCoordinate({
      coordX: this.coordX,
      coordY: this.coordY,
      radius: this.radius,
      angle: this.startAngle,
    }).toCartesian();

    const largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";

    const d = ["M", start.x, start.y, "A", this.radius, this.radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

    return d;
  }
}
