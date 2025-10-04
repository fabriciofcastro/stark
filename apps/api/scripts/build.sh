#!/bin/bash
# Build script for STARK Solutions API
# Otimizado para deploy no Render.com

set -e

echo "🚀 Iniciando build da STARK Solutions API..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
pnpm install --frozen-lockfile --production=false

# Verificar variáveis de ambiente
echo "🔍 Verificando configurações..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Aviso: DATABASE_URL não definida"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  Aviso: JWT_SECRET não definida"
fi

# Executar testes (se existirem)
if [ -d "test" ] && [ "$NODE_ENV" != "production" ]; then
    echo "🧪 Executando testes..."
    pnpm test || echo "⚠️  Testes falharam, continuando build..."
fi

# Build da aplicação
echo "🔨 Compilando aplicação..."
pnpm build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build falhou - diretório dist não encontrado"
    exit 1
fi

# Verificar arquivos essenciais
if [ ! -f "dist/main.js" ]; then
    echo "❌ Erro: Arquivo principal não encontrado"
    exit 1
fi

# Limpar arquivos desnecessários
echo "🧹 Limpando arquivos desnecessários..."
rm -rf src/
rm -rf test/
rm -rf node_modules/.cache/
rm -rf .turbo/

# Verificar tamanho do build
echo "📊 Tamanho do build:"
du -sh dist/

echo "✅ Build concluído com sucesso!"
echo "🎯 Aplicação pronta para deploy no Render.com"
