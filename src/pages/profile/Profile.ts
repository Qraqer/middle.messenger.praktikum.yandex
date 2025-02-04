import Block from '../../modules/Block';
import tpl from './Profile.tpl';
import { Props } from '../../types/global';
import { Link, ILinkProps } from '../../components/Link/Link';
import Pages from '..';
import { withStore } from '../../hoc/withStore';
import { profileLabels } from '../../types/const';
import { Avatar } from '../../components/Avatar/Avatar';
import checkUser from '../../utils/checkUser';

class ProfileBase extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  init() {
    super.init();
    checkUser();
  }

  protected childrenInit() {
    this.children = {};
    this.children.backlink = new Link({
      class: 'btn__circle',
      link: Pages.Chatspage.url,
      inner: '',
    });
    this.children.avatar = new Avatar({});
    this.children.links = [
      { link: Pages.ProfileEdit.url, class: 'profile__link', inner: 'Изменить данные' },
      { link: Pages.ProfilePassword.url, class: 'profile__link', inner: 'Изменить пароль' },
      { link: Pages.Chatspage.url, class: 'profile__link c-red', inner: 'К чатам' },
    ].map((link) => new Link(link as ILinkProps));
  }

  render() {
    const profile: Record<string, any> = {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.props).forEach(([key, value], _) => {
      if (key === 'avatar') return;
      profile[key as string] = {
        label: profileLabels[key], value,
      };
    });

    return this.compile(tpl, { profile, display_name: this.props.display_name });
  }
}

const withProfile = withStore((state) => ({
  login: state.user?.login,
  first_name: state.user?.first_name,
  second_name: state.user?.second_name,
  phone: state.user?.phone,
  email: state.user?.email,
  display_name: state.user?.display_name,
  avatar: state.user?.avatar,
}));

export const Profile = withProfile(ProfileBase);
