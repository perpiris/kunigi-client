import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-team-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnInit {
  teamForm: FormGroup;
  showErrors = false;
  serverErrors: string[] = [];
  teamId: string;
  selectedFile: File | null = null;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.teamId = this.route.snapshot.params['id'];
    this.teamForm = this.fb.group({
      teamId: [this.teamId],
      description: [''],
      createdYear: [null, [
        Validators.min(1990),
        Validators.max(this.currentYear)
      ]],
      isActive: [true],
      website: ['', [Validators.maxLength(150)]],
      facebook: ['', [Validators.maxLength(150)]],
      youtube: ['', [Validators.maxLength(150)]],
      instagram: ['', [Validators.maxLength(150)]]
    });
  }

  ngOnInit(): void {
    this.loadTeam();
  }

  loadTeam(): void {
    this.teamService.getTeamById(this.teamId).subscribe({
      next: (team: Team) => {
        this.teamForm.patchValue({
          teamId: team.teamId,
          description: team.description,
          createdYear: team.createdYear,
          isActive: team.isActive,
          website: team.website,
          facebook: team.facebook,
          youtube: team.youtube,
          instagram: team.instagram
        });
      },
      error: (error) => {
        this.serverErrors = ['Η ομάδα δεν βρέθηκε'];
        this.router.navigate(['/teams/management']);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.showErrors = true;
    this.serverErrors = [];

    if (this.teamForm.valid) {
      this.teamService.updateTeam(this.teamForm.value).subscribe({
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
      return 'Το πεδίο δεν μπορεί να ξεπεράσει τους 150 χαρακτήρες';
    }
    if (field.errors['min'] || field.errors['max']) {
      return `Το έτος ίδρυσης πρέπει να είναι μεταξύ 1990 και ${this.currentYear}`;
    }

    return '';
  }
}
