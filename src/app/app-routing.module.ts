import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemComponent} from "./pages/item/item.component";
import {StoreComponent} from "./pages/store/store.component";

const routes: Routes = [
    {path: 'item', component: ItemComponent},
    {path: 'store', component: StoreComponent},
    {path: '', pathMatch: 'full', redirectTo: 'item'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
