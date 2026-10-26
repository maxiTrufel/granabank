# GranaBank

Web app de home banking para socios del club: login, resumen de tarjetas, últimos movimientos, listado con búsqueda y filtros, y detalle de cada movimiento. Implementada a partir del diseño de Figma del challenge.

**Demo:** _(link de Vercel)_

Usuario de prueba:

```
Email:      soygranate@clublanus.com
Contraseña: GRANATE1@
```

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **API Routes** de Next.js como backend
- **PostgreSQL** + **Prisma 7** como ORM
- **Tailwind CSS 4** para estilos
- **Zod** para validaciones (compartidas entre cliente y servidor)
- **jose** + **bcryptjs** para la sesión y el hash de contraseñas

## Cómo correrlo

Requisitos: Node 20+, npm y Docker (o cualquier Postgres accesible).

```bash
# 1. Dependencias (el postinstall genera el cliente de Prisma)
npm install

# 2. Variables de entorno
cp .env.example .env
# completar SESSION_SECRET con un string random, por ejemplo: openssl rand -hex 32

# 3. Base de datos local (Postgres en el puerto 5433)
npm run db:up

# 4. Migraciones y datos de prueba
npm run db:migrate
npm run db:seed

# 5. Levantar la app
npm run dev
```

La app queda en http://localhost:3000.

### Scripts

| Script               | Qué hace                                         |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Servidor de desarrollo                           |
| `npm run build`      | Genera el cliente de Prisma y hace el build      |
| `npm run lint`       | ESLint                                           |
| `npm run typecheck`  | Chequeo de tipos con `tsc`                       |
| `npm run db:up`      | Levanta Postgres con Docker Compose              |
| `npm run db:migrate` | Crea/aplica migraciones en desarrollo            |
| `npm run db:deploy`  | Aplica las migraciones existentes (producción)   |
| `npm run db:seed`    | Carga el usuario de prueba, tarjetas y movimientos |

### Deploy

La app se deploya en Vercel con una base Postgres administrada (por ejemplo, Neon). Pasos:

1. Crear la base y copiar el connection string.
2. En Vercel, configurar `DATABASE_URL` y `SESSION_SECRET`.
3. Correr una vez, apuntando a esa base: `npm run db:deploy && npm run db:seed`.

## Estructura

```
prisma/
  schema.prisma          modelos User, Card y Transaction
  migrations/
  seed.ts                datos de prueba (idempotente)
src/
  app/
    login/               pantalla de login
    (app)/               pantallas privadas, comparten la barra de navegación
      home/
      movimientos/
      movimientos/[id]/  detalle de un movimiento
    api/
      auth/login, auth/logout
      me/                perfil + tarjetas
      transactions/      listado con filtros (q, type, limit)
      transactions/[id]/ detalle
  components/
    auth/ cards/ layout/ transactions/ ui/
    views/               la lógica de cada pantalla (client components)
  hooks/                 useApi, useDebouncedValue
  lib/                   prisma, sesión, validaciones, formatos, tipos
  proxy.ts               protege las rutas privadas
```

## Decisiones técnicas

**API Routes en lugar de un backend aparte.** Para el alcance del challenge un servidor separado sumaba deploy y configuración sin aportar nada. Las API routes dejan una API REST clara (`/api/transactions?q=&type=`) que el frontend consume con `fetch`, y si mañana hiciera falta separarla, la lógica ya está aislada en `src/app/api` y `src/lib`.

**Las pantallas consumen la API desde el cliente.** Podría haber leído la base directo desde Server Components, pero el challenge pide consumir información y manejar loading, error y vacío. Haciéndolo desde el cliente esos estados quedan explícitos y se pueden ver. El hook `useApi` maneja los tres estados, el reintento y cancela requests viejos con `AbortController` (por ejemplo, si cambian los filtros antes de que llegue la respuesta).

**Filtros en la URL.** La búsqueda y el filtro rápido viven en los query params (`/movimientos?q=juan&tipo=CASH_IN`). Así sobreviven a un refresh, se pueden compartir y, al volver del detalle de un movimiento, la lista queda como estaba. La búsqueda tiene un debounce de 300 ms para no pegarle a la API en cada tecla.

**Búsqueda y filtros en la base, no en memoria.** El filtrado se hace en Postgres (`contains` sin distinguir mayúsculas y filtro por tipo), con un índice por `userId, date`. Con pocos datos daría lo mismo, pero es lo que escala si hay miles de movimientos.

**Autenticación simple pero segura.** El diseño pedía login con credenciales, así que armé una sesión propia: la contraseña se guarda hasheada con bcrypt y la sesión es un JWT firmado en una cookie `httpOnly` y `sameSite=lax`. "Recordarme" decide si la cookie dura 30 días o se borra al cerrar el navegador. El `proxy.ts` hace un chequeo rápido para redirigir al login, y cada API route vuelve a validar la sesión y filtra siempre por el usuario logueado: pedir el movimiento de otro usuario devuelve 404, igual que uno inexistente. El login responde el mismo mensaje si el email no existe o si la contraseña está mal, para no revelar qué emails están registrados.

**Validaciones con Zod compartidas.** El mismo schema valida el formulario en el cliente (para mostrar errores al toque) y el body en el servidor (que es el que manda). Los query params del listado también se validan, y un valor inválido devuelve 400 con un mensaje claro.

**Montos como `Decimal`.** En la base los montos son `Decimal(12, 2)` para no arrastrar errores de punto flotante. Se pasan a `number` recién al serializar la respuesta.

**Pantalla de detalle.** El Figma no incluye el detalle de un movimiento, así que lo diseñé siguiendo el mismo lenguaje visual (cards blancas, íconos y colores por tipo de movimiento).

**Mobile first.** El diseño es de una app mobile. En desktop la app se muestra centrada con el ancho de un teléfono, en vez de estirar un layout que no fue pensado para pantallas anchas.

**Detalles de UX.**
- Skeletons mientras carga, en lugar de un spinner genérico.
- Estados vacíos distintos según el caso: "todavía no tenés movimientos" o "no hay resultados para tu búsqueda", con la opción de limpiar los filtros.
- Errores con mensaje claro y botón de reintentar.
- La lupa del home lleva a Movimientos con el buscador ya enfocado.
- Si la sesión vence con la app abierta, redirige al login.
- Labels, `aria-*` y foco visible para que se pueda usar con teclado y lector de pantalla.

## Qué mejoraría con más tiempo

- **Tests:** unit tests de las validaciones y los formatters, tests de integración de las API routes contra una base de test y algunos e2e con Playwright para el flujo login → movimientos → detalle.
- **Paginación** del listado (cursor o scroll infinito). Hoy trae hasta 50 movimientos.
- **Cache de datos en el cliente** con TanStack Query o SWR, para no volver a pedir lo mismo al navegar entre pantallas y tener revalidación en segundo plano.
- **Rate limiting** en el login para frenar ataques de fuerza bruta.
- Filtrar los movimientos según la tarjeta seleccionada en el carrusel del home.
- Notificaciones reales (hoy la campanita muestra que no hay notificaciones nuevas).
- Más filtros, como rango de fechas o montos.
