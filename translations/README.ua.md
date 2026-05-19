<div align="center">

# 🧠 Набір елітних навичок для Claude Code

### 🚀 Просунуті можливості автономної інженерії

**Архітектурні вартові • Верифікація Zero-Trust • Семантична точність**

Курована колекція навичок інфраструктурного рівня для перетворення Claude Code з помічника на довіреного автономного інженера.

[![Ліцензія: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude-Code-624ad1?style=for-the-badge)](https://anthropic.com/claude)

---

### 🌍 Багатомовна підтримка
[English](../README.md) | [Українська](./README.ua.md) | [Русский](./README.ru.md) | [Čeština](./README.cs.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md)

</div>

---

## ⚡ Швидкий старт

### Встановлення

1.  **Склонуйте або завантажте** цей репозиторій.
2.  **Встановіть усі навички** у ваш робочий простір:

```bash
mkdir -p ~/.claude/skills
cp -r skills/* ~/.claude/skills/
```

3.  **Перезавантажте навички** у вашій інтерактивній сесії Claude:

```bash
/skills reload
```

---

## 🏆 Елітна дев'ятка

Ці навички агресивно використовують **CodePulse**, **AST-аналіз** та **історію Git** для вирішення основних проблем ШІ-кодингу.

| Навичка | Ключова концепція | Проблема, що вирішується |
|---------|-------------------|--------------------------|
| **🛡️ [Zero-Trust Verifier](../skills/zero-trust-verifier/SKILL.md)** | Обов'язкова мульти-рушійна верифікація | Заяви «готово», що ламають збірку |
| **🔮 [Blast Radius Oracle](../skills/blast-radius-oracle/SKILL.md)** | Транзитивний аналіз залежностей | Приховані регресії у спільному коді |
| **🏰 [Architectural Sentinel](../skills/architectural-drift-sentinel/SKILL.md)** | Динамічне забезпечення кордонів | Галлюциновані імпорти та дрейф |
| **🛑 [Anti-Loop Supervisor](../skills/anti-loop-supervisor/SKILL.md)** | Переривання циклів на основі Левенштейна | Нескінченні повторні спроби правок |
| **🔪 [Context Slicer](../skills/context-slicer/SKILL.md)** | Хірургічне вилучення AST-символів | Роздуття контексту та шум у файлах |
| **🧪 [Regression Sentinel](../skills/regression-sentinel/SKILL.md)** | Автономні TDD-скрипти репродукції | Виправлення, не доведені об'єктивно |
| **🔗 [Temporal Mapper](../skills/temporal-coupling-mapper/SKILL.md)** | Логічний зв'язок на основі Git | Забуті пов'язані конфіги/схеми |
| **🎯 [Semantic Test Selector](../skills/semantic-test-selector/SKILL.md)** | Таргетоване тестування за графом | Ігнорування тестів через повільні набори |
| **🏗️ [Shadow Patch Simulator](../skills/shadow-patch-simulator/SKILL.md)** | Ізольовані перевірки у VFS | Правки багатьох файлів, що ламають репо |
| **📝 [Git Auto-Committer](../skills/git-auto-committer/SKILL.md)** | Атомарні конвенціональні коміти | Брудний простір та зламаний git status |

---

## 🔍 Основна філософія

Традиційний ШІ-кодинг часто страждає від **«передчасного святкування»** та **«сліпоти локального контексту»**. 

Цей набір навичок трансформує робочий процес **Claude Code**:
1.  **Дослідження:** Використовуйте **Oracle** та **Mapper**, щоб побачити невидимі ланцюгові ефекти.
2.  **Планування:** Використовуйте **Simulator** для перевірки архітектурного впливу в пісочниці.
3.  **Виконання:** Використовуйте **Slicer** для високоточних правок з низьким рівнем шуму.
4.  **Верифікація:** Використовуйте **Verifier** та **Test Selector** для гарантії 100% надійності перед тим, як **Claude** скаже «Готово».

---

## 🤖 Вимоги

- **Claude Code** (остання версія)
- **CodePulse MCP** (встановлений та запущений)
- **Node.js 18+**

---

## 📄 Ліцензія

MIT License © 2026 Archpulse

---

<div align="center">

### ⭐ Прокачайте ваш Claude Code сьогодні.

**Зроблено з ❤️ для автономного майбутнього**

</div>
