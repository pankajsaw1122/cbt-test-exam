export class AuthData {
    public status: string;
    public message: string;
    public data: any;
  
    constructor(status: string, message: string, data: any) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }