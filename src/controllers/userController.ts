import { Request, Response } from 'express';
import User from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addUserAction = async (req: Request, res: Response) => {
    let { firstName, lastName, email, age, interests } = req.body;

    try{
        
        let newUser = new User();
        newUser.name = { firstName, lastName };
        newUser.email = email;
        newUser.age = parseInt(age);
        newUser.interests = interests.split(',');

        let user = await newUser.save();
        console.log("Usuário Cadastrado", newUser);
        
    } catch (error) {
        console.log("ERROR", error);
    }
    res.redirect('/');
};

export const incrementAgeAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user = await User.findOne({ _id: id });
    if(user){
        user.age++;
        await user.save();
    }
    res.redirect('/');
};

export const decrementAgeAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user = await User.findOne({ _id: id });
    if(user){
        user.age--;
        await user.save();
    }
    res.redirect('/');
};

export const deleteUserAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user = await User.findOne({ _id: id });
    if(user){
        await user.remove();
    }
    res.redirect('/');
};