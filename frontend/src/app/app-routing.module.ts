import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AddinstructionsComponent } from './admin/pages/instructions/addinstructions/addinstructions.component';
import { EditSingleInstructionComponent } from './admin/pages/instructions/edit-single-instruction/edit-single-instruction.component';
import { ShowInstructionsUserComponent } from './admin/pages/instructions/show-instructions-user/show-instructions-user.component';
import { ShowSingleInstructionComponent } from './admin/pages/instructions/show-single-instruction/show-single-instruction.component';
import { ShowallinstructionsComponent } from './admin/pages/instructions/showallinstructions/showallinstructions.component';
import { ShowallusersComponent } from './admin/pages/users/showallusers/showallusers.component';
import { ShowsingleuserComponent } from './admin/pages/users/showsingleuser/showsingleuser.component';
import { AuthGuard } from './helper/auth.guard';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },

      { path: 'instructions', component: ShowallinstructionsComponent },
      { path: 'showsingleinstruction/:id', component: ShowSingleInstructionComponent },
      { path: 'addinstruction/:id', component: AddinstructionsComponent },
      { path: 'editinstruction/:id', component: EditSingleInstructionComponent },
      { path: 'showinstructionsuser/:id', component: ShowInstructionsUserComponent },
      { path: 'deleteInstrucion/:id', component: ShowallinstructionsComponent },

      { path: 'users', component: ShowallusersComponent },
      { path: 'singleUser/:id', component: ShowsingleuserComponent },
      { path: 'deleteuser/:id', component: ShowallusersComponent },

    ]
  },
  { path: '**', component: NotfoundpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
