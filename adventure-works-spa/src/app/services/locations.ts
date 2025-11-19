import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, catchError } from 'rxjs';

export interface Location {
  locationId: number;
  name: string;
  costRate: number;
  availability: number;
  modifiedDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  
  private readonly apiUrl = 'https://localhost:7170/adventure-works/api/production/locations';

  constructor(private http: HttpClient) {}

  /**
   * Get all locations from the API
   */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching locations:', error);
        // Return fallback data in case of API error
        return of(this.getFallbackLocations());
      })
    );
  }

  /**
   * Get location by ID from the API
   */
  getLocationById(id: number): Observable<Location | undefined> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching location by ID:', error);
        return of(undefined);
      })
    );
  }

  /**
   * Fallback locations data in case API is unavailable
   */
  private getFallbackLocations(): Location[] {
    return [
      {
        locationId: 1,
        name: 'Seattle Headquarters',
        costRate: 25.00,
        availability: 96.00,
        modifiedDate: new Date()
      },
      {
        locationId: 2,
        name: 'New York Office',
        costRate: 28.50,
        availability: 92.00,
        modifiedDate: new Date()
      },
      {
        locationId: 3,
        name: 'London Branch',
        costRate: 30.00,
        availability: 89.00,
        modifiedDate: new Date()
      }
    ];
  }
}
