export class SnackBarMessage {
  public title?: string;
  public body?: string;
  constructor(data: any = {}, type?: string) {
      this.title = data.type || 'OK';
      if (type === 'success') {
          this.body = data.body || 'Success';
      } else {
          this.body = data.body || 'Something went wrong';
      }
  }
}
