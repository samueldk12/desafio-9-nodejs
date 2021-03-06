import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
 
  constructor(
    @inject('ICustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerExist = await this.customersRepository.findByEmail(email);

    if(customerExist){
      throw new AppError('This e-mail is alredy assigned to a customer');
    }

    const customer = await this.customersRepository.create({name, email});

    return customer;
  }
}

export default CreateCustomerService;
