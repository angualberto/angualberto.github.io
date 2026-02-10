# RNG Visual Test

Teste visual de aleatoriedade usando HTML, CSS e JavaScript.

## Objetivo

Validar visualmente a uniformidade e estabilidade de geradores RNG:

- histograma por faixa
- total de amostras
- entropia de Shannon aproximada
- teste chi-quadrado
- exportacao CSV

## Estrutura

```
rng-visual-test/
├── index.html
├── style.css
├── app.js
├── lib/
│   ├── agle_wasm.js
│   └── my_rng.js
├── wasm/
│   ├── agle_wasm.c
│   └── build_wasm.sh
├── README.md
└── LICENSE
```

## Uso local

Abra o arquivo index.html no navegador.

## Integracao com a biblioteca AGLE (WASM)

A integracao usa um modulo WASM com a funcao `agle_bytes`.
O wrapper `lib/my_rng.js` carrega esse modulo e expande para:

- `nextInt(min, max)`
- `nextFloat()`

## Conceito: Erro de Ponto Flutuante IEEE-754

### O que é "erro de ponto flutuante"?

**Definição formal:**

```
ε = x_real - round_IEEE(x)
```

Onde:
- `x_real`: Valor ideal (precisão infinita/simbólica)
- `round_IEEE(x)`: Valor representável em IEEE-754 (double)
- `ε`: Resíduo de arredondamento (pequeno, mas não-determinístico)

**Por que JavaScript sozinho não basta:**

| Problema | Impacto |
|----------|---------|
| IEEE-754 fixo | Sem controle sobre arredondamento |
| Otimização JIT | Pode eliminar erros |
| Engines diferentes | Comportamento inconsistente |

👉 **JS puro não é ambiente metrológico confiável.**

### Arquitetura AGLE (C → WASM → JS)

```
C (controle numérico)
  ↓  volatile operations → erro ε explícito
WASM (isolamento)
  ↓  cwrap → bytes[n]
JavaScript (visualização)
  ↓  binning + estatísticas
```

**Vantagem:** O erro nasce no C (antes do JS), onde há controle total.

### Implementação (agle_wasm.c)

```c
// 1. Extrair erro IEEE-754
static double agle_fp_error(double x) {
    volatile double y = x * 1.0000000000000001; // força arredondamento
    return y - x;                                 // resíduo físico
}

// 2. Amplificar via mapa logístico caótico
static double agle_logistic(double x) {
    return 3.9999 * x * (1.0 - x);
}

// 3. Misturar com entropia do browser
void agle_bytes(uint8_t *out, int len) {
    emscripten_get_random_bytes(out, len); // baseline WebCrypto
    
    for (int i = 0; i < len; i++) {
        double error = agle_fp_error(state);
        state = agle_logistic(state + error * 1e12); // amplificação
        out[i] ^= (uint8_t)(chaos_bits ^ ...);        // XOR mixing
    }
}
```

**Fontes de entropia:**
1. **IEEE-754 rounding errors** (hardware-induced)
2. **Chaotic map iterations** (amplification)
3. **Browser crypto.getRandomValues()** (baseline security)

### Gerar o WASM

Requer Emscripten (emcc):

```bash
./wasm/build_wasm.sh
```

Isso gera `lib/agle_wasm.wasm` com os exports:

```javascript
Module._agle_bytes(ptr, len)        // RNG principal
Module._agle_fp_error_raw(x)        // Erro IEEE-754 bruto (debug)
```

### Contrato esperado

```c
void agle_bytes(uint8_t *out, int len);
double agle_fp_error_raw(double x);  // opcional (visualização)
```

Se o WASM não estiver presente, o sistema usa WebCrypto como fallback.

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "RNG visual test"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/angualberto.github.io.git
git push -u origin main
```

No GitHub:

Settings -> Pages -> Branch: main -> /root

## Proximos upgrades

- Entropia de Shannon por janela
- Seed manual
- Integracao WASM direta da biblioteca C (com SHAKE256 completo)

## Licenca

Apache-2.0. Consulte LICENSE.
