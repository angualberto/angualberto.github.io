# 🧬 Sistema de Bioinformática Super Dinâmico v2.0

Um sistema completo e moderno para análise de sequências biológicas, simulação de mutações, treinamento de IA e visualizações avançadas.

## ✨ Novidades da Versão 2.0

### 🚀 Interface Completamente Nova
- **Interface Super Dinâmica** com navegação por setas
- **Seleção visual de arquivos** FASTA
- **Botões coloridos e atalhos** intuitivos
- **Preview em tempo real** de dados
- **Barras de progresso animadas**

### 📊 Visualizações Avançadas
- **Dashboards interativos** com Plotly
- **Gráficos em tempo real** 
- **Análise de composição** de nucleotídeos
- **Relatórios HTML** automatizados
- **Monitor de processamento** em tempo real

### 🤖 IA Integrada
- **Classificador inteligente** de sequências
- **Treinamento automatizado** de modelos
- **Predições em lote**
- **Análise de padrões** moleculares

## 🚀 Início Rápido

### Método 1: Script Automático (Recomendado)
```bash
# No diretório do projeto
./iniciar_sistema.sh
```

### Método 2: Python Direto
```bash
# Launcher principal com menu completo
python3 launcher_principal.py

# Ou diretamente a interface dinâmica
python3 interface_super_dinamica.py
```

## 📋 Requisitos

### Sistema
- **Python 3.7+** com pip
- **Linux/macOS/Windows** (testado no Linux)
- **2GB RAM** mínimo, 4GB+ recomendado
- **1GB espaço** em disco

### Dependências Automáticas
O sistema instala automaticamente:
- `numpy`, `pandas`, `matplotlib`
- `biopython`, `scikit-learn`
- `plotly`, `dash`, `seaborn`
- `colorama`, `rich`, `keyboard`

## 🎮 Como Usar

### 1. Interface Super Dinâmica
```
🎯 Navegação por setas ↑↓
🎯 Enter para selecionar
🎯 Space para marcar arquivos
🎯 Teclas 1-5 para ações rápidas
```

### 2. Seleção de Arquivos
- Navega automaticamente por arquivos FASTA
- Suporte para múltiplos formatos: `.fasta`, `.fa`, `.fna`, `.fas`
- Preview de conteúdo em tempo real
- Seleção múltipla para processamento em lote

### 3. Análises Disponíveis
- **Análise de Sequências**: Composição, GC%, estatísticas
- **Simulação de Mutações**: Pontuais, inserções, deleções
- **Treinamento de IA**: Classificação automática
- **Visualizações**: Dashboards e gráficos interativos

## 📊 Funcionalidades Principais

### 🧬 Análise de Sequências
- Cálculo de conteúdo GC
- Estatísticas de comprimento
- Composição de nucleotídeos
- Identificação de padrões

### 🔄 Simulação de Mutações
- Mutações pontuais aleatórias
- Inserções e deleções
- Controle de taxa de mutação
- Comparação visual de mudanças

### 🤖 Inteligência Artificial
- Classificação de sequências
- Treinamento de modelos CNN
- Predições em lote
- Avaliação de performance

### 📈 Visualizações
- Dashboards HTML interativos
- Gráficos de barras e histogramas
- Análise de composição (pizza)
- Scatter plots comparativos
- Relatórios PDF automáticos

## 📁 Estrutura do Projeto

```
📦 Sistema de Bioinformática/
├── 🚀 iniciar_sistema.sh              # Script de inicialização
├── 🎮 launcher_principal.py           # Menu principal
├── ⚡ interface_super_dinamica.py     # Interface moderna
├── 📊 visualizacao_avancada.py        # Dashboards e gráficos
├── 🤖 sistema_principal.py            # Sistema com IA
├── 🧬 simulador_mutacoes.py           # Simulação de mutações
├── 🔗 integrador_completo.py          # Integração completa
├── 🎯 ia_classi.py                    # Classificador IA
├── 📁 dados/                          # Diretório de dados
│   ├── modelos/                       # Modelos de IA
│   ├── resultados/                    # Resultados de análises
│   ├── visualizacoes/                 # Dashboards HTML
│   └── relatorios/                    # Relatórios gerados
└── 📄 *.fasta                         # Arquivos de sequências
```

## 🎯 Guia de Uso Rápido

### Para Iniciantes
1. Execute `./iniciar_sistema.sh`
2. Escolha opção **1** (Launcher Principal)
3. Selecione **1** (Interface Super Dinâmica)
4. Use setas para navegar e Enter para selecionar
5. Marque arquivos FASTA com Space
6. Pressione **1** para analisar sequências

### Para Usuários Avançados
1. Execute diretamente: `python3 interface_super_dinamica.py`
2. Use teclas de atalho: **1-5** para ações rápidas
3. **f** para favoritos, **h** para histórico
4. Configure processamento em lote na opção **5**

## 🔧 Solução de Problemas

### Erro: "Módulo não encontrado"
```bash
# Instalar dependências
./iniciar_sistema.sh
# Escolher opção 4 (Instalar Dependências)
```

### Erro: "Arquivo não encontrado"
- Certifique-se de que há arquivos `.fasta` no diretório
- Use o explorador de arquivos (opção 8) para verificar

### Interface não responde
- Pressione `Ctrl+C` para cancelar
- Reinstale dependências: `pip install colorama rich keyboard`

### Problemas de Performance
- Use arquivos menores para teste
- Limite seleção a poucos arquivos por vez
- Considere aumentar RAM se possível

## 🎨 Personalização

### Configurações
- Execute o launcher e escolha opção **9**
- Modifique `config.json` para configurações avançadas
- Adicione seus diretórios favoritos

### Temas e Cores
- Sistema suporta terminais com cores ANSI
- Fallback automático para terminais sem cor
- Configurável via arquivo de configuração

## 📈 Performance

### Benchmarks Típicos
- **Arquivo 1MB**: ~2-5 segundos
- **Arquivo 10MB**: ~15-30 segundos  
- **Arquivo 100MB**: ~2-5 minutos
- **Processamento lote**: Linear com número de arquivos

### Otimizações
- Processamento paralelo automático
- Cache inteligente de resultados
- Pré-carregamento de arquivos frequentes

## 🤝 Contribuição

### Reportar Bugs
1. Descreva o problema claramente
2. Inclua informações do sistema
3. Forneça arquivos de exemplo (se possível)

### Sugerir Melhorias
1. Abra uma issue descrevendo a sugestão
2. Inclua casos de uso
3. Considere implementar via pull request

## 📧 Suporte

Para suporte e dúvidas:
- 📧 Email: [seu-email@exemplo.com]
- 💬 Issues no GitHub
- 📖 Wiki do projeto

## 🏆 Reconhecimentos

- **BioPython**: Biblioteca essencial para bioinformática
- **Plotly**: Visualizações interativas incríveis
- **Rich**: Interface de terminal moderna
- **Colorama**: Suporte a cores multiplataforma

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🎉 Versões Anteriores

### v1.0 (Legada)
- Interface básica de terminal
- Funcionalidades essenciais
- Análise simples de sequências

### v2.0 (Atual) 
- Interface super dinâmica
- Navegação visual
- Dashboards interativos
- IA integrada
- Visualizações avançadas

---

**🧬 Sistema de Bioinformática Super Dinâmico v2.0**  
*"Tornando a bioinformática mais visual, dinâmica e intuitiva!"*

---

### ⚡ Início Rápido - Uma Linha
```bash
git clone [repo] && cd [projeto] && ./iniciar_sistema.sh
```

🚀 **Pronto para revolucionar sua análise de sequências!** 🧬
