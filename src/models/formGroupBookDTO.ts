import { FormControl } from '@angular/forms';
export interface IFormBookDTO{
    name:FormControl | string,
    author:FormControl | string,
    language:FormControl | string,
    category:FormControl | string,
}