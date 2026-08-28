# TECH

## 1. Alcance
Se priorizo un ciclo E2E corto pero completo sobre cantidad de escenarios. Esto permite demostrar autenticacion, operación principal, verificación de estado y negativos

## 2. POM - Page Object Model
Las páginas encapsulan locators y acciones. Los tests expresan intención de negocio y no detalles de implementación

## 3. Fixtures
Las page objects se inyectan mediante fixtures para reducir duplicación y mantener una construcción consistente

## 4. Waits
Se utilizan web-first assertions y auto-wait de Playwright. No se utilizan sleeps fijos

## 5. Data
Los usuarios y datos de checkout se encuentran fuera de los tests. Esto facilita cambiar escenarios sin modificar lógica de automatización

## 6. Independencia
Cada test inicia con un contexto limpio y prepara el estado requerido. No depende de la ejecución previa de otro test

## 7. Evidencias
Se retienen trace/video y screenshots únicamente cuando aportan valor en un fallo, además del reporte HTML

## 8. CI
GitHub Actions ejecuta la suite y publica el reporte como artifact. Se habilitan reintentos limitados en CI para diferenciar fallos transitorios de fallos reproducibles sin ocultarlos
