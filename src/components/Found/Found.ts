import { withStore } from '../../hoc/withStore';
import Block from '../../modules/Block';
import store from '../../modules/Store';
import { IUser } from '../../types/global';
import tpl from './Found.tpl';

class Found extends Block {
  constructor(props: any) {
    super({
      ...props,
    });
  }

  render() {
    const props: Record<string, any> = (store.getState().foundUsers || []).map((found: IUser) => ({
      id: found.id,
      display_name: found.display_name ?? 'Без имени',
      first_name: found.first_name,
      second_name: found.second_name,
      login: found.login,
    }));

    return this.compile(tpl, { found: props });
  }
}

const mapStateToProps = (state: any) => (state.foundUsers || []).map((found: IUser) => ({
  id: found.id,
  display_name: found.display_name ?? 'Без имени',
  first_name: found.first_name,
  second_name: found.second_name,
  login: found.login,
}));

export default withStore(mapStateToProps)(Found);
