# 🔌 API Backend Reference - Habit-GO

> **Base URL**: `http://localhost:3000`  
> **Puerto Backend**: 3000  
> **Puerto Frontend**: 3001

---

## 📋 **TABLA DE CONTENIDOS**

1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Hábitos](#hábitos)
4. [Registros de Hábitos](#registros-de-hábitos)
5. [Recompensas](#recompensas)
6. [Guards & Middleware](#guards--middleware)

---

## 🔐 **AUTENTICACIÓN**

### **POST `/auth/login`**
Iniciar sesión con email y contraseña.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "userData": {
    "id": "uuid",
    "name": "Usuario",
    "username": "usuario123",
    "email": "usuario@example.com",
    "avatar": null
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

---

### **POST `/auth/register`** ❌ (Endpoint incorrecto en frontend)
> ⚠️ **NOTA**: El frontend actualmente llama a `/users/create` para registro, no `/auth/register`

---

### **POST `/auth/refresh`**
Refrescar token de acceso.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:**
```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

---

### **POST `/auth/logout`**
Cerrar sesión y revocar tokens.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:** `204 No Content`

---

### **POST `/auth/forgot-password`**
Solicitar restablecimiento de contraseña.

**Request Body:**
```json
{
  "email": "usuario@example.com"
}
```

---

### **POST `/auth/reset-password`**
Restablecer contraseña con token.

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "newpassword123"
}
```

---

### **POST `/auth/google/login`**
Login con Google OAuth.

**Request Body:**
```json
{
  "credential": "google_oauth_credential"
}
```

**Response:** Mismo formato que `/auth/login`

---

## 👤 **USUARIOS**

### **POST `/users/create`**
Crear nuevo usuario (registro).

**Request Body:**
```json
{
  "name": "Usuario Nuevo",
  "username": "usuario123",
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Validaciones:**
- Password mínimo 8 caracteres
- Email único
- Username único

---

### **GET `/users/me`** 🔒
Obtener datos del usuario autenticado.

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": "uuid",
  "name": "Usuario",
  "username": "usuario123",
  "email": "usuario@example.com",
  "avatar": null,
  "createdAt": "2025-01-07T00:00:00.000Z",
  "updatedAt": "2025-01-07T00:00:00.000Z"
}
```

---

### **PATCH `/users/profile`** 🔒
Actualizar perfil del usuario.

**Request Body:**
```json
{
  "name": "Nuevo Nombre",
  "username": "nuevousername",
  "avatar": "https://avatar.url/image.png"
}
```

---

### **GET `/users/stats`** 🔒
Obtener estadísticas del usuario.

**Response:**
```json
{
  "totalHabits": 5,
  "activeHabits": 3,
  "totalCompletions": 120,
  "longestStreak": 45,
  "currentStreaks": 23,
  "unlockedRewards": 8
}
```

---

## 🎯 **HÁBITOS**

### **GET `/habits`** 🔒
Obtener todos los hábitos del usuario.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Hacer ejercicio",
    "description": "30 minutos de cardio",
    "frequency": "daily",
    "streak": 15,
    "longestStreak": 30,
    "lastCompletedDate": "2025-01-07T10:00:00.000Z",
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-07T00:00:00.000Z",
    "currentStreak": 15,
    "totalCompletions": 45
  }
]
```

**Query Params:**
- `frequency`: 'daily' | 'weekly'
- `isActive`: true | false

---

### **GET `/habits/:id`** 🔒
Obtener un hábito específico.

---

### **POST `/habits`** 🔒
Crear nuevo hábito.

**Request Body:**
```json
{
  "title": "Leer 20 páginas",
  "description": "Lectura diaria antes de dormir",
  "frequency": "daily"
}
```

**Validaciones:**
- `title`: máximo 100 caracteres, requerido
- `description`: máximo 500 caracteres, opcional
- `frequency`: 'daily' | 'weekly', requerido

---

### **PATCH `/habits/:id`** 🔒
Actualizar hábito.

**Request Body:**
```json
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "frequency": "weekly",
  "isActive": false
}
```

---

### **DELETE `/habits/:id`** 🔒
Eliminar hábito (soft delete).

---

### **GET `/habits/:id/stats`** 🔒
Obtener estadísticas del hábito.

**Response:**
```json
{
  "habitId": "uuid",
  "currentStreak": 15,
  "longestStreak": 30,
  "totalCompletions": 45,
  "lastCompletedDate": "2025-01-07T10:00:00.000Z",
  "completionRate": 0.85
}
```

---

### **GET `/habits/:id/streak`** 🔒
Obtener datos de racha.

**Response:**
```json
{
  "habitId": "uuid",
  "currentStreak": 15,
  "longestStreak": 30,
  "lastCompletedDate": "2025-01-07T10:00:00.000Z",
  "completionRate": 0.85
}
```

---

## ✅ **REGISTROS DE HÁBITOS (Completaciones)**

### **POST `/habit-register`** 🔒
Marcar hábito como completado.

**Request Body:**
```json
{
  "habitId": "uuid",
  "notes": "Completado con éxito",
  "completedDate": "2025-01-07T10:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "habitId": "uuid",
  "userId": "uuid",
  "completedDate": "2025-01-07T10:00:00.000Z",
  "notes": "Completado con éxito",
  "createdAt": "2025-01-07T10:00:00.000Z"
}
```

**Lógica:**
- Si `completedDate` no se envía, usa fecha actual
- Actualiza streak del hábito
- Verifica si desbloquea nuevas recompensas
- No permite duplicados (mismo hábito, mismo día)

---

### **GET `/habit-register`** 🔒
Obtener todos los registros del usuario.

**Query Params:**
- `habitId`: filtrar por hábito
- `startDate`: fecha inicio
- `endDate`: fecha fin

---

### **GET `/habit-register/history/:habitId`** 🔒
Obtener historial de completaciones de un hábito.

**Response:**
```json
[
  {
    "id": "uuid",
    "habitId": "uuid",
    "userId": "uuid",
    "completedDate": "2025-01-07T10:00:00.000Z",
    "notes": "Excelente sesión",
    "createdAt": "2025-01-07T10:00:00.000Z"
  }
]
```

---

## 🏆 **RECOMPENSAS**

### **GET `/reward`** 🔒
Obtener todas las recompensas disponibles.

**Response:**
```json
[
  {
    "id": "uuid",
    "code": "FIRST_HABIT",
    "name": "Primer Paso",
    "description": "Crea tu primer hábito",
    "type": "HABIT_COUNT",
    "tier": "COMMON",
    "icon": "🌱",
    "requirement": 1,
    "orderIndex": 1,
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

**Tipos de Recompensas:**
- `STREAK`: basadas en rachas
- `HABIT_COUNT`: número de hábitos creados
- `TOTAL_COMPLETIONS`: completaciones totales

**Tiers:**
- `COMMON` - Común
- `UNCOMMON` - Poco común
- `RARE` - Raro
- `EPIC` - Épico
- `LEGENDARY` - Legendario

---

### **GET `/reward/user`** 🔒
Obtener recompensas del usuario.

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "rewardId": "uuid",
    "reward": {
      "id": "uuid",
      "code": "FIRST_HABIT",
      "name": "Primer Paso",
      "description": "Crea tu primer hábito",
      "type": "HABIT_COUNT",
      "tier": "COMMON",
      "icon": "🌱",
      "requirement": 1
    },
    "unlockedAt": "2025-01-07T10:00:00.000Z",
    "isViewed": false,
    "progress": 100
  }
]
```

---

### **GET `/reward/:id`** 🔒
Obtener recompensa específica.

---

### **POST `/reward/:id/claim`** 🔒
Reclamar recompensa (si cumple requisitos).

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "rewardId": "uuid",
  "reward": { ... },
  "unlockedAt": "2025-01-07T10:00:00.000Z",
  "isViewed": false,
  "progress": 100
}
```

---

### **POST `/reward/viewed`** 🔒
Marcar recompensas como vistas.

**Request Body:**
```json
{
  "rewardIds": ["uuid1", "uuid2", "uuid3"]
}
```

---

## 🛡️ **GUARDS & MIDDLEWARE**

### **JwtAuthGuard**
- Protege rutas con 🔒
- Requiere `Authorization: Bearer {token}`
- Valida JWT y extrae userId

### **EmailVerifiedGuard**
- Verifica si el email está confirmado
- Se aplica con decorador `@RequireEmailVerified()`

### **OwnershipGuard**
- Verifica que el usuario sea dueño del recurso
- Se aplica con decorador `@RequireOwnership()`
- Compara userId del token con userId del recurso

### **RolesGuard**
- Verifica roles del usuario (ADMIN, USER)
- Se aplica con decorador `@Roles('ADMIN')`

### **ThrottlerGuard**
- Rate limiting para prevenir abuso
- Configurable por ruta

---

## 📊 **RESUMEN DE ENDPOINTS**

| Método | Endpoint | Autenticado | Descripción |
|--------|----------|-------------|-------------|
| POST | `/auth/login` | ❌ | Iniciar sesión |
| POST | `/users/create` | ❌ | Registrar usuario |
| POST | `/auth/refresh` | ❌ | Refrescar token |
| POST | `/auth/logout` | ❌ | Cerrar sesión |
| POST | `/auth/forgot-password` | ❌ | Solicitar reset |
| POST | `/auth/reset-password` | ❌ | Resetear password |
| POST | `/auth/google/login` | ❌ | Login con Google |
| GET | `/users/me` | ✅ | Perfil usuario |
| PATCH | `/users/profile` | ✅ | Actualizar perfil |
| GET | `/users/stats` | ✅ | Estadísticas usuario |
| GET | `/habits` | ✅ | Listar hábitos |
| GET | `/habits/:id` | ✅ | Obtener hábito |
| POST | `/habits` | ✅ | Crear hábito |
| PATCH | `/habits/:id` | ✅ | Actualizar hábito |
| DELETE | `/habits/:id` | ✅ | Eliminar hábito |
| GET | `/habits/:id/stats` | ✅ | Stats de hábito |
| GET | `/habits/:id/streak` | ✅ | Racha de hábito |
| POST | `/habit-register` | ✅ | Completar hábito |
| GET | `/habit-register` | ✅ | Listar registros |
| GET | `/habit-register/history/:habitId` | ✅ | Historial hábito |
| GET | `/reward` | ✅ | Listar recompensas |
| GET | `/reward/user` | ✅ | Recompensas usuario |
| GET | `/reward/:id` | ✅ | Obtener recompensa |
| POST | `/reward/:id/claim` | ✅ | Reclamar recompensa |
| POST | `/reward/viewed` | ✅ | Marcar vistas |

---

## ⚠️ **DISCREPANCIAS DETECTADAS**

### **1. Endpoint de Registro**
- **Frontend llama**: `/users/create`
- **Esperado**: Probablemente debería ser `/auth/register`
- **Acción**: Verificar backend o actualizar frontend

### **2. Validaciones**
- **Password**: Mínimo 8 caracteres (definido en frontend constants)
- **Habit title**: Máximo 100 caracteres
- **Habit description**: Máximo 500 caracteres

### **3. Fecha de completación**
- El campo `completedDate` es opcional en el DTO
- Si no se envía, el backend usa la fecha actual
- Permite registrar completaciones de días anteriores

---

## 🚀 **PRÓXIMOS PASOS PARA IMPLEMENTAR**

### **Prioridad Alta:**
1. ✅ **Login Page** - Consumir `/auth/login`
2. ✅ **Dashboard** - Listar hábitos con `GET /habits`
3. ✅ **Crear Hábito** - Formulario con `POST /habits`
4. ✅ **Marcar como Completado** - `POST /habit-register`
5. ✅ **Visualización de Rachas** - `GET /habits/:id/streak`

### **Prioridad Media:**
6. **Perfil Usuario** - `GET /users/me` y `PATCH /users/profile`
7. **Estadísticas** - `GET /users/stats`
8. **Recompensas** - `GET /reward/user`
9. **Historial** - `GET /habit-register/history/:habitId`

### **Prioridad Baja:**
10. **Forgot/Reset Password** - Flujo completo
11. **Google OAuth** - Integración completa
12. **Editar Hábitos** - `PATCH /habits/:id`
13. **Eliminar Hábitos** - `DELETE /habits/:id`

---

## 💡 **NOTAS IMPORTANTES**

1. **Todos los endpoints autenticados** requieren el header `Authorization: Bearer {token}`
2. **Los interceptores de Axios** ya manejan automáticamente:
   - Agregar el token a las peticiones
   - Refrescar token cuando expira (401)
   - Redirigir a login si refresh falla
3. **Los servicios ya están implementados** en el frontend para todos estos endpoints
4. **Solo falta crear los componentes UI** que consuman estos servicios

---

Generado el: 7 de enero de 2026
