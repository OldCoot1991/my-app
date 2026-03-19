# Руководство по дизайну и стилю для мобильного приложения (RetroBoard)

Это руководство описывает дизайн-систему на основе существующего сайта, адаптированную для мобильного приложения на React Native (Expo) с использованием стандартных стилей (`StyleSheet`).

## 1. Цветовая палитра

Мы используем современную темную и светлую темы. Ниже приведены точные HEX-коды цветов.

### Основные цвета
| Элемент | Светлая тема (Light) | Темная тема (Dark) |
| :--- | :--- | :--- |
| Фон (Background) | `#FAFAFA` | `#09090B` |
| Текст основной | `#18181B` | `#FAFAFA` |
| Текст вторичный | `#52525B` | `#A1A1AA` |
| Акцент (Emerald) | `#10B981` | `#10B981` |
| Границы/Линии | `#E4E4E7` | `#27272A` |

### Дополнительно
- **Градиенты**: Для заголовков на темном фоне используйте переход от `#E4E4E7` к `#71717A`.
- **Прозрачность**: Для верхней навигации используйте `rgba(255, 255, 255, 0.8)` (светлая) или `rgba(9, 9, 11, 0.8)` (темная).

## 2. Типографика

Для обеспечения идентичности с сайтом мы будем использовать аналогичные шрифты:

- **Основной шрифт (Sans)**: `Inter` — для основного текста, подписей и кнопок.
- **Заголовочный шрифт (Display)**: `Space Grotesk` — для крупных заголовков.

### Параметры текста (React Native):
- **H1 (Hero)**: `fontSize: 36`, `fontFamily: 'SpaceGrotesk-Bold'`, `letterSpacing: -1`.
- **H2 (Section Header)**: `fontSize: 24`, `fontFamily: 'SpaceGrotesk-SemiBold'`.
- **Body**: `fontSize: 16`, `fontFamily: 'Inter-Regular'`.
- **Small/Caption**: `fontSize: 12`, `fontFamily: 'Inter-Medium'`.

## 3. Компоненты интерфейса

### Кнопки (Buttons)
- **Скругление (Border Radius)**: `8` для стандартных кнопок, `25` (или `height / 2`) для формы "Pill".
- **Размеры**:
  - `Default`: `height: 48`.
  - `Large`: `height: 56`.
- **Стили**:
  - `Primary`: Фон `#18181B` (светлая тема) / `#FAFAFA` (темная тема).
  - `Outline`: `borderWidth: 1`, `borderColor: '#3F3F46'`.
  - `Accent`: Фон `#10B981`, текст `#09090B`.

### Карточки товаров (Cards)
- `borderRadius: 12`.
- `backgroundColor`: `#FFFFFF` (светлая) / `#18181B` (темная).
- `borderWidth: 1`, `borderColor: '#E4E4E7'` (в светлой теме).

### Навигация
- **StatusBar**: Подстраивать под тему (`light-content` или `dark-content`).
- **Tab Bar**: Иконки размером `24px`. Активный цвет — основной текст или акцент (`#10B981`).

## 4. Иконки и медиа

- **Иконки**: Использовать библиотеку `@expo/vector-icons` (набор `Lucide` или `MaterialCommunityIcons`).
- **Анимации**: Использовать `LayoutAnimation` или `react-native-reanimated`. Плавное появление (opacity) и перемещение по оси Y (20px).

---
> [!IMPORTANT]
> В React Native стили не наследуются как в вебе. Каждый текстовый элемент должен иметь явно заданный стиль.

---

## 5. Библиотеки проекта

Все библиотеки установлены командой:
```bash
npx expo install @tanstack/react-query axios expo-secure-store zustand
```

---

### 🔄 TanStack Query (`@tanstack/react-query`)
**Отвечает за:** Загрузку, кеширование и синхронизацию данных с сервера.

Используется для:
- Списка товаров (`/api/v1/products`)
- Детальной страницы товара (`/api/v1/products/:id`)
- Заказов пользователя (`/api/v1/orders`)
- Профиля (`/api/v1/me`)

**Почему:** Автоматически управляет состояниями `isLoading / isError / data`, кеширует ответы, перезапрашивает при возврате на экран. Убирает необходимость писать `useEffect` + `useState` для каждого запроса.

```ts
// Пример использования
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

function ProductList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then(r => r.data),
  });
}
```

---

### 🌐 Axios (`axios`)
**Отвечает за:** HTTP-запросы к серверу с автоматической подстановкой Bearer-токена.

Используется для:
- Всех API-запросов (`GET`, `POST`, `PUT`, `DELETE`)
- Автоматического добавления заголовка `Authorization: Bearer <token>`
- Перехвата ошибок `401` (истёк токен → разлогинить)

**Конфигурируется один раз в `lib/api.ts`, используется везде:**

```ts
// lib/api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "https://api.yourstore.com/api/v1",
  timeout: 10000,
});

// Автоподстановка токена
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Перехват ошибки 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("access_token");
      // перейти на экран логина
    }
    return Promise.reject(error);
  }
);
```

---

### 🔐 expo-secure-store
**Отвечает за:** Безопасное хранение токенов авторизации на устройстве.

Используется для хранения:
- `access_token` — JWT токен
- `refresh_token` — токен для обновления сессии

**Почему:** Шифрует данные через iOS Keychain и Android Keystore. Нельзя использовать обычный `AsyncStorage` для токенов — это небезопасно.

```ts
import * as SecureStore from "expo-secure-store";

// Сохранить токен после логина
await SecureStore.setItemAsync("access_token", token);

// Прочитать токен
const token = await SecureStore.getItemAsync("access_token");

// Удалить при выходе
await SecureStore.deleteItemAsync("access_token");
```

---

### 🗃️ Zustand (`zustand`)
**Отвечает за:** Клиентское состояние приложения, не связанное с сервером.

Используется для:
- **Корзины** — список товаров, количество, итоговая сумма
- **UI-состояния** — открыта ли боковая панель, выбранные фильтры
- **Данных авторизации** — `isAuthenticated`, `userId` в памяти

> [!NOTE]
> Данные с сервера (товары, заказы) **не хранить в Zustand** — для этого TanStack Query. Zustand только для того, что пользователь делает локально (корзина, фильтры).

```ts
// store/cartStore.ts
import { create } from "zustand";

interface CartItem { id: string; qty: number; price: number; }

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return { items: state.items.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
```

---

## 6. Архитектура потока данных

```
Сервер (REST API)
      │
      ▼
   Axios ── Bearer Token ◄── expo-secure-store
      │
      ▼
TanStack Query  ← кеш, статусы загрузки, авторефреш
      │
      ▼
   Экраны (Screens)
      │
      ├── Данные с сервера  → useQuery / useMutation
      └── Локальные данные  → useCartStore (Zustand)
```

> [!IMPORTANT]
> Никогда не обращаться к API напрямую из компонентов. Всегда через `lib/api.ts` + TanStack Query хуки.
