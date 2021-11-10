import { IOperation } from './interfaces';
import { IStores } from './index';
import * as services from 'services';
import { ListStoreConstructor } from './core/ListStoreConstructor';
import { observable } from 'mobx';
import { validators } from 'services';

export class AdminOperations extends ListStoreConstructor<IOperation> {
  @observable validatorUrl = validators[0];
  @observable manager = '';

  constructor(stores: IStores) {
    super(
      stores,
      params =>
        services.getOperationsAdmin(params, this.manager, this.validatorUrl),
      {
        pollingInterval: 10000,
      },
    );
  }
}
