import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSwitcherService {

constructor() { }

switchLocale(targetLocale:string, supportedLocales = ['en-US', 'ar']) {
    const currentUrl = window.location.href;
  let newUrl = currentUrl;

  const urlParts = new URL(currentUrl);
  let path = urlParts.pathname; 
  const baseUrl = urlParts.origin; 
  const searchParams = urlParts.search; 
  const hash = urlParts.hash; 

  let currentLocaleFound = false;

  for (const locale of supportedLocales) {
    const localePathSegment = `/${locale}/`;

    if (path.startsWith(localePathSegment)) {
      path = path.replace(localePathSegment, `/${targetLocale}/`);
      currentLocaleFound = true;
      break; 
    }
  }

  if (!currentLocaleFound) {
    if (path === '/') {
      path = `/${targetLocale}/`;
    } else {
      path = `/${targetLocale}${path.startsWith('/') ? '' : '/'}${path}`;
    }
  }

  newUrl = `${baseUrl}${path}${searchParams}${hash}`;

  console.log(`Switching from: ${currentUrl}`);
  console.log(`Switching to: ${newUrl}`);

  window.location.href = newUrl;
}

}
