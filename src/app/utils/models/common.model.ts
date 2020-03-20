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
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.role = data.role || '';
    this.userName = data.name || '';
    this.level = data.level || '';
    this.id = data._id || data.id || '';
    this.image = data.image || '';
    this.workPlace = data.workPlace || '';
  }
}
export class ClientDetails {
  public id: string;
  public name: string;
  public branch: string;
  public location: string;
  public backendUrl: string;
  public frontendUrl: string;

  public createdDate: any;
  constructor(data: any = {}) {
    this.id = data._id || '';
    this.name = data.name || '';
    this.branch = data.branch || '';
    this.location = data.location || '';
    this.backendUrl = data.backendUrl || '';
    this.frontendUrl = data.frontendUrl || '';
    this.createdDate = data.createdAt || '';
  }
}
export class VerifyOTP {
  public id: string;
  public OTP: string;
  constructor(data: any = {}) {
    this.id = data.id || '';
    this.OTP = data.OTP || '';
  }
}

export class ForgotPwdResponse {
  email: string;
  userId: string;
  constructor(email?: string, userId?: string) {
    this.email = email;
    this.userId = userId;
  }
}
export class Permissons {
  read: boolean;
  write: boolean;
  earse: boolean;
  constructor(read?: boolean, write?: boolean, earse?: boolean) {
    this.read = read;
    this.write = write;
    this.earse = earse;
  }
}

export class MapMarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  name: string;
  address: string;
  deviceId: string;
  nickName: string;
  constructor(data) {
    this.lat = data.location ? data.location.lat : (data.lat) ? data.lat : '';
    this.lng = data.location ? data.location.long : (data.lng) ? data.lng : '';
    this.label = data.label || '';
    this.draggable = data.draggable;
    this.name = data.name || '';
    this.address = data.address || '';
    this.deviceId = data.deviceId || '';
    this.nickName = data.nickName || '';
  }
}
export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
