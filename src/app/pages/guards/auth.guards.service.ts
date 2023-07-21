import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    |Observable<boolean | UrlTree>
    |Promise<boolean | UrlTree>
    |boolean
    |UrlTree
    {
      return new Promise(reoslve=>
          this.authService.checkToken().then((x)=>
          {
            this.authService.userIsauthenticate().then(status =>
              {
                let redirect: string = state.root.queryParams['redirect'];
                let blnUnauthorize = false;

                // validation
                if (status === false)
                  blnUnauthorize = true;

                // rederectna
                if (blnUnauthorize && redirect != null && redirect.length > 0 )
                  this.router.navigate(["login", {redirect}]);
                else if (blnUnauthorize)
                  this.router.navigate(["login"]);

                reoslve(status);
              })
              .catch(()=>
                {
                  this.router.navigate(["login"]);
                  reoslve(false);

                })
          })
        )

    }
}
