import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import * as mongoose from 'mongoose';
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {useNewUrlParser: true});

import { Dog } from '../../shared/interfaces.d';

// MongoDB schema
const dogSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Local document data type
interface DogDocument extends Dog, mongoose.Document {}

// Interface between my code and the database
const DogModel = mongoose.model<DogDocument>('Dog', dogSchema);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Returned list of dogs');

    // temporary code to add dogs
    // await DogModel.insertMany(
    //     [
    //         {name: 'Mongoose', age: 10},
    //         {name: 'Sammy', age: 2}
    //     ]
    // );

    // load all dogs
    const dogs = await DogModel.find();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { dogs }, // { dogs: dogs }
        header: { 'Content-Type': 'application/json' }
    };

};

export default httpTrigger;