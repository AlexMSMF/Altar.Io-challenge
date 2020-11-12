import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { GeneratorComponent } from './components/generator/generator.component';
import { PaymentsComponent } from './components/payments/payments.component';

const routes: Routes = [
    { path: 'generator', component: GeneratorComponent },
  { path: 'payment', component: PaymentsComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [GeneratorComponent, PaymentsComponent];