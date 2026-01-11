# 🎁 SISTEMA DE RECOMPENSAS - HABIT GO

## 📊 JERARQUÍA DE GEMAS (10 NIVELES)

### Carpeta 1 → **ULTIMATE** (44x44px) 🏆
**La gema suprema - Perfección absoluta**
- 365 días de racha continua
- 15+ hábitos activos simultáneamente
- 1000+ completaciones totales
- Todos los demás logros desbloqueados

### Carpeta 2 → **MYTHIC** (27x26px) 💎
**Legendario mítico - Elite absoluta**
- 200+ días de racha
- 12+ hábitos creados
- 500+ completaciones
- 5+ hábitos con racha 100+ días

### Carpeta 3 → **LEGENDARY** (26x23px) ⭐
**Dorado legendario - Excelencia máxima**
- 100+ días de racha
- 10+ hábitos creados
- 365 completaciones (año completo)
- Racha más larga: 100+ días

### Carpeta 4 → **EPIC+** (21x25px) 🔥
**Épico avanzado - Maestría dedicada**
- 60+ días de racha (2 meses)
- 8+ hábitos creados
- 200+ completaciones
- 3+ hábitos con racha 30+ días

### Carpeta 5 → **EPIC** (24x26px) 💜
**Épico - Compromiso serio**
- 30+ días de racha (mes completo)
- 7+ hábitos creados
- 100+ completaciones
- Primer hábito con racha 30+ días

### Carpeta 6 → **RARE+** (19x22px) 💙
**Raro avanzado - Consistencia probada**
- 21+ días de racha (3 semanas - hábito formado)
- 5+ hábitos creados
- 50+ completaciones

### Carpeta 7 → **RARE** (20x30px) 🔷
**Raro - Compromiso establecido**
- 14+ días de racha (2 semanas)
- 4+ hábitos creados
- 25+ completaciones

### Carpeta 8 → **UNCOMMON** (28x28px) 💚
**Poco común - Primeros pasos sólidos**
- 7+ días de racha (semana completa)
- 3+ hábitos creados
- 10+ completaciones

### Carpeta 9 → **COMMON** (23x27px) 🤍
**Común - Iniciando el camino**
- 3+ días de racha
- 2+ hábitos creados
- 5+ completaciones

### Carpeta 10 → **STARTER** (18x30px) ⚪
**Inicial - Primer logro**
- Primer hábito creado
- Primera completación
- Primer día

---

## 🎯 CÓDIGOS DE RECOMPENSAS PROPUESTOS

### **RACHAS (STREAK)**

#### STARTER
- `streak_1_starter` - "Primer Paso" - 1 día

#### COMMON
- `streak_3_common` - "Arranque" - 3 días

#### UNCOMMON
- `streak_7_uncommon` - "Semana Completa" - 7 días

#### RARE
- `streak_14_rare` - "Dos Semanas" - 14 días

#### RARE_PLUS
- `streak_21_rare_plus` - "Hábito Formado" - 21 días (científicamente comprobado)

#### EPIC
- `streak_30_epic` - "Mes de Hierro" - 30 días

#### EPIC_PLUS
- `streak_60_epic_plus` - "Bimestre Perfecto" - 60 días

#### LEGENDARY
- `streak_100_legendary` - "Centenario" - 100 días

#### MYTHIC
- `streak_200_mythic` - "Bicentenario" - 200 días

#### ULTIMATE
- `streak_365_ultimate` - "Año Perfecto" - 365 días

---

### **HÁBITOS CREADOS (HABIT_COUNT)**

#### STARTER
- `habit_1_starter` - "Primer Hábito" - 1 hábito

#### COMMON
- `habit_2_common` - "Doble Compromiso" - 2 hábitos

#### UNCOMMON
- `habit_3_uncommon` - "Diversificación" - 3 hábitos

#### RARE
- `habit_4_rare` - "Cuatro Pilares" - 4 hábitos

#### RARE_PLUS
- `habit_5_rare_plus` - "Cinco Fuerzas" - 5 hábitos

#### EPIC
- `habit_7_epic` - "Semana de Hábitos" - 7 hábitos

#### EPIC_PLUS
- `habit_8_epic_plus` - "Octágono Perfecto" - 8 hábitos

#### LEGENDARY
- `habit_10_legendary` - "Decálogo" - 10 hábitos

#### MYTHIC
- `habit_12_mythic` - "Doce Meses" - 12 hábitos

#### ULTIMATE
- `habit_15_ultimate` - "Maestro de Hábitos" - 15 hábitos

---

### **COMPLETACIONES TOTALES (TOTAL_COMPLETIONS)**

#### STARTER
- `completion_1_starter` - "Primera Vez" - 1 completación

#### COMMON
- `completion_5_common` - "Cinco Veces" - 5 completaciones

#### UNCOMMON
- `completion_10_uncommon` - "Decena" - 10 completaciones

#### RARE
- `completion_25_rare` - "Veinticinco" - 25 completaciones

#### RARE_PLUS
- `completion_50_rare_plus` - "Medio Centenar" - 50 completaciones

#### EPIC
- `completion_100_epic` - "Centenar" - 100 completaciones

#### EPIC_PLUS
- `completion_200_epic_plus` - "Bicentenario" - 200 completaciones

#### LEGENDARY
- `completion_365_legendary` - "Año de Compromiso" - 365 completaciones

#### MYTHIC
- `completion_500_mythic` - "Medio Millar" - 500 completaciones

#### ULTIMATE
- `completion_1000_ultimate` - "Millar Perfecto" - 1000 completaciones

---

### **LOGROS ESPECIALES**

#### RARE_PLUS
- `longestStreak_30_rare_plus` - "Mejor Racha: 30" - Racha más larga de 30+ días

#### EPIC
- `allHabits_active_epic` - "Todos Activos" - Todos los hábitos completados en un día

#### EPIC_PLUS
- `multiStreak_3_epic_plus` - "Triple Racha" - 3 hábitos con racha 30+ días

#### LEGENDARY
- `longestStreak_100_legendary` - "Mejor Racha: 100" - Racha más larga de 100+ días

#### MYTHIC
- `multiStreak_5_mythic` - "Quíntuple Racha" - 5 hábitos con racha 100+ días

#### ULTIMATE
- `perfect_year_ultimate` - "Año Perfecto" - 365 días sin fallar ningún hábito

---

## 🎨 USO DEL COMPONENTE

```tsx
import { GemSprite } from '@/components/ui/Gem';

// Gema animada (por defecto)
<GemSprite tier="EPIC" size={48} />

// Gema estática
<GemSprite tier="LEGENDARY" size={64} animated={false} />

// Gema con animación personalizada
<GemSprite 
  tier="ULTIMATE" 
  size={80} 
  animated={true}
  animationSpeed={150}
/>
```

---

## 🔧 HELPER FUNCTIONS

```tsx
import { getTierByRequirement } from '@/components/ui/Gem';

// Obtener tier según racha
const tier = getTierByRequirement(30, 'streak'); // → 'EPIC'

// Obtener tier según hábitos
const tier = getTierByRequirement(10, 'habits'); // → 'LEGENDARY'

// Obtener tier según completaciones
const tier = getTierByRequirement(500, 'completions'); // → 'MYTHIC'
```

---

## 📋 INTEGRACIÓN CON BACKEND

El backend ya tiene la estructura en `src/module/reward/`. Solo necesitas:

1. **Actualizar el enum RewardTier** en el backend para incluir los 10 niveles:
```typescript
export enum RewardTier {
  STARTER = 'STARTER',
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  RARE_PLUS = 'RARE_PLUS',
  EPIC = 'EPIC',
  EPIC_PLUS = 'EPIC_PLUS',
  LEGENDARY = 'LEGENDARY',
  MYTHIC = 'MYTHIC',
  ULTIMATE = 'ULTIMATE',
}
```

2. **Crear seeds** con todas las recompensas usando los códigos propuestos

3. **El icon** en cada recompensa puede ser el número de carpeta (1-10) para que el frontend sepa qué gema mostrar

---

## 🎮 PRÓXIMOS PASOS

1. ✅ **Componente GemSprite creado** - Muestra gemas animadas
2. ✅ **Sistema de tiers definido** - 10 niveles de rareza
3. ✅ **Códigos de recompensas** - Nombres y requisitos
4. ⏳ **Página de recompensas** - UI para ver logros desbloqueados
5. ⏳ **Notificación de desbloqueo** - Modal cuando se obtiene una gema
6. ⏳ **Progreso hacia recompensas** - Barra de progreso
7. ⏳ **Backend seeds** - Poblar base de datos con recompensas

---

## 💡 TIPS DE DISEÑO

### Dónde usar las gemas:
- **Dashboard**: Mostrar última gema desbloqueada
- **Perfil**: Vitrina de todas las gemas
- **Notificaciones**: Popup al desbloquear
- **Progreso**: Indicador de próxima gema
- **Leaderboard**: Clasificación por gemas

### Animaciones sugeridas:
- **Desbloqueo**: Sparkle effect + gema apareciendo
- **Hover**: Brillar más rápido
- **Click**: Mostrar detalles del logro
- **Vitrina**: Gemas bloqueadas en gris/silueta

---

**¿Quieres que implemente la página de recompensas o la notificación de desbloqueo?**
