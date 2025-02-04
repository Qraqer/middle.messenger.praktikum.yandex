import Block from "../modules/Block";
import store, { StoreEvents } from "../modules/Store";
import { PlainObject } from "../types/global";

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrapper(Component: typeof Block<any>) {
    type P = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

    let thisState: PlainObject | null = null;

    return class extends Component {
      constructor(props: P) {
        thisState = mapStateToProps(store.getState());

        super({ ...props, ...thisState });

        store.on(StoreEvents.UPDATED, () => {
          const stateProps: PlainObject = mapStateToProps(store.getState());
          this.setProps({ ...stateProps });
        })
      }
    }
  }
}
