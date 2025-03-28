import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    // Register the interceptor so that it can be picked up by withInterceptorsFromDi()
    JwtInterceptor,
  ],
}).catch((err) => console.error(err));
