export class Radian {
  _value = 0;

  constructor(value: number) {
    this._value = value;
  }

  toDegree = (): number => (this._value * 180) / Math.PI;
}
