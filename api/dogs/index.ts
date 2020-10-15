import { AzureFunction, Context, HttpRequest } from "@azure/functions";

//import { Dog } from '../../shared/interfaces';
export interface Dog {
    name: string;
    age: number;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Returned list of dogs');

    const dogs: Array<Dog> = [
        { name: 'Azure', age: 7 },
        { name: 'Sammy', age: 2 },
        { name: 'Dyson', age: 6 },
        { name: 'Roscoe', age: 15 },
        { name: 'Pookie', age: 8 },
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { dogs }, // { dogs: dogs }
        header: { 'Content-Type': 'application/json' }
    };

};

export default httpTrigger;