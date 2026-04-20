export interface ResultPart {
  text: string
  color?: 'red' | 'green'
}

export interface ProblemSolution {
  problem: string
  solution: string
}

export interface RichSection {
  type: 'intro' | 'task' | 'what-i-did' | 'process' | 'problems'
  heading?: string
  body?: string
  items?: string[]
  richItems?: ResultPart[][]
  images?: string[]
  imagesNda?: boolean
  imageMaxHeight?: number
  noBorder?: boolean
  problems?: ProblemSolution[]
}

export interface Project {
  slug: string
  number: string
  title: string
  subtitle: string
  tasks: string
  result: string
  resultParts?: ResultPart[]
  tags: string[]
  role: string
  company: string
  year: string
  image?: string
  imageFit?: 'cover' | 'contain'
  hasVisual?: boolean
  richContent?: RichSection[]
}

export const projects: { ru: Project[]; en: Project[] } = {
  ru: [
    {
      slug: 'supplier-portal',
      number: '01',
      title: 'Портал поставщика',
      subtitle: 'Платформа для поставщиков продуктов в магазины X5 Group',
      tasks: 'Спроектировал и внедрил OCR распознавание этикеток продуктов',
      result: '',
      resultParts: [
        { text: 'Сокращение времени создания карточки товара с ' },
        { text: '6–8 часов', color: 'red' },
        { text: ' до ' },
        { text: '30–40 минут', color: 'green' },
      ],
      tags: ['Исследование', 'UX тесты', 'UI Design'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      image: '/work/supplier-portal/cover.png',
      imageFit: 'contain',
      richContent: [
        {
          type: 'task',
          heading: 'Задача',
          body: 'Сократить и упростить процесс заведения нового товара в систему. Заведение одного товара занимало 6–8 часов ручного ввода данных — поставщики вручную переносили информацию с этикеток в десятки полей карточки.',
        },
        {
          type: 'process',
          heading: 'Текущий процесс',
          body: 'Поставщик вручную заполнял десятки полей карточки товара — от состава и пищевой ценности до условий хранения и информации об упаковке.',
          images: ['/work/supplier-portal/card-current.png'],
          imagesNda: false,
          imageMaxHeight: 480,
        },
        {
          type: 'process',
          noBorder: true,
          heading: 'Процесс работы',
          body: 'Спроектировал интерфейс для работы с функционалом оптического распознавания этикеток (OCR). Новый флоу позволяет загрузить фото этикетки и автоматически заполнить поля карточки товара — поставщику остаётся только проверить и дополнить данные.\n\nПосле сборки прототипа провёл юзабилити-тестирование с 15 пользователями: проверял понятность интерфейса и скорость прохождения сценария добавления товара.',
        },
        {
          type: 'process',
          noBorder: true,
          body: 'Новый интерфейс загрузки фото этикеток',
          images: ['/work/supplier-portal/ocr-interface.png'],
          imagesNda: false,
          imageMaxHeight: 600,
        },
        {
          type: 'what-i-did',
          heading: 'Результат',
          richItems: [
            [
              { text: 'Время заведения одного товара сократилось с ' },
              { text: '6–8 часов', color: 'red' },
              { text: ' до ' },
              { text: '30–40 минут', color: 'green' },
            ],
            [
              { text: 'Все 15 участников тестирования прошли сценарий ' },
              { text: 'без критических ошибок и остановок', color: 'green' },
            ],
            [
              { text: 'Функционал прошёл тестирование и ' },
              { text: 'запущен в продакшн', color: 'green' },
            ],
          ],
        },
      ],
    },
    {
      slug: 'commercial-proposal',
      number: '02',
      title: 'Подача коммерческого предложения',
      subtitle: 'Платформа для поставщиков продуктов в магазины X5 Group',
      tasks: 'Редизайн процесса подачи коммерческого предложения',
      result: '',
      resultParts: [
        { text: 'Уменьшили время создания КП с ' },
        { text: '1 дня', color: 'red' },
        { text: ' до ' },
        { text: '2 часов', color: 'green' },
        { text: '. Уменьшили обращения в поддержку на ' },
        { text: '30%', color: 'green' },
        { text: '.' },
      ],
      tags: ['Исследование', 'CJM', 'Product Evolution Canvas'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      hasVisual: true,
      richContent: [
        {
          type: 'task',
          heading: 'Задача',
          body: 'Сократить время подачи коммерческого предложения. Снизить количество обращений в поддержку. Добавить новый этап в процесс подачи КП.',
        },
        {
          type: 'process',
          heading: 'Процесс работы',
          body: 'Собрана аналитика по обращениям в поддержку — выявлены основные точки боли и частые ошибки пользователей.\n\nСобрана статистика из Matomo о поведении пользователей и времени подачи КП. Данные позволили определить узкие места в существующем флоу.\n\nПереработан дизайн процесса подачи КП. Процесс разбит на 3 последовательных шага для снижения когнитивной нагрузки. Создан прототип с помощью Figma Make для тестирования на пользователях.',
          images: [
            '/work/commercial-proposal/step-1.png',
            '/work/commercial-proposal/step-2.png',
            '/work/commercial-proposal/step-3.png',
            '/work/commercial-proposal/step-4.png',
          ],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'Перед проведением тестов с пользователями были подготовлены гипотезы.',
          images: ['/work/commercial-proposal/hypotheses.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'После проведённых интервью результаты были собраны в таблицу с основными полученными инсайтами. Были отмечены подтверждённые и не подтверждённые гипотезы.',
          images: ['/work/commercial-proposal/results-table.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'Составлена CJM.',
          images: ['/work/commercial-proposal/cjm.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'Результаты были представлены Project Owner для предложений по улучшению.',
          images: ['/work/commercial-proposal/pec.jpg'],
          imagesNda: false,
        },
        {
          type: 'what-i-did',
          heading: 'Результат',
          richItems: [
            [
              { text: 'Время подачи и подготовки КП уменьшилось с ' },
              { text: '1 дня', color: 'red' },
              { text: ' до ' },
              { text: '2 часов', color: 'green' },
            ],
            [
              { text: 'Количество обращений в поддержку уменьшилось на ' },
              { text: '30%', color: 'green' },
            ],
          ],
        },
      ],
    },
    {
      slug: 'unification',
      number: '03',
      title: 'Унификация продуктов',
      subtitle: 'Стандартизация UI и паттернов в 14 продуктах',
      tasks: 'Провёл аудит продуктов, собрал боли пользователей и дизайнеров',
      result: 'Бесшовный пользовательский опыт работы в нескольких продуктах',
      tags: ['Исследование', 'Приоритизация', 'Дизайн система'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      hasVisual: true,
      richContent: [
        {
          type: 'task',
          heading: 'Задача',
          body: 'Провести анализ 14 продуктов, которыми пользуются поставщики. Выявить расхождения в паттернах и отработке UI-элементов.\n\nЦель — сделать опыт использования продуктов бесшовным: пользователь должен понимать, что произойдёт при том или ином действии. При этом важно провести изменения максимально безболезненно.',
        },
        {
          type: 'process',
          heading: 'Процесс работы',
          body: 'Проведён анализ всех 14 продуктов. Составлен документ с различиями в отработке UI-элементов и паттернах взаимодействия.\n\nСформирован бэклог задач на проработку, который был распределён среди дизайнеров команды. Еженедельно проводились синки для обсуждения решений и подготовки финальных компонентов.\n\nНалажена коммуникация между дизайнерами и разработчиками для оценки сложности, времени и стоимости реализации новых компонентов.\n\nПоддержание компонентной базы на основе приходящей обратной связи от команд.',
          images: ['/work/unification/process-1.png', '/work/unification/process-2.png'],
        },
        {
          type: 'what-i-did',
          heading: 'Результат',
          items: [
            'Разработано и внедрено на всех продуктах единое боковое меню с единой логикой работы',
            'Разработана универсальная шапка для каждого продукта, закрывающая потребности всех команд',
          ],
        },
      ],
    },
    {
      slug: 'opora',
      number: '04',
      title: 'ОПОРА',
      subtitle: 'Система для планирования, управления и отслеживания производства и логистики нефтепродуктов',
      tasks: 'Спроектировал гибкий инструмент работы и визуализации данных о распределении нефтепродуктов по всей цепочке поставки',
      result: 'Гео-сервис для отслеживания маршрутов и выполнения плана по отгрузке нефтепродуктов',
      tags: ['Дизайн', 'Презентация', 'Защита решений'],
      role: 'Product Designer',
      company: 'Газпром-нефть',
      year: '2023–2024',
      image: '/work/opora/cover.png',
      richContent: [
        {
          type: 'task',
          heading: 'Задача',
          body: 'Спроектировать гибкий инструмент для работы и визуализации данных о распределении нефтепродуктов по всей цепочке поставки. В системе должны работать 7 подразделений с разными целевыми процессами.',
        },
        {
          type: 'what-i-did',
          heading: 'Что сделал',
          items: [
            'Спроектировал 5 концепций визуализации для обсуждения с бизнесом и стейкхолдерами',
            'Презентовал концепции с выделением плюсов и минусов каждого варианта',
            'Провёл интервью с пользователями каждого подразделения и погрузился в контекст их работы',
            'Итерационно проводил встречи с product owner и руководителями разных подразделений для презентации согласованной концепции с целью уточнений и показов процесса реализации',
            'Взаимодействовал с командой разработки для уточнения нюансов разработки и взаимодействия с картой',
          ],
        },
        {
          type: 'process',
          heading: 'Процесс работы',
          body: 'Так как визуализация затрагивала несколько подразделений со своими процессами, я подготовил вопросы для интервью, погрузился в процессы пользователей и составил схему взаимосвязей рабочих систем. Декомпозировал задачу на более мелкие. Выявил пересечения в функционале и показателях между подразделениями.\n\nПрезентовал 5 концепций — выбор остановился на использовании карт с геосервисами как наиболее подходящем и удобном инструменте для работы с объектами на всём пути от производства до отгрузки.',
          images: ['/work/opora/process-1.jpg', '/work/opora/process-2.jpg'],
        },
        {
          type: 'problems',
          heading: 'Проблемы и решения',
          images: ['/work/opora/result-1.png', '/work/opora/result-2.png'],
          imagesNda: false,
          problems: [
            {
              problem: 'Необходим гибкий, масштабируемый и наглядный инструмент для работы с объектами цепочки поставки. Визуализация должна быть понятна даже человеку, не погружённому в контекст.',
              solution: 'Разработана карта с поддержкой геосервисов для точного расположения объектов, просмотра отгрузочных маршрутов, взаимодействия с объектами и просмотра процесса выполнения бизнес-плана. Цветовая индикация слоёв позволяет сразу обратить внимание на области с отклонениями от плана.',
            },
            {
              problem: 'Слишком большой объём на этап MVP, сжатые сроки и большое количество бизнес-пользователей со своими рабочими процессами.',
              solution: 'В короткие сроки погрузился в процессы пользователей, провёл исследование и декомпозировал задачи. Объединил общие показатели в единый flow для оперативного обсуждения макетов. Прототипировал взаимодействия с объектами и проводил итерационные встречи с каждым подразделением для согласования функционала.',
            },
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: 'supplier-portal',
      number: '01',
      title: 'Supplier Portal',
      subtitle: 'Platform for product suppliers to X5 Group stores',
      tasks: 'Designed and implemented OCR-based product label recognition',
      result: '',
      resultParts: [
        { text: 'Reduced product card creation time from ' },
        { text: '6–8 hours', color: 'red' },
        { text: ' to ' },
        { text: '30–40 minutes', color: 'green' },
      ],
      tags: ['Research', 'UX Testing', 'UI Design'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      image: '/work/supplier-portal/cover.png',
      imageFit: 'contain',
      richContent: [
        {
          type: 'task',
          heading: 'Challenge',
          body: 'Simplify and speed up the process of adding a new product to the system. Registering a single product took 6–8 hours of manual data entry — suppliers had to copy information from labels into dozens of form fields by hand.',
        },
        {
          type: 'process',
          heading: 'Current Process',
          body: 'Suppliers manually filled in dozens of product card fields — from ingredients and nutritional information to storage conditions and packaging details.',
          images: ['/work/supplier-portal/card-current.png'],
          imagesNda: false,
          imageMaxHeight: 480,
        },
        {
          type: 'process',
          noBorder: true,
          heading: 'Process',
          body: 'Designed an interface for OCR-based label recognition. The new flow lets suppliers upload a photo of a product label and have the card fields filled in automatically — they only need to review and complete the data.\n\nAfter building the prototype, I ran usability testing with 15 users: evaluating interface clarity and the speed at which participants completed the product registration scenario.',
        },
        {
          type: 'process',
          noBorder: true,
          body: 'New interface for uploading product label photos',
          images: ['/work/supplier-portal/ocr-interface.png'],
          imagesNda: false,
          imageMaxHeight: 600,
        },
        {
          type: 'what-i-did',
          heading: 'Results',
          richItems: [
            [
              { text: 'Product registration time reduced from ' },
              { text: '6–8 hours', color: 'red' },
              { text: ' to ' },
              { text: '30–40 minutes', color: 'green' },
            ],
            [
              { text: 'All 15 test participants completed the scenario ' },
              { text: 'without critical errors or drop-offs', color: 'green' },
            ],
            [
              { text: 'The feature passed testing and ' },
              { text: 'shipped to production', color: 'green' },
            ],
          ],
        },
      ],
    },
    {
      slug: 'commercial-proposal',
      number: '02',
      title: 'Commercial Proposal Submission',
      subtitle: 'Platform for product suppliers to X5 Group stores',
      tasks: 'Redesigned the commercial proposal submission process',
      result: '',
      resultParts: [
        { text: 'Reduced proposal creation time from ' },
        { text: '1 day', color: 'red' },
        { text: ' to ' },
        { text: '2 hours', color: 'green' },
        { text: '. Reduced support requests by ' },
        { text: '30%', color: 'green' },
        { text: '.' },
      ],
      tags: ['Research', 'CJM', 'Product Evolution Canvas'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      hasVisual: true,
      richContent: [
        {
          type: 'task',
          heading: 'Challenge',
          body: 'Reduce the time needed to submit a commercial proposal. Lower the volume of support requests. Introduce an additional step into the proposal submission flow.',
        },
        {
          type: 'process',
          heading: 'Process',
          body: 'Gathered analytics on support requests to identify the main pain points and common user errors.\n\nCollected Matomo data on user behaviour and submission time to pinpoint bottlenecks in the existing flow.\n\nRedesigned the proposal submission process and split it into 3 sequential steps to reduce cognitive load. Built an interactive prototype using Figma Make for usability testing with real users.',
          images: [
            '/work/commercial-proposal/step-1.png',
            '/work/commercial-proposal/step-2.png',
            '/work/commercial-proposal/step-3.png',
            '/work/commercial-proposal/step-4.png',
          ],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'Before user testing, a set of hypotheses was prepared.',
          images: ['/work/commercial-proposal/hypotheses.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'After the interviews, findings were compiled into a table with key insights. Confirmed and unconfirmed hypotheses were marked.',
          images: ['/work/commercial-proposal/results-table.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'A CJM was created based on the research findings.',
          images: ['/work/commercial-proposal/cjm.jpg'],
          imagesNda: false,
        },
        {
          type: 'process',
          noBorder: true,
          body: 'The results were presented to the Project Owner to inform improvement proposals.',
          images: ['/work/commercial-proposal/pec.jpg'],
          imagesNda: false,
        },
        {
          type: 'what-i-did',
          heading: 'Result',
          richItems: [
            [
              { text: 'Proposal preparation and submission time reduced from ' },
              { text: '1 day', color: 'red' },
              { text: ' to ' },
              { text: '2 hours', color: 'green' },
            ],
            [
              { text: 'Support requests decreased by ' },
              { text: '30%', color: 'green' },
            ],
          ],
        },
      ],
    },
    {
      slug: 'unification',
      number: '03',
      title: 'Product Unification',
      subtitle: 'Standardisation of UI and patterns across 14 products',
      tasks: 'Conducted a product audit, collected pain points from users and designers',
      result: 'Seamless user experience across multiple products',
      tags: ['Research', 'Prioritization', 'Design System'],
      role: 'Product Designer',
      company: 'X5 Group',
      year: '2024–2025',
      hasVisual: true,
      richContent: [
        {
          type: 'task',
          heading: 'Challenge',
          body: 'Audit 14 products used by suppliers and identify inconsistencies in UI patterns and interaction behaviours.\n\nThe goal was to create a seamless experience across all products — users should be able to predict what will happen with any given action. Equally important: roll out the changes with minimal disruption to existing users.',
        },
        {
          type: 'process',
          heading: 'Process',
          body: 'Conducted a full audit of all 14 products and documented differences in UI element behaviour and interaction patterns.\n\nBuilt a backlog of items to address and distributed tasks across the design team. Weekly syncs were held to align on solutions and prepare final components for the design system.\n\nEstablished clear communication between designers and developers to assess the complexity, time, and cost of implementing new components.\n\nOngoing maintenance of the component library based on feedback received from product teams.',
          images: ['/work/unification/process-1.png', '/work/unification/process-2.png'],
        },
        {
          type: 'what-i-did',
          heading: 'Results',
          items: [
            'Designed and rolled out a unified sidebar navigation across all products with consistent interaction logic',
            'Built a universal header covering the needs of all product teams, adopted across every product',
          ],
        },
      ],
    },
    {
      slug: 'opora',
      number: '04',
      title: 'OPORA',
      subtitle: 'System for planning, managing and tracking petroleum product production and logistics',
      tasks: 'Designed a flexible tool for working with and visualising data on petroleum product distribution across the entire supply chain',
      result: 'A geo-service for tracking routes and monitoring the petroleum product shipment plan',
      tags: ['Design', 'Presentation', 'Solution Defence'],
      role: 'Product Designer',
      company: 'Gazprom-neft',
      year: '2023–2024',
      image: '/work/opora/cover.png',
      richContent: [
        {
          type: 'task',
          heading: 'Challenge',
          body: 'Design a flexible tool for working with and visualising data on petroleum product distribution across the entire supply chain — to be used by 7 departments with distinct workflows and goals.',
        },
        {
          type: 'what-i-did',
          heading: 'What I did',
          items: [
            'Designed 5 visualisation concepts for discussion with business stakeholders',
            'Presented each concept with a clear breakdown of pros and cons',
            'Conducted user interviews across all 7 departments to understand their working context',
            'Ran iterative sessions with the product owner and department leads to refine and align on the chosen concept',
            'Collaborated with the development team to clarify implementation nuances and map interaction logic',
          ],
        },
        {
          type: 'process',
          heading: 'Process',
          body: 'Because the visualisation touched multiple departments with distinct processes, I prepared interview guides, immersed myself in each team\'s workflows, and mapped the connections between working systems. I decomposed the task into smaller parts and identified overlapping metrics and functionality across departments.\n\nAfter presenting 5 concepts, the team aligned on a geo-service map as the most suitable and intuitive tool for tracking assets along the entire supply chain — from production to shipment.',
          images: ['/work/opora/process-1.jpg', '/work/opora/process-2.jpg'],
        },
        {
          type: 'problems',
          heading: 'Challenges & solutions',
          images: ['/work/opora/result-1.png', '/work/opora/result-2.png'],
          imagesNda: false,
          problems: [
            {
              problem: 'Needed a flexible, scalable, and intuitive tool for working with supply chain objects — clear even to someone unfamiliar with the domain.',
              solution: 'Built a map with integrated geo-services for precise asset positioning, route viewing, object interaction, and business plan progress tracking. Colour-coded map layers instantly highlight areas deviating from the plan.',
            },
            {
              problem: 'Oversized MVP scope, tight deadlines, and a large number of business users each with their own workflows.',
              solution: 'Quickly immersed in user processes, ran research, and decomposed tasks. Unified shared metrics into a single flow to speed up mockup reviews. Prototyped interactions and ran iterative sessions with each department to align on functionality and visual direction.',
            },
          ],
        },
      ],
    },
  ],
}
