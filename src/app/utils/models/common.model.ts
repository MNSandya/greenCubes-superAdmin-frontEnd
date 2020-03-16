export class AuthToken {
  accessToken: string;
  public tokenType: string;
  constructor(data: any = {}) {
    this.accessToken = data.token;
    this.tokenType = data.tokenType;
  }
}
export class Userdata {
  public email: string;
  public phone: string;
  public role: string;
  public userName: string;
  public level: string;
  public id: string;
  public image: string;
  public workPlace: string;
  constructor(data: any = {}) {
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
    this.userName = data.userName;
    this.level = data.level;
    this.id = data._id;
    this.image = data.image;
    this.workPlace = data.workPlace;
  }
}
export class ClientDetails {
  public id: string;
  public name: string;
  public branch: string;
  public location: string;
  public url: string;
  public createdDate: any;
  constructor(data: any = {}) {
    this.id = data._id || '';
    this.name = data.name || '';
    this.branch = data.branch || '';
    this.location = data.location || '';
    this.url = data.url || '';
    this.createdDate = data.createdAt || '';
  }
}
