import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { Props } from '../types/global';

export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  protected props: Props<P>;
  public children: Record<string, Block<P>> | Record<string, Block<P>[]>;

  constructor(propsAndChildren: Props<P> = {} as Props<P>) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);

    this.props = this._makePropsproxy(props);

    this.children = children;
    this.childrenInit();

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: Props<P>): { props: Props<P>, children: Record<string, Block> } {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // @ts-ignore
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([name, handler]) => {
      if (handler) this._element?.addEventListener(name, handler);
    });
  }

  _removeEvents(): void {
    const { events = {} } = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([name, handler]) => {
      if (handler) this._element?.removeEventListener(name, handler);
    });
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected childrenInit(): void {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return (oldProps && newProps);
  }

  setProps = (nextProps: Object) => {
    if (nextProps) {
      Object.assign(this.props, nextProps);
    }
  };

  private _makePropsproxy(props: Props) {
    return new Proxy(props, {
      get: (target: any, prop: string) => {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  _render() {
    const block = this.render();

    const newElement = block.firstElementChild as HTMLElement;

    if (newElement && this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _createElement(tagName: string) {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: Record<string, any>) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[name] = child.map((ch) => {
          if (typeof ch.id === 'undefined') {
            ch.id = ch.props?.id ?? Date.now();
          }

          return `<div data-id=id-${ch.id}></div>`;
        }).join('');

        return;
      }
      if (typeof child.id === 'undefined') {
        child.id = child.props?.id ?? Date.now();
      }

      contextAndStubs[name] = `<div data-id=id-${child.id}></div>`;
    });

    const block = this._createElement('template') as HTMLTemplateElement;

    block.innerHTML = Handlebars.compile(templateString)(contextAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = block.content.querySelector(`[data-id='id-${ch.id}']`);

          if (stub) {
            stub.replaceWith(ch.getContent() as HTMLDivElement);
          }
        });

        return block.content;
      }

      const stub = block.content.querySelector(`[data-id='id-${child.id}']`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
      return;
    });

    return block.content;
  }

  /* compile(template: (ctx: any) => string, context: Record<string, any>) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[name] = child.map((ch) => `<div data-id=id-${ch.id}></div>`);

        return;
      }

      contextAndStubs[name] = `<div data-id=id-${child.id}></div>`;
    });

    const block = this._createElement('template') as HTMLTemplateElement;

    block.innerHTML = template(contextAndStubs);

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = block.content.querySelector(`[data-id='id-${ch.id}']`);

          if (stub) {
            stub.replaceWith(ch.getContent() as HTMLDivElement);
          }
        });

        return block.content;
      }

      const stub = block.content.querySelector(`[data-id='id-${child.id}']`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);

      return;
    });

    return block.content;
  } */

  getContent() {
    return this._element;
  }

  get element() {
    return this._element;
  }
}
