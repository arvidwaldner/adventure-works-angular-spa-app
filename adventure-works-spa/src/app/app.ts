import { Component, signal, OnInit, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { fadeInOnLoad, staggeredLoad, heroAnimation } from './animations/startup-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [fadeInOnLoad, staggeredLoad, heroAnimation]
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('Adventure Works');

  @ViewChild('departmentsSection') departmentsSection!: ElementRef;
  @ViewChild('locationsSection') locationsSection!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  // Animation states (no conditionals needed!)
  protected heroState = signal<'hidden' | 'visible'>('hidden');
  protected card1StateDepartment = signal<'hidden' | 'visible'>('hidden');
  protected card2StateDepartment = signal<'hidden' | 'visible'>('hidden');
  protected card3StateDepartment = signal<'hidden' | 'visible'>('hidden');

  protected card1StateLocation = signal<'hidden' | 'visible'>('hidden');
  protected card2StateLocation = signal<'hidden' | 'visible'>('hidden');
  protected card3StateLocation = signal<'hidden' | 'visible'>('hidden');
  
  ngOnInit() {
    // Orchestrate the startup animation sequence
    this.startupAnimationSequence();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit started');
    
    // Check if we're in the browser (not SSR)
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Not in browser environment, skipping scroll detection');
      return;
    }

    // Add null check for safety
    if (!this.departmentsSection || !this.locationsSection) {
      console.error('Template references not found');
      return;
    }

    this.setupScrollDetection();
  }

  private setupScrollDetection() {
    // BULLETPROOF SOLUTION: Multiple detection methods for 100% reliability
    
    // Method 1: IntersectionObserver (primary)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log(`IntersectionObserver: Section ${entry.target.id} isIntersecting: ${entry.isIntersecting}`);
        this.handleSectionVisibility(entry.target.id, entry.isIntersecting);
      });
    }, {
      threshold: [0, 0.1], // Simple thresholds
      rootMargin: '0px'
    });

    observer.observe(this.departmentsSection.nativeElement);
    observer.observe(this.locationsSection.nativeElement);

    // Method 2: Scroll event listener (backup)
    let scrollTimeout: any;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.checkSectionVisibility();
      }, 100); // Debounce scroll events
    });

    // Method 3: Navigation hash change (for button clicks)
    window.addEventListener('hashchange', () => {
      console.log('Hash changed to:', window.location.hash);
      setTimeout(() => {
        this.checkSectionVisibility();
      }, 300); // Wait for smooth scroll to complete
    });

    console.log('Multi-method scroll detection setup complete');
  }

  private handleSectionVisibility(sectionId: string, isVisible: boolean) {
    if (isVisible) {
      console.log(`Section ${sectionId} is visible - triggering animation`);
      if (sectionId === 'departments') {
        this.animateDepartmentCards();
      } else if (sectionId === 'locations') {
        this.animateLocationCards();
      }
    } else {
      console.log(`Section ${sectionId} is hidden - resetting cards`);
      if (sectionId === 'departments') {
        this.resetDepartmentCards();
      } else if (sectionId === 'locations') {
        this.resetLocationCards();
      }
    }
  }

  private checkSectionVisibility() {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    // Check departments section
    const deptRect = this.departmentsSection.nativeElement.getBoundingClientRect();
    const deptVisible = deptRect.top < viewportHeight * 0.7 && deptRect.bottom > viewportHeight * 0.3;
    
    // Check locations section  
    const locRect = this.locationsSection.nativeElement.getBoundingClientRect();
    const locVisible = locRect.top < viewportHeight * 0.7 && locRect.bottom > viewportHeight * 0.3;
    
    console.log(`Manual check - Departments visible: ${deptVisible}, Locations visible: ${locVisible}`);
    
    if (deptVisible && this.card1StateDepartment() === 'hidden') {
      console.log('Manual trigger: Animating departments');
      this.animateDepartmentCards();
    }
    
    if (locVisible && this.card1StateLocation() === 'hidden') {
      console.log('Manual trigger: Animating locations');
      this.animateLocationCards();
    }
  }
  
  private startupAnimationSequence() {
    // Hero section first
    setTimeout(() => this.heroState.set('visible'), 200);  
  }

  private animateDepartmentCards() {
    setTimeout(() => this.card1StateDepartment.set('visible'), 600);
    setTimeout(() => this.card2StateDepartment.set('visible'), 750);
    setTimeout(() => this.card3StateDepartment.set('visible'), 900);
  }

  private animateLocationCards() {
    setTimeout(() => this.card1StateLocation.set('visible'), 600);
    setTimeout(() => this.card2StateLocation.set('visible'), 750);
    setTimeout(() => this.card3StateLocation.set('visible'), 900);
  }

  private resetDepartmentCards() {
    this.card1StateDepartment.set('hidden');
    this.card2StateDepartment.set('hidden');
    this.card3StateDepartment.set('hidden');
  }

  private resetLocationCards() {
    this.card1StateLocation.set('hidden');
    this.card2StateLocation.set('hidden');
    this.card3StateLocation.set('hidden');
  }
}
