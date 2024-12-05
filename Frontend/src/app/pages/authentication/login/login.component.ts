import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router
import { UserserviceService } from 'src/app/core/services/userservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: UserserviceService, private router: Router) {}  // Inject Router here

  login(userData: any): void {
    this.authService.login(userData).subscribe({
      next: (response: any) => {
        console.log('Logged in:', response);

        const token = response.token; // Assuming the token comes in the 'token' field
        if (token) {
          localStorage.setItem('auth_token', token); // Save the JWT token in localStorage
          console.log('Login successful, redirecting...');
          this.router.navigate(['/dashboard']); 
          alert('Login successful!');
        }

        
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
