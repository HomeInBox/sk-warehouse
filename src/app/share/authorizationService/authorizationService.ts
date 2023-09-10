export class AuthorizationService{
  private LoginDetail:any;

  constructor(){

  }

  public CheckAuthorizeCookie():boolean {
    let isAuthorize = false;
    let Cookie = this.GetCookie();
    console.log(Cookie);
    if(Cookie){
      isAuthorize = true;
    }
    return isAuthorize;
  }

  public SetCookie(params:any){
    const d = new Date();
    d.setTime(d.getTime() + (1000000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = params?.name + "=" + params?.token + ";" + expires + ";path=/";
  }

  public GetCookie(){
    let localDataLoginDetail:any = localStorage.getItem("Authorization");
    let LoginDetail = JSON.parse(localDataLoginDetail);
    let resault = "";
    let name = LoginDetail?.name;
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        resault = c.substring(name?.length, c.length);
      }
    }
    return resault.replace('=','');
  }

  public DeleteCookie(){
    let localDataLoginDetail:any = localStorage.getItem("Authorization");
    let LoginDetail = JSON.parse(localDataLoginDetail);
    document.cookie = LoginDetail?.name + "=" + "; 01 Jan 1970 00:00:00 UTC;path=/";
  }
}
