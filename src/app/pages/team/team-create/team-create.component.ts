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

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true]
    });
  }

  onSubmit(): void {
    this.showErrors = true;

    if (this.teamForm.valid) {
      this.teamService.createTeam(this.teamForm.value).subscribe({
        next: () => {
          this.goBack();
        },
        error: (error) => {
          console.error('Error creating team:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/team-management']);
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.teamForm.get(fieldName);
    return this.showErrors && field?.invalid || false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.teamForm.get(fieldName);

    if (!field?.errors) return '';

    if (field.errors['required']) {
      return 'Το πεδίο είναι υποχρεωτικό';
    }
    if (field.errors['maxlength']) {
      return 'Το μέγιστο μήκος είναι 255 χαρακτήρες';
    }

    return '';
  }
}
