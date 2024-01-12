import { Component, OnInit } from '@angular/core';

// Imports to work with the Service Worker

import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-pwa';
  phrase: string = '';

  constructor(private _swUpdate: SwUpdate, private _dataService: DataService) {}

  ngOnInit(): void {
    this.updateCache();
  }

  /** Method in charge of showing an alert to the user when the service worker dettects a new version available. */
  updateCache() {
    // Check if the service worker is enabled

    if (this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe({
        next: (event: VersionEvent) => {
          // When the version event is detected we asked the user if he wishes to update to the new version
          if (
            confirm(
              `There is a new version available. Would you like to update?`
            )
          ) {
            //   We tell the service worker to activate the new version
            this._swUpdate
              .activateUpdate()
              .then((value: boolean) => {
                // If the user accepts we update the service worker
                window.location.reload();
              })
              .catch((error) =>
                console.error(
                  `There was an error activating the new version: ${error}`
                )
              )
              .finally(() => console.info('New version activated'));
          }
        },
        error: (error) =>
          console.error(
            `There was an error updating the service worker ${error}`
          ),
        complete: () => console.info('Service Worker Updated'),
      });
    }
  }

  /**
   * Method to get a new random phrase from the data service
   */
  getNewRandomPhrase() {
    this._dataService.getRandomPhrase().subscribe({
      next: (response: any) => (this.phrase = response.content),
      error: (error) =>
        console.error(
          `There was an error getting a new random phrase: ${error}`
        ),
      complete: () => console.info('New phrase loaded'),
    });
  }
}
