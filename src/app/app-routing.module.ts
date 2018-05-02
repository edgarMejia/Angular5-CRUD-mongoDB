import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// LAYOUT
import { LayoutComponent } from './components/layout/layout.component';

// PAGES:
import { HomeComponent } from './components/home/home.component';

// ROUTES:
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: '**', redirectTo: '/' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule { }