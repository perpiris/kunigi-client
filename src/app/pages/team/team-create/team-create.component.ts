import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.css'
})
export class TeamCreateComponent {
  teamForm: FormGroup;
  showErrors = false;
  serverErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router
  ) {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      isActive: [true]
    });
  }

  onSubmit(): void {
    this.showErrors = true;
    this.serverErrors = [];

    if (this.teamForm.valid) {
      this.teamService.createTeam(this.teamForm.value).subscribe({
        next: () => {
          this.goBack();
        },
        error: (error) => {
          if (error.error && Array.isArray(error.error)) {
            this.serverErrors = error.error;
          } else {
            this.serverErrors = ['Παρουσιάστηκε κάποιο σφάλμα. Παρακαλώ δοκιμάστε ξανά.'];
          }
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/teams/management']);
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.teamForm.get(fieldName);
    return (this.showErrors && field?.invalid) || false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.teamForm.get(fieldName);

    if (!field?.errors) return '';

    if (field.errors['required']) {
      return 'Tο πεδίο απαιτείται';
    }
    if (field.errors['maxlength']) {
      return 'Το πεδίο δεν μπορεί να είναι πάνω απο 100 χαρακτήρες';
    }

    return '';
  }
}