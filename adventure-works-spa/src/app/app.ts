import { Component, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { heroAnimation } from './animations/startup-animations';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [heroAnimation]
})
export class App implements OnInit {
  protected readonly title = signal('Adventure Works');
  protected heroState = signal<'hidden' | 'visible'>('hidden');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
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
    
    // Hero section animation (keep this one custom)
    setTimeout(() => this.heroState.set('visible'), 200);
  }
}
