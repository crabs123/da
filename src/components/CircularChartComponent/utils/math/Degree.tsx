export class Degree {
  _value = 0;

  constructor(value: number) {
    this._value = value;
  }

  toRadian = (): number => (this._value * Math.PI) / 180;
}
