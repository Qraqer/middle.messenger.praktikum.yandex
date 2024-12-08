export const login = {
  title: 'Вход',
  id: 'formlogin',
  inputs: [
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      id: 'login'
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      id: 'password'
    }
  ],
  button: {
    text: 'Войти',
    class: 'btn',
    link: 'chatlist',
    id: 'submit-login'
  },
  link: {
    text: 'Впервые?',
    class: 'align_center',
    link: 'register'
  }
};

export const register = {
  title: 'Регистрация',
  id: 'formreg',
  inputs: [
    {
      name: 'email',
      label: 'Почта',
      type: 'text',
      id: 'email'
    },
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      id: 'login'
    },
    {
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      id: 'first_name'
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      id: 'second_name'
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      id: 'phone'
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      id: 'password'
    },
    {
      name: 'password_check',
      label: 'Пароль (еще раз)',
      type: 'password',
      id: 'password_check'
    },
  ],
  button: {
    text: 'Зарегистрироваться',
    class: 'btn',
    link: 'chatlist',
    id: 'submit-register'
  },
  link: {
    text: 'Войти',
    class: 'align_center',
    link: 'login'
  }
};

export const chatlistData = [
  {
    id: 17,
    title: 'Андрей',
    text: 'Изображение',
    date: '10:49',
    notRead: 2,
  },
  {
    id: 16,
    title: 'Киноклуб',
    text: '<b>Вы:</b> стикер',
    date: '12:00',
    notRead: 0,
  },
  {
    id: 15,
    title: 'Илья',
    text: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня вы узнаете о красивых местах, жутких зверях, и многом другом!',
    date: '15:12',
    notRead: 4,
  },
  {
    id: 14,
    title: 'Вадим',
    text: '<b>Вы:</b> Круто!',
    date: 'Пт',
    notRead: 0,
  },
  {
    id: 13,
    title: 'тет-а-теты',
    text: 'И Human Interface Guildilnes и Material Design рекомендуют регулярно отдыхать и гулять на природе',
    date: 'Ср',
    notRead: 0,
  },
  {
    id: 12,
    title: '1, 2, 3',
    text: 'Миллионы россиян ежедневно проводят десятки часов возле холодильника в надежде обрести вкусную еду',
    date: 'Пн',
    notRead: 0,
  },
  {
    id: 11,
    title: 'Design Destroyer',
    text: 'В 2008 году художник Jon Rafman начал собирать коллекцию гвоздей. На данный момент в его коллекция целых 6 штук!',
    date: 'Пн',
    notRead: 0,
  },
  {
    id: 10,
    title: 'Day.',
    text: 'Так увлекся работой по курсу, что совсем забыл его анонсировать в чате и на Яндексе',
    date: '1 Мая 2020',
    notRead: 0,
  },
  {
    id: 9,
    title: 'Стас Рогозин',
    text: 'Можно или сегодня или завтра сдать работу за все предыдущие годы, а заодно и за последующие?',
    date: '12 Апр 2020',
    notRead: 0,
  },
  {
    id: 8,
    title: 'Андрей',
    text: 'Изображение',
    date: '10:49',
    notRead: 2,
  },
  {
    id: 7,
    title: 'Киноклуб',
    text: '<b>Вы:</b> стикер',
    date: '12:00',
    notRead: 0,
  },
  {
    id: 6,
    title: 'Илья',
    text: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня вы узнаете о красивых местах, жутких зверях, и многом другом!',
    date: '15:12',
    notRead: 4,
  },
  {
    id: 5,
    title: 'Вадим',
    text: '<b>Вы:</b> Круто!',
    date: 'Пт',
    notRead: 0,
  },
  {
    id: 4,
    title: 'тет-а-теты',
    text: 'И Human Interface Guildilnes и Material Design рекомендуют регулярно отдыхать и гулять на природе',
    date: 'Ср',
    notRead: 0,
  },
  {
    id: 3,
    title: '1, 2, 3',
    text: 'Миллионы россиян ежедневно проводят десятки часов возле холодильника в надежде обрести вкусную еду',
    date: 'Пн',
    notRead: 0,
  },
  {
    id: 2,
    title: 'Design Destroyer',
    text: 'В 2008 году художник Jon Rafman начал собирать коллекцию гвоздей. На данный момент в его коллекция целых 6 штук!',
    date: 'Пн',
    notRead: 0,
  },
  {
    id: 1,
    title: 'Day.',
    text: 'Так увлекся работой по курсу, что совсем забыл его анонсировать в чате и на Яндексе',
    date: '1 Мая 2020',
    notRead: 0,
  },
  {
    id: 0,
    title: 'Стас Рогозин',
    text: 'Можно или сегодня или завтра сдать работу за все предыдущие годы, а заодно и за последующие?',
    date: '12 Апр 2020',
    notRead: 0,
  },
];

export const chatData = {
  title: 'Вадим',
  messages: [
    {
      author: 'none',
      datetime: '11:56',
      type: 'date',
      body: '19 июня',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '11:56',
      type: 'text',
      body: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '11:56',
      type: 'media',
      body: '/img/image.jpg',
      read: true
    },
    {
      author: 'self',
      datetime: '12:00',
      type: 'text',
      body: 'Круто!',
      read: true
    },
    {
      author: 'none',
      datetime: '11:56',
      type: 'date',
      body: '20 июня',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '12:56',
      type: 'text',
      body: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '12:56',
      type: 'media',
      body: '/img/image.jpg',
      read: true
    },
    {
      author: 'self',
      datetime: '12:56',
      type: 'text',
      body: 'Круто!',
      read: true
    },
    {
      author: 'none',
      datetime: '13:00',
      type: 'date',
      body: '21 июня',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '13:56',
      type: 'text',
      body: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      read: true
    },
    {
      author: 'Вадим',
      datetime: '13:56',
      type: 'media',
      body: '/img/image.jpg',
      read: true
    },
    {
      author: 'self',
      datetime: '14:00',
      type: 'text',
      body: 'Круто!',
      read: true
    }
  ]
};

export const profileData = [
  {
    type: 'image',
    label: 'Аватар',
    value: '',
    name: 'avatar'
  },
  {
    type: 'text',
    label: 'Почта',
    value: 'pochta@yandex.ru',
    name: 'email'
  },
  {
    type: 'text',
    label: 'Логин',
    value: 'ivanivanov',
    name: 'login'
  },
  {
    type: 'text',
    label: 'Имя',
    value: 'Иван',
    name: 'first_name'
  },
  {
    type: 'text',
    label: 'Фамилия',
    value: 'Иванов',
    name: 'second_name'
  },
  {
    type: 'text',
    label: 'Имя в чате',
    value: 'Иван',
    name: 'chatname'
  },
  {
    type: 'text',
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
    name: 'phone'
  },
  {
    type: 'password',
    label: 'Пароль',
    value: '12345678',
    name: 'password'
  },
];

export const chatmenu = [
  {
    text: 'Добавить пользователя',
    icon: 'icon-plus',
    action: 'add_user'
  },
  {
    text: 'Удалить пользователя',
    icon: 'icon-close',
    action: 'delete_user'
  },
]

export const attachmenu = [
  {
    text: 'Фото или Видео',
    icon: 'icon-media',
    action: 'attach_media'
  },
  {
    text: 'Файл',
    icon: 'icon-file',
    action: 'attach_file'
  },
  {
    text: 'Локация',
    icon: 'icon-location',
    action: 'attach_location'
  },
]