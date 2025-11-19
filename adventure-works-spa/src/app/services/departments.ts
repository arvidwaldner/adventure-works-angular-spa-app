import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, catchError } from 'rxjs';

export interface Department {
  departmentId: number;
  name: string;
  groupName: string;
  modifiedDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  
  private readonly apiUrl = 'https://localhost:7170/adventure-works/api/human-resources/departments';

  constructor(private http: HttpClient) {}

  /**
   * Get all departments from the API
   */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching departments:', error);
        // Return fallback data in case of API error
        return of(this.getFallbackDepartments());
      })
    );
  }

  /**
   * Get department by ID from the API
   */
  getDepartmentById(id: number): Observable<Department | undefined> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching department by ID:', error);
        return of(undefined);
      })
    );
  }

  /**
   * Fallback departments data in case API is unavailable
   */
  private getFallbackDepartments(): Department[] {
    return [
      {
        departmentId: 1,
        name: 'Engineering',
        groupName: 'Research and Development',
        modifiedDate: new Date()
      },
      {
        departmentId: 2,
        name: 'Tool Design',
        groupName: 'Research and Development', 
        modifiedDate: new Date()
      },
      {
        departmentId: 3,
        name: 'Sales',
        groupName: 'Sales and Marketing',
        modifiedDate: new Date()
      }
    ];
  }
}
