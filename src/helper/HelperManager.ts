import { Linking, Platform } from "react-native";
import UuidAlternative from "./UuidAlternative";
import parsePhoneNumber, { CountryCode, PhoneNumber } from "libphonenumber-js";
import RNFetchBlob from "rn-fetch-blob";
import jwtDecode from "jwt-decode";

interface IOmit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

class HelperManager {
  private timeoutId!: NodeJS.Timeout;

  public debounce = <T extends Function>(func: T, delay: number) => {
    return <G>(...args: G[]) => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  public static number2float = (number: number) => {
    return Number(number.toFixed(2));
  };

  public static upperCaseFirstLetter = (param: string) => {
    if (this.checkInvalidity(param)) {
      return "";
    }
    const input = param.toLowerCase();
    const output = input.charAt(0).toUpperCase() + input.slice(1);
    return output;
  };

  public static upperCaseEveryFirstLetter = (param: string) => {
    const output = param
      .split(" ")
      .map((str) => this.upperCaseFirstLetter(str))
      .join(" ");
    return output;
  };

  public static checkInvalidity = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Object && Object.keys(param).length === 0) ||
      (Array.isArray(param) && param.length === 0) ||
      param === "" ||
      Number.isNaN(param)
    ) {
      return true;
    }

    return false;
  };

  public static handleLongName = (textString: string, limit: number) => {
    if (this.checkInvalidity(textString)) {
      return "";
    }
    if (textString.length >= limit && !this.checkInvalidity(textString))
      return textString.substring(0, limit - 3) + "...";
    return textString;
  };

  public static delayer = (number: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, number);
    });
  };

  public static isAllNull = (strArr: string[]) => {
    return strArr.every((item) => item === null || item === undefined);
  };

  /**
   *
   * @abstract an utility to handle filter the duplicate object based on on property/path
   *
   */
  public static getUniqueObjectArr = <T>(arr: T[], path: string): T[] => {
    const unique = arr
      .map((e: T) => (e as any)[path])
      .map((e: T, i: number, final: T[]) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);
    return unique;
  };

  /**
   *
   * @abstract an utility to handle filter the duplicate string / number
   *
   */
  public static getUniqueItemArr = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  };

  public static groupBy = <T>(list: T[], keyGetter: Function) => {
    const map = new Map();
    list.forEach((item: T) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  public static splitObjectKeyIntoWords = (input: string) => {
    const output = input.split(/(?=[A-Z])/);
    return this.upperCaseEveryFirstLetter(output.join(" "));
  };

  public static pickFnc = <T, G extends keyof T>(object: T, keys: G[]): Pick<T, G> => {
    return Object.assign(
      {},
      ...keys.map((key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          return { [key]: object[key] };
        }
      }),
    );
  };

  public static omitFnc: IOmit = (obj, ...keys) => {
    const rest = {} as {
      [K in keyof typeof obj]: (typeof obj)[K];
    };
    let key: keyof typeof obj;
    for (key in obj) {
      if (!keys.includes(key)) {
        rest[key] = obj[key];
      }
    }
    return rest;
  };

  public static removeDuplicates = <T extends Object>(originalArray: T[], prop: keyof T) => {
    const newArray = [];
    const lookupObject: any = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const u in lookupObject) {
      newArray.push(lookupObject[u]);
    }
    return newArray;
  };

  public static shallowEqual = <T extends Object>(objectOne: T, objectTwo: T) => {
    const keys1 = Object.keys(objectOne);
    const keys2 = Object.keys(objectTwo);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (JSON.stringify(objectOne[key as keyof T]) !== JSON.stringify(objectTwo[key as keyof T])) {
        return false;
      }
    }
    return true;
  };

  public static validNumberPadString = (inputString: string) => {
    const output: string[] = [];
    const validValue = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (const character of inputString.split("")) {
      for (const validCharacter of validValue) {
        if (character === validCharacter) {
          output.push(character);
        }
        if ((character === "." && !output.includes(character)) || (character === "," && !output.includes(character))) {
          if (character === "." && !output.includes(",")) {
            output.push(character);
          }
          if (character === "," && !output.includes(".")) {
            output.push(".");
          }
        }
      }
    }
    if (output[0] === "." || output[0] === ",") {
      output.shift();
    }
    return output.join("");
  };

  public static randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  public static validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  public static idGenerator = UuidAlternative;

  public static groupByV2 = <T>(xs: T[], key: keyof T) => {
    return xs.reduce(function (rv: any, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  public static updateVersionString = () => {
    return `Staging`;
  };

  public static numberWithCommas = (x: string | number) => {
    if (HelperManager.checkInvalidity(x)) {
      return "";
    }
    const noArr = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];
    let parts;
    if (typeof x === "string") {
      parts = x.split(".");
    } else {
      if ((x as number).toString().includes(".")) {
        parts = (x as number).toFixed(2).toString().split(".");
      } else {
        parts = (x as number).toString().split(".");
      }
    }
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length === 2 && parts[1] === "00") {
      return parts[0];
    }

    if (parts.length === 2 && noArr.includes(parts[1])) {
      return [parts[0], parts[1].split("")[0]].join(".");
    }
    return parts.join(".");
  };

  public static containsSpecialChars = (password: string) => {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(password);
  };

  public static checkValidPassword = (password: string) => {
    if (this.checkInvalidity(password) || password.length <= 5 || !this.containsSpecialChars(password)) return false;

    return true;
  };

  public static openAppStore = () => {
    if (Platform.OS === "ios") {
      const link = "itms-apps://apps.apple.com/tr/app/times-tables-lets-learn/id1055437768?l=tr";
      Linking.canOpenURL(link).then(
        (supported) => {
          if (supported) {
            Linking.openURL(link);
          }
        },
        (err) => console.log(err),
      );
      return;
    }
    Linking.openURL("http://play.google.com/store/apps/details?id=com.google.android.apps.maps");
  };

  public static isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }

  public static formatMMSS = (second: number) => {
    // tslint:disable-next-line: no-bitwise
    const roundingSecond = ~~second;
    const hour = Math.floor(roundingSecond / 3600);
    const minute = Math.floor((roundingSecond % 3600) / 60);
    const remainderSecond = roundingSecond % 60;
    return `${hour > 0 ? (hour < 10 ? `0${hour}:` : `${hour}:`) : ""}${minute < 10 ? `0${minute}` : minute}:${
      remainderSecond < 10 ? `0${remainderSecond}` : remainderSecond
    }`;
  };

  public static isValid = (input: string, conditions: RegExp[]) => {
    if (HelperManager.checkInvalidity(input)) return false;
    return conditions.every((c) => !!c.test(input.trim()));
  };

  public static isValidPhoneNumber = (input: string, country: CountryCode): boolean => {
    const phoneNumber = parsePhoneNumber(input, country);
    if (HelperManager.checkInvalidity(phoneNumber)) {
      return false;
    }

    return (phoneNumber as PhoneNumber).isValid() === true;
  };

  public static occurrences(string: string, subString: string, allowOverlapping = false) {
    string += "";
    subString += "";
    if (subString.length <= 0) return string.length + 1;

    let n = 0,
      pos = 0;
    const step = allowOverlapping ? 1 : subString.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }

  public static measureConnectionSpeed = (): Promise<string> => {
    const downloadSizeInBits = 12000000;
    const imageURI =
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c98ec19e-aae2-4d4c-a71f-77b215bd93ec/ddrzwsu-2e2b0726-def8-4817-91c0-d8c16b244273.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M5OGVjMTllLWFhZTItNGQ0Yy1hNzFmLTc3YjIxNWJkOTNlY1wvZGRyendzdS0yZTJiMDcyNi1kZWY4LTQ4MTctOTFjMC1kOGMxNmIyNDQyNzMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-AgnfteHKfj6qNKqfxt0K2aEtRdMm-IHKNM7hX3pvqY";

    return new Promise((resolve, reject) => {
      const startTime = new Date().getTime();
      RNFetchBlob.config({
        fileCache: false,
      })
        .fetch("GET", imageURI, {})
        .then(() => {
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const speed = (downloadSizeInBits / (1024 * 1024 * duration)).toFixed(2);

          resolve(`${speed} - MB/s`);
        })
        .catch(reject);
    });
  };

  public static getUserId = (token: string) => {
    if (HelperManager.checkInvalidity(token)) return "";
    interface ISub {
      sub: string;
    }
    const parsedToken: ISub = jwtDecode(token);
    return parsedToken.sub;
  };
}

export default HelperManager;
