<div align="center">

# 🧠 Набор элитных навыков для Claude Code

### 🚀 Продвинутые возможности автономной инженерии

**Архитектурные стражи • Верификация Zero-Trust • Семантическая точность**

Курируемая коллекция навыков инфраструктурного уровня для превращения Claude Code из помощника в доверенного автономного инженера.

[![Лицензия: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude-Code-624ad1?style=for-the-badge)](https://anthropic.com/claude)

---

### 🌍 Многоязычная поддержка
[English](../README.md) | [Українська](./README.ua.md) | [Русский](./README.ru.md) | [Čeština](./README.cs.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md)

</div>

---

## ⚡ Быстрый старт

### Установка

1.  **Клонируйте или скачайте** этот репозиторий.
2.  **Установите все навыки** в ваше рабочее пространство:

```bash
mkdir -p ~/.claude/skills
cp -r skills/* ~/.claude/skills/
```

3.  **Перезагрузите навыки** в вашей интерактивной сессии Claude:

```bash
/skills reload
```

---

## 🏆 Элитная девятка

Эти навыки агрессивно используют **CodePulse**, **AST-анализ** и **историю Git** для решения основных болевых точек ИИ-кодинга.

| Навык | Ключевая концепция | Решаемая проблема |
|-------|----------------|------------------|
| **🛡️ [Zero-Trust Verifier](../skills/zero-trust-verifier/SKILL.md)** | Обязательная мульти-движковая верификация | Заявления «готово», которые ломают сборку |
| **🔮 [Blast Radius Oracle](../skills/blast-radius-oracle/SKILL.md)** | Транзитивный анализ зависимостей | Скрытые регрессии в общем коде |
| **🏰 [Architectural Sentinel](../skills/architectural-drift-sentinel/SKILL.md)** | Динамическое обеспечение границ | Галлюцинированные импорты и дрейф |
| **🛑 [Anti-Loop Supervisor](../skills/anti-loop-supervisor/SKILL.md)** | Прерывание циклов на основе Левенштейна | Бесконечные повторные попытки правок |
| **🔪 [Context Slicer](../skills/context-slicer/SKILL.md)** | Хирургическое извлечение AST-символов | Раздувание контекста и шум в файлах |
| **🧪 [Regression Sentinel](../skills/regression-sentinel/SKILL.md)** | Автономные TDD-скрипты репродукции | Исправления, не доказанные объективно |
| **🔗 [Temporal Mapper](../skills/temporal-coupling-mapper/SKILL.md)** | Логическая связь на основе Git | Забытые связанные конфиги/схемы |
| **🎯 [Semantic Test Selector](../skills/semantic-test-selector/SKILL.md)** | Таргетированное тестирование по графу | Игнорирование тестов из-за медленных наборов |
| **🏗️ [Shadow Patch Simulator](../skills/shadow-patch-simulator/SKILL.md)** | Изолированные проверки в VFS | Правки многих файлов, ломающие репо |
| **📝 [Git Auto-Committer](../skills/git-auto-committer/SKILL.md)** | Атомарные конвенциональные коммиты | Грязное пространство и сломанный git status |

---

## 🔍 Основная философия

Традиционный ИИ-кодинг часто страдает от **«преждевременного празднования»** и **«слепоты локального контекста»**. 

Этот набор навыков трансформирует рабочий процесс **Claude Code**:
1.  **Исследование:** Используйте **Oracle** и **Mapper**, чтобы увидеть невидимые цепные эффекты.
2.  **Планирование:** Используйте **Simulator** для проверки архитектурного влияния в песочнице.
3.  **Исполнение:** Используйте **Slicer** для высокоточных правок с низким уровнем шума.
4.  **Верификация:** Используйте **Verifier** и **Test Selector** для гарантии 100% надежности перед тем, как **Claude** скажет «Готово».

---

## 🤖 Требования

- **Claude Code** (последняя версия)
- **CodePulse MCP** (установлен и запущен)
- **Node.js 18+**

---

## 📄 Лицензия

MIT License © 2026 Archpulse

---

<div align="center">

### ⭐ Прокачайте ваш Claude Code сегодня.

**Сделано с ❤️ для автономного будущего**

</div>
