import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import store from '../../modules/Store';
import { IStore, IUser, Props } from '../../types/global';
import tpl from './Found.tpl';

class Found extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    const props: Props = (store.getState().foundUsers || []).map((found: IUser) => ({
      id: found.id,
      display_name: found.display_name ?? 'Без имени',
      first_name: found.first_name,
      second_name: found.second_name,
      login: found.login,
    }));

    return this.compile(tpl, { found: props });
  }
}

const mapStateToProps = (state: IStore) => (state.foundUsers || []).map((found: IUser) => ({
  id: found.id,
  display_name: found.display_name ?? 'Без имени',
  first_name: found.first_name,
  second_name: found.second_name,
  login: found.login,
}));

export default withStore(mapStateToProps)(Found);
