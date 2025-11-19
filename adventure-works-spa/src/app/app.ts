import { Component, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { heroAnimation } from './animations/startup-animations';
import { DepartmentsService, Department } from './services/departments';
import { LocationsService, Location } from './services/locations';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [heroAnimation]
})
export class App implements OnInit {
  protected readonly title = signal('Adventure Works');
  protected heroState = signal<'hidden' | 'visible'>('hidden');
  
  // Departments data
  protected departments = signal<Department[]>([]);
  protected isLoadingDepartments = signal<boolean>(false);
  
  protected locations = signal<Location[]>([]);
  protected isLoadingLocations = signal<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private departmentsService: DepartmentsService,
    private locationsService: LocationsService
  ) {}
  
  ngOnInit() {
    // Initialize AOS (Animate On Scroll)
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,        // Animation duration
        easing: 'ease-out-cubic', // Animation easing
        once: false,          // Repeat animations on scroll
        mirror: true,         // Animate when scrolling back up
        offset: 120,          // Trigger offset
      });
    }
    
    // Load departments data
    this.loadDepartments();

    //Load locations data
    this.loadLocations();
    
    // Hero section animation (keep this one custom)
    setTimeout(() => this.heroState.set('visible'), 200);
  }

  private loadDepartments() {
    this.isLoadingDepartments.set(true);
    
    this.departmentsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);
        this.isLoadingDepartments.set(false);
      },
      error: (error) => {
        console.error('Failed to load departments:', error);
        this.isLoadingDepartments.set(false);
      }
    });
  }
  
  private loadLocations() {
    this.isLoadingLocations.set(true);
    this.locationsService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        this.isLoadingLocations.set(false);
      },
      error: (error) => {
        console.error('Failed to load locations:', error);
        this.isLoadingLocations.set(false);
      }
    });
  }
}
