# Shopping Tracking List App

### A system for managing product tracking through online orders.

### Deployment
 This App is deployed on Vercel: [Live Demo](https://naor-yael-26-07-2022.vercel.app/)
### Features

- Create new item.
- Bring back item from archive.
- See the amount of purchases of the products by store name.
- See the **total** price of purchases of the products by store name.


## Here is an example of what an item looks like:

| Item      | Value |
| --------- | -----:|
| Item Name  | SanDisk SSD |
| Online Store     |   Amazon |
| Price (USD only)      |    $10 |
| Delivery EST Date  | 01/12/2020 |

## API
- [Exchange Rate](https://www.abstractapi.com/) (limit up to 1000 requests.)
- [Products](https://fakestoreapi.com/)



## Libraries

- [ngrx/store](https://ngrx.io/guide/store/) used for state management.
- [ngrx/effects](https://v10.ngrx.io/guide/effects#:~:text=%40ngrx%2Feffectslink&text=Effects%20are%20an%20RxJS%20powered,messages%20and%20time%2Dbased%20events./) used for work with WS.
- [Angular Material](https://material.angular.io/) used for design.
- [Angular Flex Layout](https://github.com/angular/flex-layout/) used for style.
- [Moment js](https://momentjs.com/) used for date formatting.
- [Until Destroy](https://github.com/ngneat/until-destroy) for prevent memory leaks issues.


