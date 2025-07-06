import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalSwitcherService {
  constructor() {}

  switchLocale(targetLocale: string) {
    const currentUrl = window.location.href;
    const urlObject = new URL(currentUrl); 

    // Get the current path (e.g., '/api/data')
    let path = urlObject.pathname;

    // Remove leading slash if present to avoid //localize/
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    // Prepend '/localize/' to the path
    urlObject.pathname = `/${targetLocale}/` + path;
    console.log(urlObject.toString());
    window.location.href = urlObject.toString();
  }
}
