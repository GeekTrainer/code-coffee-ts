import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import * as mongoose from 'mongoose';
import { updateObjectBindingPattern } from "typescript";
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

import { Dog } from '../../shared/interfaces.d';

// MongoDB schema
const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 16,
        trim: true,
        match: /[A-Za-z]*/,
        required: true,
        index: true,
        unique: true
    },
    age: {
        type: Number,
        min: 0,
        max: 20
    },
    description: {
        type: String,
        maxlength: 1000,
        minlength: 50,
        required: true,
        trim: true
    }
});

// Local document data type
interface DogDocument extends Dog, mongoose.Document { }

// Interface between my code and the database
const DogModel = mongoose.model<DogDocument>('Dog', dogSchema);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Returned list of dogs');

    switch (req.method) {
        case 'POST':
            await createDog(context);
            break;
        case 'PUT':
            await updateDog(context);
            break;
        case 'GET':
            if (context.bindingData.name) {
                // GET: dogs/{name}
                await getDog(context)
            } else {
                // GET: dogs
                await getAllDogs(context);
            }
            break;
    }
};

async function getDog(context: Context) {
    const dog = await DogModel.findOne({name: context.bindingData.name});
    if (dog) {
        context.res = {
            body: dog,
            header: { 'Content-Type': 'application/json' }
        }
    } else {
        // no dog found
        context.res = {
            body: 'No dog found',
            status: 404
        }
    }
}

async function getAllDogs(context: Context) {
    const dogs = await DogModel.find();
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { dogs },
        header: { 'Content-Type': 'application/json' }
    };
}

async function createDog(context: Context) {
    const newDog = context.req.body as Dog; // get data from user
    const databaseDog = await DogModel.create(newDog); // saving to database
    context.res = {
        body: databaseDog,
        status: 201,
        header: { 'Content-Type': 'application/json' }
    }
}

async function updateDog(context: Context) {
    const dog = context.req.body as Dog;
    await DogModel.update({name: dog.name}, dog);
    context.res = {
        status: 203
    }
}

export default httpTrigger;
