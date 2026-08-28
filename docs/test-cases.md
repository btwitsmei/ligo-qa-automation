# Test cases 

## Criterios de aceptacion - CA

### HU-1 — Autenticacion
- CA-01: Un usuario valido puede iniciar sesion y acceder a Products
- CA-02: Credenciales invalidas muestran un mensaje de error y no permiten acceso
- CA-03: Un usuario bloqueado no puede iniciar sesion y recibe un mensaje identificable
- CA-04: El sistema soporta latencia de red en autenticación sin fallar por timeout

### HU-2 — Operacion principal
- CA-05: Un usuario autenticado puede agregar un producto al carrito
- CA-06: El carrito refleja el producto seleccionado.
- CA-07: El usuario puede completar el checkout con información valida

### HU-3 — Verificacion de estado
- CA-08: El carrito mantiene el producto agregado
- CA-09: Después de finalizar la compra se muestra la confirmación de orden

### HU-4 — Negativos y bordes
- CA-10: El checkout rechaza nombre vacio
- CA-11: El checkout rechaza apellido vacio
- CA-12: El checkout rechaza código postal vacio
- CA-13: Deteccion de imágenes rotas
- CA-14: Deteccion de fallos al agregar al carrito
- CA-15: Deteccion de bloqueo en el campo de apellido en checkout

## Casos

| ID | Historia | Caso | Técnica | Prioridad | Severidad | Datos | Resultado esperado | Automatizado |
|---|---|---|---|---|---|---|---|---|
| TC-001 | HU-1 / CA-01 | Login válido | Partición de equivalencia | P0 | S1 | `standard_user / secret_sauce` | Acceso a Products | `login.spec.ts` |
| TC-002 | HU-1 / CA-02 | Credenciales inválidas | Partición de equivalencia | P1 | S2 | `invalid / invalid` | Error y acceso denegado | `login.spec.ts` |
| TC-003 | HU-1 / CA-03 | Usuario bloqueado | Transición de estados | P1 | S2 | `locked_out_user` | Error de bloqueo | `login.spec.ts` |
| TC-004 | HU-1 / CA-04 | Tolerancia a latencia de login | Pruebas de rendimiento / Latencia | P2 | S2 | `performance_glitch_user` | Acceso correcto tras la espera (>5s) | `login.spec.ts` |
| TC-005 | HU-2 / CA-05 | Agregar producto | E2E | P0 | S1 | `sauce-labs-backpack` | Badge = 1 | `checkout.spec.ts` |
| TC-006 | HU-2 / CA-06 | Verificar carrito | Transición de estados | P0 | S1 | Producto agregado | Producto visible | `checkout.spec.ts` |
| TC-007 | HU-2 / CA-07 | Checkout válido | E2E | P0 | S1 | Datos válidos | Compra finalizada | `checkout.spec.ts` |
| TC-008 | HU-3 / CA-08 | Persistencia en carrito | Estado | P0 | S1 | Producto | Item visible | `checkout.spec.ts` |
| TC-009 | HU-3 / CA-09 | Confirmación de orden | E2E | P0 | S1 | Compra válida | `Thank you for your order!` | `checkout.spec.ts` |
| TC-010 | HU-4 / CA-10 | Nombre vacío | Valores límite | P1 | S2 | `firstName=""` | `First Name is required` | `checkout-negative.spec.ts` |
| TC-011 | HU-4 / CA-11 | Apellido vacío | Valores límite | P1 | S2 | `lastName=""` | `Last Name is required` | `checkout-negative.spec.ts` |
| TC-012 | HU-4 / CA-12 | ZIP vacío | Valores límite | P1 | S2 | `postalCode=""` | `Postal Code is required` | `checkout-negative.spec.ts` |
| TC-013 | HU-4 / CA-13 | Captura de imágenes rotas | Exploratoria / Bug detection | P2 | S2 | `problem_user` | Detección de atributo `src` `sl-404` | `checkout-problem.spec.ts` |
| TC-014 | HU-4 / CA-14 | Captura de fallo en carrito | Exploratoria / Bug detection | P2 | S2 | `problem_user` | Detección de badge sin actualizar | `checkout-problem.spec.ts` |
| TC-015 | HU-4 / CA-15 | Captura de input apellido bloqueado | Exploratoria / Bug detection | P2 | S2 | `problem_user` | Detección de campo bloqueado (valor `""`) | `checkout-problem.spec.ts` |



## Equivalencia

Para autenticación:
- Válida: usuario existente y habilitado + password correcta.
- Inválida: usuario/password no válidos.
- Bloqueada: usuario existente pero bloqueado.

Para checkout:
- Válida: los tres campos obligatorios informados.
- Inválida: al menos un campo obligatorio vacío.

## Severidad

- S1: bloqueo de flujo principal / perdida de capacidad de compra.
- S2: funcionalidad importante afectada, pero existe navegacion o flujo alternativo.

## Trazabilidad

| Historia | Criterio | Caso | Test |
|---|---|---|---|
| HU-1 | CA-01 | TC-001 | `tests/auth/login.spec.ts` |
| HU-1 | CA-02 | TC-002 | `tests/auth/login.spec.ts` |
| HU-1 | CA-03 | TC-003 | `tests/auth/login.spec.ts` |
| HU-1 | CA-04 | TC-004 | `tests/auth/login.spec.ts` |
| HU-2 | CA-05 | TC-005 | `tests/checkout/checkout.spec.ts` |
| HU-2 | CA-06 | TC-006 | `tests/checkout/checkout.spec.ts` |
| HU-2 | CA-07 | TC-007 | `tests/checkout/checkout.spec.ts` |
| HU-3 | CA-08 | TC-008 | `tests/checkout/checkout.spec.ts` |
| HU-3 | CA-09 | TC-009 | `tests/checkout/checkout.spec.ts` |
| HU-4 | CA-10 | TC-010 | `tests/checkout/checkout-negative.spec.ts` |
| HU-4 | CA-11 | TC-011 | `tests/checkout/checkout-negative.spec.ts` |
| HU-4 | CA-12 | TC-012 | `tests/checkout/checkout-negative.spec.ts` |
| HU-4 | CA-13 | TC-013 | `tests/checkout/checkout-problem.spec.ts` |
| HU-4 | CA-14 | TC-014 | `tests/checkout/checkout-problem.spec.ts` |
| HU-4 | CA-15 | TC-015 | `tests/checkout/checkout-problem.spec.ts` |
