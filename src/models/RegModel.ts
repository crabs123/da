const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
const email =
  /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
const empty = /^s*$/;

export default class RegOptions {
  public static empty = empty;

  public static email = email;

  public static password = password;
}
