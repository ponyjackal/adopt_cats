// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from "@nestjs/common";
// import { classToPlain } from "class-transformer";
// import { Observable } from "rxjs";
// import { timeout } from "rxjs/operators";

// @Injectable()
// export class ExcludeInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     call$: Observable<any>
//   ): Observable<any> {
//     return call$.pipe(map((data) => classToPlain(data)));
//   }
// }
