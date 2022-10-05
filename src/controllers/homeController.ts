import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    await User.updateMany(
        { age: {$lte: 18} },
        { age: 18 }
    );
    


    let users = await User.find({}).sort({ age: 1});

    res.render('pages/home', {
        users
    });
};