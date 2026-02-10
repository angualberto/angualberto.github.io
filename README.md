# RNG Visual Test

Teste visual de aleatoriedade usando HTML, CSS e JavaScript.

## Objetivo

Validar visualmente a uniformidade e estabilidade de um gerador RNG:

- histograma por faixa
- total de amostras
- entropia de Shannon aproximada

## Estrutura

```
rng-visual-test/
├── index.html
├── style.css
├── app.js
├── lib/
│   └── my_rng.js
├── README.md
└── LICENSE
```

## Uso local

Abra o arquivo index.html no navegador.

## Integracao com a biblioteca RNG real

Substitua o conteudo de lib/my_rng.js por:

- um wrapper WASM que exponha nextInt(min, max) e nextFloat()
- ou uma API JavaScript com o mesmo contrato

Exemplo de assinatura esperada:

```js
const MyRNG = {
  nextInt(min, max) { /* ... */ },
  nextFloat() { /* ... */ }
};
```

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
- Teste qui-quadrado
- Comparar dois RNGs lado a lado
- Exportar estatisticas em CSV
- Seed manual
- Integracao WASM direta da biblioteca C

## Licenca

Apache-2.0. Consulte LICENSE.
