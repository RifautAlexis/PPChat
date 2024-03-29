import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getLoggedUserId();

    // Active si un user est connecté
    if (currentUser) {
      return true;
    }

    // renvoie sur la page login si aucun user de loggé
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
