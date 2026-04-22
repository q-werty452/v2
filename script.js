/* ═══════════════════════════════════════════════════════════
   AURA v2 — script.js
   Fullstack-ready: i18n, menu data, render, interactions.
   Легко адаптируется под Django-шаблоны.
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. ПЕРЕВОДЫ (i18n)
   В Django заменить на {{ translations|json_script:"i18n" }}
───────────────────────────────────────────────────────── */
const I18N = {
    ru: {
        tagline:        'РЕСТОРАН · LOUNGE · BAR',
        rulesTitle:     'Условия гостеприимства',
        rulesText:      'Мы рады приветствовать вас в «Ауре». Приносить собственные напитки запрещено — штраф равен стоимости заказа. За порчу имущества взимается компенсация в трёхкратном размере.',
        openMenu:       'Открыть меню',
        searchPlaceholder: 'Поиск по меню…',
        callWaiter:     'Вызов официанта',
        waiterToast:    'Официант скоро подойдёт',
        chefsChoice:    'Выбор Шефа',
        chefsChoiceSub: 'Рекомендации шеф-повара',
        allDishes:      'Всё меню',
        description:    'Описание',
        composition:    'Состав',
        currency:       'сом',
        dishes:         'блюд',
        chefBadge:      'Выбор Шефа',
        vipTitle:       'VIP-Кабины',
        vipSub:         'Приватные залы',
        vipHint:        'Уточните у администратора',
        vipRental:      'аренда',
        noResults:      'Ничего не найдено',
        moreBtn:        'Подробнее',
        cart:           'Корзина',
        addToCart:      'В корзину',
        cartEmpty:      'Корзина пуста',
        cartAdded:      'добавлено в корзину',
        total:          'Итого',
        clearCart:      'Очистить корзину',
        order:          'Оформить заказ',
        orderToast:     'Официант примет ваш заказ',
    },
    kg: {
        tagline:        'РЕСТОРАН · LOUNGE · BAR',
        rulesTitle:     'Меймандостук шарттары',
        rulesText:      'Сизди «Аура»га кош келиңиз. Өзүңүздүн суусундуктарыңызды алып келүүгө тыюу салынат — айып суммасы заказдын наркына барабар. Мүлктү бузуу үчүн үч эселенген өлчөмдө компенсация алынат.',
        openMenu:       'Меню ачуу',
        searchPlaceholder: 'Тамак издөө…',
        callWaiter:     'Официантты чакыруу',
        waiterToast:    'Официант азыр келет',
        chefsChoice:    'Шеф-поваардын тандоосу',
        chefsChoiceSub: 'Шеф-поваардын сунуштары',
        allDishes:      'Толук меню',
        description:    'Сүрөттөмө',
        composition:    'Курамы',
        currency:       'сом',
        dishes:         'тамак',
        chefBadge:      'Шеф тандады',
        vipTitle:       'VIP-Кабиналар',
        vipSub:         'Жеке залдар',
        vipHint:        'Администраторго кайрылыңыз',
        vipRental:      'ижара',
        noResults:      'Эч нерсе табылган жок',
        moreBtn:        'Толук маалымат',
        cart:           'Себет',
        addToCart:      'Себетке',
        cartEmpty:      'Себет бош',
        cartAdded:      'себетке кошулду',
        total:          'Жыйынтык',
        clearCart:      'Себетти тазалоо',
        order:          'Заказ берүү',
        orderToast:     'Официант заказыңызды кабыл алат',
    }
};

/* ─────────────────────────────────────────────────────────
   2. ДАННЫЕ МЕНЮ
   В Django: {{ categories|json_script:"menu-data" }}
───────────────────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'bread',
        icon: 'bi-egg-fried',
        name: { ru: 'Мучные изделия', kg: 'Ун азыктары' },
        dishes: [
            {
                id: 'nan', chef: false,
                name: { ru: 'Нан', kg: 'Нан' },
                desc: { ru: 'Свежевыпеченный традиционный хлеб с хрустящей корочкой из тандыра.', kg: 'Таандырдан жаңы бышырылган дан нан.' },
                ingr: 'Мука, вода, дрожжи, соль',
                price: '30 / 60',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'patyr', chef: false,
                name: { ru: 'Патыр нан', kg: 'Патыр нан' },
                desc: { ru: 'Пышная узбекская лепёшка с характерным узором, выпеченная в тандыре.', kg: 'Таандырда бышырылган өзбек нааны.' },
                ingr: 'Мука, молоко, масло, соль',
                price: 120,
                image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'boorsok', chef: false,
                name: { ru: 'Боорсок', kg: 'Боорсок' },
                desc: { ru: 'Традиционные кыргызские жареные пышки — воздушное тесто с золотистой корочкой.', kg: 'Алтын кабыгы бар кыргыздын салттуу боорсогу.' },
                ingr: 'Мука, яйцо, молоко, масло, дрожжи',
                price: '180 / 330',
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'samsa', chef: false,
                name: { ru: 'Самса', kg: 'Самса' },
                desc: { ru: 'Слоёная выпечка с сочной мясной начинкой, запечённая до золотистой корочки.', kg: 'Алтын кызгылт кабыгы бар эт менен самса.' },
                ingr: 'Слоёное тесто, говядина, лук, зира',
                price: 70,
                image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'salads',
        icon: 'bi-flower2',
        name: { ru: 'Салаты', kg: 'Салаттар' },
        dishes: [
            {
                id: 'aura-salad', chef: true,
                name: { ru: 'Салат «АУРА»', kg: 'АУРА салаты' },
                desc: { ru: 'Фирменный салат ресторана — жареная курица, моцарелла и черри с бальзамическим акцентом.', kg: 'Ресторандын фирмалык салаты.' },
                ingr: 'Куриное филе, моцарелла, черри, листья салата, бальзамик',
                price: 510,
                image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'rafaello', chef: false,
                name: { ru: 'Рафаэлло', kg: 'Рафаэлло' },
                desc: { ru: 'Нежный салат с курицей, яйцом и картофелем — сытный и воздушный.', kg: 'Тооктун эти, жумуртка жана картошка менен нежный салат.' },
                ingr: 'Куриное филе, яйцо, картофель, майонез',
                price: 470,
                image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'trout-salad', chef: true,
                name: { ru: 'Форель', kg: 'Форель' },
                desc: { ru: 'Изысканный салат с нежной форелью — лёгкий, освежающий, с тонким рыбным ароматом.', kg: 'Форель менен салат — жеңил жана жыпар.' },
                ingr: 'Форель, листья салата, огурец, лимон, оливковое масло',
                price: 510,
                image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'argymak', chef: false,
                name: { ru: 'Аргымак', kg: 'Аргымак' },
                desc: { ru: 'Смелый салат с кониной — насыщенный вкус степного мяса с пряными нотками.', kg: 'Жылкы эти менен нарктуу салат.' },
                ingr: 'Конина, красный лук, зелень, соус',
                price: 400,
                image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'exotica', chef: false,
                name: { ru: 'Экзотика', kg: 'Экзотика' },
                desc: { ru: 'Яркий тропический салат — необычное сочетание сладкого и острого.', kg: 'Экзотикалык тропикалык салат.' },
                ingr: 'Манго, авокадо, перец, лайм, кориандр',
                price: 500,
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'eggplant', chef: false,
                name: { ru: 'Кырсылдак Баклажан', kg: 'Кырсылдак Баклажан' },
                desc: { ru: 'Пикантный салат с хрустящим баклажаном и дымным ароматом гриля.', kg: 'Гриль кырсылдак баклажан менен салат.' },
                ingr: 'Баклажан, помидоры, перец, чеснок, соевый соус',
                price: 500,
                image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'tbilisi', chef: false,
                name: { ru: 'Тбилиси', kg: 'Тбилиси' },
                desc: { ru: 'Грузинский гость меню — сочный и пряный, с ароматом кинзы и грецкого ореха.', kg: 'Грузин усулунда жасалган салат.' },
                ingr: 'Говядина, красная фасоль, грецкий орех, кинза',
                price: 450,
                image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'caesar', chef: false,
                name: { ru: 'Цезарь', kg: 'Цезарь' },
                desc: { ru: 'Вечная классика — хрустящий романо, нежная курица и пармезан под соусом Caesar.', kg: 'Классикалык Цезарь салаты.' },
                ingr: 'Романо, курица, пармезан, сухарики, соус цезарь',
                price: 400,
                image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'spring', chef: false,
                name: { ru: 'Жаз Салаты', kg: 'Жаз Салаты' },
                desc: { ru: 'Лёгкий весенний салат из сезонных свежих овощей.', kg: 'Жазгы жеңил жашылча салаты.' },
                ingr: 'Огурец, помидор, лук, укроп, масло',
                price: 210,
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'soups',
        icon: 'bi-cup-hot',
        name: { ru: 'Первые блюда', kg: 'Биринчи тамактар' },
        dishes: [
            {
                id: 'kozo-shorpo', chef: false,
                name: { ru: 'Көзө Шорпо', kg: 'Көзө Шорпо' },
                desc: { ru: 'Наваристый бульон из говядины на косточке — янтарный, согревающий душу.', kg: 'Сөөктөгү уй этинен кайнатылган шорпо.' },
                ingr: 'Говядина на кости, картофель, морковь, лук, зелень',
                price: 370,
                image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'mal-shorpo', chef: false,
                name: { ru: 'Мал Шорпо', kg: 'Мал Шорпо' },
                desc: { ru: 'Классическая кыргызская шурпа — тысячелетний рецепт в каждой тарелке.', kg: 'Кыргыздын салттуу мал шорпосу.' },
                ingr: 'Говядина, картофель, лук, морковь, специи',
                price: 350,
                image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'chicken-shorpo', chef: false,
                name: { ru: 'Тоок шорпо быштак менен', kg: 'Тоок шорпо быштак менен' },
                desc: { ru: 'Нежный куриный бульон со сливочным сыром — необычно и очень вкусно.', kg: 'Быштак кошулган тоок шорпосу.' },
                ingr: 'Куриное мясо, сыр плавленый, картофель, зелень',
                price: 400,
                image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'kesme', chef: false,
                name: { ru: 'Үй Кесме', kg: 'Үй Кесме' },
                desc: { ru: 'Домашняя лапша ручной работы в сытном бульоне — вкус маминой кухни.', kg: 'Колдон жасалган кесме шорпосу.' },
                ingr: 'Домашняя лапша, говядина, морковь, лук, зелень',
                price: 280,
                image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'chuchpara', chef: false,
                name: { ru: 'Чучпара', kg: 'Чүчпара' },
                desc: { ru: 'Маленькие пельмени в бульоне или со сметаной — нежные, сочные, домашние.', kg: 'Шорпо же каймак менен чүчпара.' },
                ingr: 'Тесто, говядина, лук, бульон, сметана',
                price: '300–380',
                image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'solyanka', chef: false,
                name: { ru: 'Солянка', kg: 'Солянка' },
                desc: { ru: 'Густой мясной суп с копчёностями и оливками — ресторанная классика.', kg: 'Колбаса жана зайтун менен солянка.' },
                ingr: 'Говядина, копчёная колбаса, маслины, огурец, томат',
                price: 300,
                image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'mains',
        icon: 'bi-fire',
        name: { ru: 'Вторые блюда', kg: 'Экинчи тамактар' },
        dishes: [
            {
                id: 'aura-main', chef: false,
                name: { ru: 'Өздүк тамак «АУРА»', kg: 'Өздүк тамак «АУРА»' },
                desc: { ru: 'Гордость кухни ресторана — говядина, рубец, фри и сыр в фирменном исполнении.', kg: 'Ресторандын атактуу тамагы.' },
                ingr: 'Говядина, рубец, картофель фри, сыр',
                price: 600,
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'turmok', chef: false,
                name: { ru: 'Мал этинен Түрмөк', kg: 'Мал этинен Түрмөк' },
                desc: { ru: 'Изящный рулет из говядины — сочный внутри, румяный снаружи.', kg: 'Уй этинен жасалган нарктуу түрмөк.' },
                ingr: 'Говядина, чеснок, зелень, специи',
                price: 600,
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'torpok', chef: false,
                name: { ru: 'Торпок эти жашылча менен', kg: 'Торпок эти жашылча менен' },
                desc: { ru: 'Нежная телятина с сезонными овощами — лёгкое и гармоничное блюдо.', kg: 'Жашылча менен нежный торпок эти.' },
                ingr: 'Телятина, болгарский перец, кабачок, морковь',
                price: 500,
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'kabyrgha', chef: false,
                name: { ru: 'Кабырга', kg: 'Кабырга' },
                desc: { ru: 'Сочные рёбрышки на гриле — дымный аромат и мясо, тающее во рту.', kg: 'Гриль кабыргасы — ширин жыпар менен.' },
                ingr: 'Говяжьи рёбра, чеснок, специи, маринад',
                price: 480,
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'beshbarmak', chef: false,
                name: { ru: 'Беш-Бармак', kg: 'Беш-Бармак' },
                desc: { ru: 'Национальная гордость кыргызской кухни — едят в кругу близких.', kg: 'Кыргыздын улуттук наркы — беш-бармак.' },
                ingr: 'Говядина, чучук, ак серке, домашняя лапша',
                price: 450,
                image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'ribay', chef: true,
                name: { ru: 'Стейк Рибай', kg: 'Рибай Стейк' },
                desc: { ru: 'Классика стейк-хауса — рибай с богатой мраморностью и идеальным балансом вкусов.', kg: 'Стейк-хаустун классикасы — мраморлуу рибай.' },
                ingr: 'Рибай, морская соль, перец, розмарин, масло',
                price: 1100,
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'tibon', chef: false,
                name: { ru: 'Стейк Тибон', kg: 'Тибон Стейк' },
                desc: { ru: 'Легендарный T-Bone — два отруба в одном, разделённые косточкой.', kg: 'Легендарлуу T-Bone стейк.' },
                ingr: 'T-bone говядина, морская соль, перец, тимьян',
                price: 1100,
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'cowboy', chef: false,
                name: { ru: 'Стейк Ковбой', kg: 'Ковбой Стейк' },
                desc: { ru: 'Массивный стейк на кости — для тех, кто любит мясо по-настоящему.', kg: 'Чоң жана нарктуу ковбой стейк.' },
                ingr: 'Рибай на кости, соль, перец, чеснок',
                price: 1100,
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'salmon', chef: false,
                name: { ru: 'Стейк Сёмга', kg: 'Сёмга Стейк' },
                desc: { ru: 'Стейк из атлантического лосося — сочный, с хрустящей кожей.', kg: 'Атлантикалык лосось стейки.' },
                ingr: 'Сёмга, лимон, укроп, оливковое масло',
                price: 1200,
                image: 'https://images.unsplash.com/photo-1519708227418-a8d869a3a0b9?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'snacks',
        icon: 'bi-collection',
        name: { ru: 'Закуски', kg: 'Ысылыктар' },
        dishes: [
            {
                id: 'europe', chef: false,
                name: { ru: 'Европа табагы', kg: 'Европа табагы' },
                desc: { ru: 'Роскошная мясная тарелка в европейском стиле — отборные деликатесы.', kg: 'Европа стилиндеги эт ассорти.' },
                ingr: 'Прошутто, салями, ветчина, зелень',
                price: 1200,
                image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'cheese', chef: false,
                name: { ru: 'Быштак табагы', kg: 'Быштак табагы' },
                desc: { ru: 'Авторская сырная тарелка с мёдом, орехами и виноградом.', kg: 'Автордун быштак табагы — бал жана жаңгак менен.' },
                ingr: 'Бри, гауда, пармезан, мёд, грецкий орех',
                price: 1600,
                image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'kazy', chef: false,
                name: { ru: 'Казы Чучук', kg: 'Казы Чучук' },
                desc: { ru: 'Традиционная кыргызская конская колбаса с неповторимым вкусом.', kg: 'Кыргыздын салттуу казы чучугу.' },
                ingr: 'Конина, жир, чеснок, зира',
                price: 700,
                image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'fish-platter', chef: false,
                name: { ru: 'Балык ассорти', kg: 'Балык ассорти' },
                desc: { ru: 'Нарезка из рыбы холодного копчения — деликатесное ассорти.', kg: 'Суук ысталган балык ассортиси.' },
                ingr: 'Рыба холодного копчения, лимон, каперсы',
                price: 970,
                image: 'https://images.unsplash.com/photo-1519708227418-a8d869a3a0b9?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'kids',
        icon: 'bi-star',
        name: { ru: 'Детское меню', kg: 'Балдар үчүн' },
        dishes: [
            {
                id: 'kids-fry', chef: false,
                name: { ru: 'Фри эт менен', kg: 'Фри эт менен' },
                desc: { ru: 'Хрустящий картофель фри с нежным мясом — любимое детское блюдо.', kg: 'Эт менен кырсылдак картошка фри.' },
                ingr: 'Картофель фри, говядина, кетчуп',
                price: 350,
                image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'nuggets', chef: false,
                name: { ru: 'Нагетсы', kg: 'Нагетсы' },
                desc: { ru: 'Хрустящие куриные наггетсы — маленькие, нежные, с любимым соусом.', kg: 'Тооктун нежный нагетстери.' },
                ingr: 'Куриное филе, панировка, соус на выбор',
                price: 350,
                image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    },
    {
        id: 'drinks',
        icon: 'bi-cup-straw',
        name: { ru: 'Напитки', kg: 'Суусундуктар' },
        dishes: [
            {
                id: 'lemonade', chef: false,
                name: { ru: 'Лимонаддар', kg: 'Лимонаддар' },
                desc: { ru: 'Авторские лимонады — манго, клубника, гранат, классика.', kg: 'Автордун лимонаддары — манго, кулпунай, анар.' },
                ingr: 'Свежие фрукты, мята, содовая, сироп',
                price: 430,
                image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'tashkent-tea', chef: false,
                name: { ru: 'Ташкент Чайы', kg: 'Ташкент Чайы' },
                desc: { ru: 'Ароматный восточный чай по-ташкентски — насыщенный с тонким послевкусием.', kg: 'Ташкент усулунда жыпар чай.' },
                ingr: 'Зелёный чай, кипяток, сахар',
                price: 200,
                image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'aura-tea', chef: false,
                name: { ru: 'Аура Чайы', kg: 'Аура Чайы' },
                desc: { ru: 'Фирменный купаж ресторана — уникальные травы и специи от шеф-повара.', kg: 'Ресторандын фирмалык чайы.' },
                ingr: 'Улун, жасмин, розовые лепестки, кардамон',
                price: 300,
                image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'cola', chef: false,
                name: { ru: 'Кола / Фанта 1л', kg: 'Кола / Фанта 1л' },
                desc: { ru: 'Газированные напитки на ваш выбор, 1 литр.', kg: 'Газдалган суусундуктар, 1 литр.' },
                price: 150,
                image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=480&h=320&q=80'
            },
            {
                id: 'beer', chef: false,
                name: { ru: 'Пиво в ассортименте', kg: 'Сырасы' },
                desc: { ru: 'Широкий выбор пива — Арпа, Corona, Bud, Stella Artois.', kg: 'Кеңири тандоо: Арпа, Corona, Bud, Stella.' },
                price: '200–320',
                image: 'https://images.unsplash.com/photo-1608270586762-0f4f4c52a0d2?auto=format&fit=crop&w=480&h=320&q=80'
            }
        ]
    }
];

/* VIP-кабины (отдельная структура, не блюда) */
const VIP_ROOMS = [
    { id: 'rome',   name: { ru: 'Рим',        kg: 'Рим'        }, price: 400, capacity: { ru: '6–8 мест', kg: '6–8 орун' }, desc: { ru: 'Классический итальянский интерьер', kg: 'Классикалык италиан интерьери' } },
    { id: 'art',    name: { ru: 'Арт',        kg: 'Арт'        }, price: 400, capacity: { ru: '6–8 мест', kg: '6–8 орун' }, desc: { ru: 'Стиль арт-деко, галерейная атмосфера', kg: 'Арт-деко стили, галерея атмосферасы' } },
    { id: 'ethno',  name: { ru: 'Этно',       kg: 'Этно'       }, price: 300, capacity: { ru: '4–6 мест', kg: '4–6 орун' }, desc: { ru: 'Национальный кыргызский интерьер', kg: 'Улуттук кыргыз интерьери' } },
    { id: 'prima',  name: { ru: 'Прима',      kg: 'Прима'      }, price: 300, capacity: { ru: '4–6 мест', kg: '4–6 орун' }, desc: { ru: 'Элегантный закрытый кабинет', kg: 'Элегант жабык кабинет' } },
    { id: 'arch',   name: { ru: 'Арка',       kg: 'Арка'       }, price: 300, capacity: { ru: '4–6 мест', kg: '4–6 орун' }, desc: { ru: 'Уютный зал с арочными сводами', kg: 'Жылуу жай арка менен' } },
    { id: 'summer', name: { ru: 'Летний зал', kg: 'Жайкы зал' }, price: 500, capacity: { ru: '10–20 мест', kg: '10–20 орун' }, desc: { ru: 'Открытая терраса под открытым небом', kg: 'Ачык асман алдындагы терраса' } },
];

/* ─────────────────────────────────────────────────────────
   3. СОСТОЯНИЕ
───────────────────────────────────────────────────────── */
const state = { lang: 'ru', sidebarOpen: false, searchActive: false, cart: [], modalDish: null };

/* ─────────────────────────────────────────────────────────
   4. DOM REFS
───────────────────────────────────────────────────────── */
const splash       = document.getElementById('splash');
const app          = document.getElementById('app');
const sidebarEl    = document.getElementById('sidebar');
const sidebarNav   = document.getElementById('sidebar-nav');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const chefsGrid    = document.getElementById('chefs-grid');
const menuSections = document.getElementById('menu-sections');
const searchInput  = document.getElementById('search-input');
const toastEl      = document.getElementById('toast');
const toastText    = document.getElementById('toast-text');
const modalOverlay = document.getElementById('modal-overlay');
const modalImg     = document.getElementById('modal-img');
const modalCat     = document.getElementById('modal-cat');
const modalName    = document.getElementById('modal-name');
const modalPrice   = document.getElementById('modal-price');
const modalDescBlock = document.getElementById('modal-desc-block');
const modalDescText  = document.getElementById('modal-desc-text');
const modalIngrBlock = document.getElementById('modal-ingr-block');
const modalIngrList  = document.getElementById('modal-ingr-list');
const cartDrawer     = document.getElementById('cart-drawer');
const cartBody       = document.getElementById('cart-body');
const cartTotalEl    = document.getElementById('cart-total-price');
const cartBadgeEl    = document.getElementById('cart-badge');
const cartOverlay    = document.getElementById('cart-overlay');

/* ─────────────────────────────────────────────────────────
   5. i18n — обновление текста на странице
───────────────────────────────────────────────────────── */
function applyLang(lang) {
    state.lang = lang;
    const t = I18N[lang];

    /* Статический текст через data-i18n */
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });

    /* placeholder у input */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key]) el.placeholder = t[key];
    });

    /* Активная кнопка языка */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* Перерисовка динамических компонентов */
    renderSidebar();
    renderChefPicks();
    renderMenuSections();
    renderCart();
}

/* ─────────────────────────────────────────────────────────
   6. РЕНДЕР — Sidebar
───────────────────────────────────────────────────────── */
function renderSidebar() {
    const lang = state.lang;
    const t    = I18N[lang];

    const items = CATEGORIES.map(cat => `
        <div class="sidebar-item" data-target="${cat.id}" role="button" tabindex="0"
             aria-label="${cat.name[lang]}">
            <span class="sidebar-item__icon"><i class="bi ${cat.icon}"></i></span>
            <span class="sidebar-item__name">${cat.name[lang]}</span>
            <span class="sidebar-item__count">${cat.dishes.length}</span>
        </div>
    `).join('');

    const vipItem = `
        <div class="sidebar-item" data-target="vip" role="button" tabindex="0">
            <span class="sidebar-item__icon"><i class="bi bi-gem"></i></span>
            <span class="sidebar-item__name">${t.vipTitle}</span>
        </div>
    `;

    sidebarNav.innerHTML = items + vipItem;

    sidebarNav.querySelectorAll('.sidebar-item').forEach(item => {
        const go = () => { scrollToSection(item.dataset.target); closeSidebar(); };
        item.addEventListener('click', go);
        item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
}

/* ─────────────────────────────────────────────────────────
   7. РЕНДЕР — Chef's Picks
───────────────────────────────────────────────────────── */
function renderChefPicks() {
    const lang = state.lang;
    const t    = I18N[lang];
    const picks = [];

    CATEGORIES.forEach(cat => {
        cat.dishes.forEach(dish => {
            if (dish.chef) picks.push({ dish, catName: cat.name[lang] });
        });
    });

    chefsGrid.innerHTML = picks.map(({ dish, catName }, i) => `
        <div class="chef-card" data-dish-id="${dish.id}" style="animation-delay:${i * 0.08}s">
            <div class="chef-card__img-wrap">
                <img class="chef-card__img" src="${dish.image || ''}"
                     alt="${dish.name[lang]}" loading="lazy"
                     onerror="this.style.opacity='0'">
                <div class="chef-card__img-gradient"></div>
                <div class="chef-badge">
                    <span class="chef-badge__star">✦</span>
                    ${t.chefBadge}
                </div>
            </div>
            <div class="chef-card__body">
                <h3 class="chef-card__name">${dish.name[lang]}</h3>
                ${dish.desc ? `<p class="chef-card__desc">${dish.desc[lang]}</p>` : ''}
                <div class="chef-card__footer">
                    <span class="chef-card__price">
                        ${fmtPrice(dish.price)}<span class="chef-card__price-unit"> ${t.currency}</span>
                    </span>
                    <div class="chef-card__actions">
                        <div class="dish-card__ctrl" data-dish-id="${dish.id}">
                            ${cardCtrlHtml(dish.id, t)}
                        </div>
                        <span class="chef-card__more">${t.moreBtn}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    chefsGrid.querySelectorAll('.chef-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.dish-card__ctrl')) return;
            const pick = picks.find(p => p.dish.id === card.dataset.dishId);
            if (pick) openModal(pick.dish, pick.catName);
        });
    });

    chefsGrid.querySelectorAll('.dish-card__ctrl').forEach(ctrl => bindCtrlEvents(ctrl));
}

/* ─────────────────────────────────────────────────────────
   8. РЕНДЕР — Все секции категорий + VIP
───────────────────────────────────────────────────────── */
function renderMenuSections() {
    const lang = state.lang;
    const t    = I18N[lang];

    let html = CATEGORIES.map(cat => `
        <section class="cat-section" id="section-${cat.id}" data-cat="${cat.id}">
            <div class="cat-section__header">
                <div class="cat-section__icon"><i class="bi ${cat.icon}"></i></div>
                <div class="cat-section__titles">
                    <h2 class="cat-section__name">${cat.name[lang]}</h2>
                </div>
                <span class="cat-section__count">${cat.dishes.length} ${t.dishes}</span>
            </div>
            <div class="dishes-grid">
                ${cat.dishes.map((dish, i) => renderDishCard(dish, lang, t, i)).join('')}
            </div>
        </section>
    `).join('');

    /* VIP секция */
    html += `
        <section class="cat-section" id="section-vip" data-cat="vip">
            <div class="cat-section__header">
                <div class="cat-section__icon"><i class="bi bi-gem"></i></div>
                <div class="cat-section__titles">
                    <h2 class="cat-section__name">${t.vipTitle}</h2>
                    <p class="cat-section__sub">${t.vipSub}</p>
                </div>
            </div>
            <div class="vip-grid">
                ${VIP_ROOMS.map((room, i) => `
                    <div class="vip-card" style="animation-delay:${i * 0.06}s">
                        <span class="vip-card__crown"><i class="bi bi-gem"></i></span>
                        <div class="vip-card__name">${room.name[lang]}</div>
                        <div class="vip-card__capacity">${room.capacity[lang]}</div>
                        <div class="vip-card__price">
                            ${room.price}<span class="vip-card__price-unit"> ${t.currency} / ${t.vipRental}</span>
                        </div>
                        <p class="vip-card__hint">✦ ${t.vipHint}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    menuSections.innerHTML = html;

    /* Клики по карточкам блюд */
    menuSections.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.dish-card__ctrl')) return;
            const catId  = card.closest('.cat-section').dataset.cat;
            const dishId = card.dataset.dishId;
            const cat    = CATEGORIES.find(c => c.id === catId);
            const dish   = cat?.dishes.find(d => d.id === dishId);
            if (dish && cat) openModal(dish, cat.name[lang]);
        });
    });

    menuSections.querySelectorAll('.dish-card__ctrl').forEach(ctrl => bindCtrlEvents(ctrl));

    /* Запускаем IntersectionObserver */
    initObserver();
}

function renderDishCard(dish, lang, t, index) {
    const isVariant = String(dish.price).includes('/') || String(dish.price).includes('–');
    const priceClass = isVariant ? 'dish-card__price dish-card__price--variant' : 'dish-card__price';

    return `
    <div class="dish-card" data-dish-id="${dish.id}"
         data-search-name="${(dish.name[lang] || '').toLowerCase()}"
         style="animation-delay:${(index * 0.055).toFixed(2)}s"
         role="button" tabindex="0" aria-label="${dish.name[lang]}">
        <div class="dish-card__img-wrap">
            <img class="dish-card__img" src="${dish.image || ''}"
                 alt="${dish.name[lang]}" loading="lazy"
                 onerror="this.style.opacity='0'">
            <div class="dish-card__img-shadow"></div>
        </div>
        <div class="dish-card__body">
            <h3 class="dish-card__name">${dish.name[lang]}</h3>
            ${dish.desc ? `<p class="dish-card__desc">${dish.desc[lang]}</p>` : ''}
            <div class="dish-card__footer">
                <span class="${priceClass}">
                    ${fmtPrice(dish.price)}<span class="dish-card__unit"> ${t.currency}</span>
                </span>
                <div class="dish-card__ctrl" data-dish-id="${dish.id}">
                    ${cardCtrlHtml(dish.id, t)}
                </div>
            </div>
        </div>
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   9. КОРЗИНА
───────────────────────────────────────────────────────── */

function parsePrice(price) {
    if (typeof price === 'number') return price;
    const m = String(price).match(/\d+/);
    return m ? parseInt(m[0]) : 0;
}

function findDish(dishId) {
    for (const cat of CATEGORIES) {
        const dish = cat.dishes.find(d => d.id === dishId);
        if (dish) return { dish, cat };
    }
    return null;
}

function updateCartBadge() {
    const count = state.cart.reduce((s, i) => s + i.qty, 0);
    cartBadgeEl.textContent = count;
    cartBadgeEl.classList.toggle('visible', count > 0);
}

function addToCart(dish) {
    const existing = state.cart.find(i => i.dishId === dish.id);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({ dishId: dish.id, qty: 1 });
    }
    updateCartBadge();
    renderCart();
    updateAllCardControls(dish.id);
    showToast(`«${dish.name[state.lang]}» ${I18N[state.lang].cartAdded}`);
}

function updateCartQty(dishId, delta) {
    const item = state.cart.find(i => i.dishId === dishId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter(i => i.dishId !== dishId);
    updateCartBadge();
    renderCart();
    updateAllCardControls(dishId);
}

function clearCart() {
    const ids = state.cart.map(i => i.dishId);
    state.cart = [];
    updateCartBadge();
    renderCart();
    ids.forEach(id => updateAllCardControls(id));
}

function calcCartTotal() {
    return state.cart.reduce((sum, item) => {
        const found = findDish(item.dishId);
        return found ? sum + parsePrice(found.dish.price) * item.qty : sum;
    }, 0);
}

function renderCart() {
    const lang = state.lang;
    const t = I18N[lang];

    if (state.cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <i class="bi bi-bag"></i>
                <span class="cart-empty__text">${t.cartEmpty}</span>
            </div>`;
        cartTotalEl.textContent = `0 ${t.currency}`;
        return;
    }

    cartBody.innerHTML = state.cart.map(item => {
        const found = findDish(item.dishId);
        if (!found) return '';
        const { dish } = found;
        const lineTotal = parsePrice(dish.price) * item.qty;
        return `
        <div class="cart-item">
            <img class="cart-item__img" src="${dish.image || ''}" alt="${dish.name[lang]}"
                 loading="lazy" onerror="this.style.opacity='0'">
            <div class="cart-item__info">
                <div class="cart-item__name">${dish.name[lang]}</div>
                <div class="cart-item__price">${fmtPrice(lineTotal)} ${t.currency}</div>
            </div>
            <div class="cart-item__controls">
                <button class="cart-qty-btn" data-action="dec" data-id="${dish.id}">−</button>
                <span class="cart-qty-num">${item.qty}</span>
                <button class="cart-qty-btn" data-action="inc" data-id="${dish.id}">+</button>
            </div>
            <button class="cart-item__remove" data-id="${dish.id}" aria-label="Удалить">
                <i class="bi bi-x"></i>
            </button>
        </div>`;
    }).join('');

    cartTotalEl.textContent = `${fmtPrice(calcCartTotal())} ${t.currency}`;

    cartBody.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateCartQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
        });
    });

    cartBody.querySelectorAll('.cart-item__remove').forEach(btn => {
        btn.addEventListener('click', () => {
            state.cart = state.cart.filter(i => i.dishId !== btn.dataset.id);
            updateCartBadge();
            renderCart();
        });
    });
}

/* HTML контрола на карточке (кнопка или счётчик) */
function cardCtrlHtml(dishId, t) {
    const item = state.cart.find(i => i.dishId === dishId);
    if (item && item.qty > 0) {
        return `<div class="card-qty-ctrl">
            <button class="card-qty-btn" data-action="dec" data-id="${dishId}">−</button>
            <span class="card-qty-num">${item.qty}</span>
            <button class="card-qty-btn" data-action="inc" data-id="${dishId}">+</button>
        </div>`;
    }
    return `<button class="dish-card__add-btn" data-dish-id="${dishId}" aria-label="${t.addToCart}">
        <i class="bi bi-bag-plus"></i>
    </button>`;
}

/* Привязка событий к контролу карточки */
function bindCtrlEvents(ctrl) {
    const addBtn = ctrl.querySelector('.dish-card__add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', e => {
            e.stopPropagation();
            const found = findDish(addBtn.dataset.dishId);
            if (found) addToCart(found.dish);
        });
    }
    ctrl.querySelectorAll('.card-qty-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            updateCartQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
        });
    });
}

/* Обновить контролы на всех карточках + модал для конкретного блюда */
function updateAllCardControls(dishId) {
    const t = I18N[state.lang];
    document.querySelectorAll(`.dish-card__ctrl[data-dish-id="${dishId}"]`).forEach(ctrl => {
        ctrl.innerHTML = cardCtrlHtml(dishId, t);
        bindCtrlEvents(ctrl);
    });
    if (state.modalDish?.id === dishId) renderModalControl();
}

/* Контрол в модале (кнопка или счётчик) */
function renderModalControl() {
    const dish = state.modalDish;
    if (!dish) return;
    const t = I18N[state.lang];
    const item = state.cart.find(i => i.dishId === dish.id);
    const row = document.getElementById('modal-cart-row');
    if (!row) return;

    if (item && item.qty > 0) {
        row.innerHTML = `
            <div class="modal-qty-ctrl">
                <button class="modal-qty-btn" data-action="dec" data-id="${dish.id}">−</button>
                <span class="modal-qty-num">${item.qty}</span>
                <button class="modal-qty-btn" data-action="inc" data-id="${dish.id}">+</button>
            </div>`;
        row.querySelector('[data-action="dec"]').addEventListener('click', () => updateCartQty(dish.id, -1));
        row.querySelector('[data-action="inc"]').addEventListener('click', () => updateCartQty(dish.id, 1));
    } else {
        row.innerHTML = `
            <button class="modal-add-btn">
                <i class="bi bi-bag-plus"></i>
                <span>${t.addToCart}</span>
            </button>`;
        row.querySelector('.modal-add-btn').addEventListener('click', () => addToCart(dish));
    }
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
    renderCart();
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
}

/* ─────────────────────────────────────────────────────────
   10. ПОИСК
───────────────────────────────────────────────────────── */
function handleSearch(query) {
    const q = query.trim().toLowerCase();
    const chefsSection = document.getElementById('chefs-section');

    if (!q) {
        /* Сброс — показать всё */
        chefsSection.style.display = '';
        document.querySelectorAll('.cat-section').forEach(sec => {
            sec.style.display = '';
            sec.querySelectorAll('.dish-card, .vip-card').forEach(c => c.style.display = '');
        });
        return;
    }

    /* Скрываем Chef's Choice во время поиска */
    chefsSection.style.display = 'none';

    document.querySelectorAll('.cat-section').forEach(sec => {
        const cards = sec.querySelectorAll('.dish-card');
        let visible = 0;

        cards.forEach(card => {
            const name = card.dataset.searchName || '';
            const match = name.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        sec.style.display = visible > 0 ? '' : 'none';
    });
}

/* ─────────────────────────────────────────────────────────
   10. МОДАЛ
───────────────────────────────────────────────────────── */
function openModal(dish, catName) {
    state.modalDish = dish;
    const lang = state.lang;
    const t    = I18N[lang];

    modalImg.src = dish.image || '';
    modalImg.alt = dish.name[lang];
    modalCat.textContent  = catName;
    modalName.textContent = dish.name[lang];
    modalPrice.textContent = fmtPrice(dish.price);

    /* Описание */
    if (dish.desc?.[lang]) {
        modalDescText.textContent = dish.desc[lang];
        modalDescBlock.style.display = '';
    } else {
        modalDescBlock.style.display = 'none';
    }

    /* Состав */
    if (dish.ingr) {
        const parts = dish.ingr.split(',').map(s => s.trim()).filter(Boolean);
        modalIngrList.innerHTML = parts
            .map(p => `<li>${p.charAt(0).toUpperCase() + p.slice(1)}</li>`)
            .join('');
        modalIngrBlock.style.display = '';
    } else {
        modalIngrBlock.style.display = 'none';
    }

    renderModalControl();

    modalOverlay.classList.add('open');
    document.body.classList.add('modal-open');
    document.getElementById('modal-close').focus();
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.classList.remove('modal-open');
}

/* ─────────────────────────────────────────────────────────
   11. TOAST уведомление
───────────────────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
    toastText.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ─────────────────────────────────────────────────────────
   12. SIDEBAR (мобильный)
───────────────────────────────────────────────────────── */
function openSidebar() {
    sidebarEl.classList.add('open');
    sidebarOverlay.classList.add('active');
    state.sidebarOpen = true;
}

function closeSidebar() {
    sidebarEl.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    state.sidebarOpen = false;
}

/* ─────────────────────────────────────────────────────────
   13. СКРОЛЛ к секции
───────────────────────────────────────────────────────── */
function scrollToSection(catId) {
    const target = document.getElementById(`section-${catId}`);
    if (!target) return;
    const content = document.getElementById('content');
    const offset  = target.offsetTop - 16;
    content.scrollTo({ top: offset, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────────────────
   14. ACTIVE SIDEBAR — IntersectionObserver
───────────────────────────────────────────────────────── */
function initObserver() {
    const content = document.getElementById('content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.dataset.cat;
                sidebarNav.querySelectorAll('.sidebar-item').forEach(item => {
                    item.classList.toggle('active', item.dataset.target === catId);
                });
            }
        });
    }, {
        root: content,
        threshold: 0.25,
        rootMargin: '-10% 0px -65% 0px'
    });

    document.querySelectorAll('.cat-section').forEach(sec => observer.observe(sec));
}

/* ─────────────────────────────────────────────────────────
   15. ПЕРЕХОД Splash → App
───────────────────────────────────────────────────────── */
function enterApp() {
    splash.classList.add('hiding');
    setTimeout(() => { splash.style.display = 'none'; }, 520);
    app.removeAttribute('aria-hidden');
    app.classList.add('visible');
}

/* ─────────────────────────────────────────────────────────
   16. ХЕЛПЕРЫ
───────────────────────────────────────────────────────── */
function fmtPrice(price) {
    if (typeof price === 'number') return price.toLocaleString('ru-RU');
    return String(price);
}

/* ─────────────────────────────────────────────────────────
   17. EVENT LISTENERS
───────────────────────────────────────────────────────── */

/* Splash → App */
document.getElementById('btn-enter').addEventListener('click', enterApp);

/* Язык */
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* Hamburger */
document.getElementById('hamburger').addEventListener('click', () => {
    state.sidebarOpen ? closeSidebar() : openSidebar();
});

/* Sidebar overlay */
sidebarOverlay.addEventListener('click', closeSidebar);

/* Поиск — раскрытие поля */
document.getElementById('search-toggle').addEventListener('click', () => {
    searchInput.classList.toggle('expanded');
    if (searchInput.classList.contains('expanded')) searchInput.focus();
    else { searchInput.value = ''; handleSearch(''); }
});

searchInput.addEventListener('input', e => handleSearch(e.target.value));

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { searchInput.value = ''; handleSearch(''); searchInput.blur(); searchInput.classList.remove('expanded'); }
});

/* Вызов официанта */
document.getElementById('btn-waiter').addEventListener('click', () => {
    showToast(I18N[state.lang].waiterToast);
});

/* Корзина — открытие */
document.getElementById('btn-cart').addEventListener('click', openCart);

/* Корзина — закрытие */
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* Корзина — оформить заказ */
document.getElementById('cart-order-btn').addEventListener('click', () => {
    if (state.cart.length === 0) return;
    showToast(I18N[state.lang].orderToast);
    closeCart();
});

/* Корзина — очистить */
document.getElementById('cart-clear-btn').addEventListener('click', clearCart);

/* Модал — закрытие */
document.getElementById('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (modalOverlay.classList.contains('open')) closeModal();
        else if (cartDrawer.classList.contains('open')) closeCart();
    }
});

/* ─────────────────────────────────────────────────────────
   18. INIT
───────────────────────────────────────────────────────── */
function init() {
    applyLang('ru'); /* Устанавливает язык + рендерит всё */
}

init();
