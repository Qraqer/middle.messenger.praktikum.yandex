import Route from './Route';

export default class Router {
  private static _instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = '#app';

  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    if (Router._instance) {
      // eslint-disable-next-line no-underscore-dangle
      return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    // eslint-disable-next-line no-underscore-dangle
    Router._instance = this;
  }

  public setRoot(rootQuery: string) {
    this._rootQuery = rootQuery;

    return this;
  }

  public use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((<Window>event.currentTarget).location.pathname);
    });

    this.history.pushState('', '', window.location.pathname);
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      // this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router();
