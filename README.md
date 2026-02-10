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

### Gerar o WASM

Requer Emscripten (emcc):

```bash
./wasm/build_wasm.sh
```

Isso gera `lib/agle_wasm.wasm`.

### Contrato esperado

```c
void agle_bytes(uint8_t *out, int len);
```

Se o WASM nao estiver presente, o sistema usa WebCrypto como fallback.

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
