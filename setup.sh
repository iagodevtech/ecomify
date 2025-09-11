#!/bin/bash

# 🚀 Ecomify Setup Script
# Script para configurar o ambiente de desenvolvimento do Ecomify

echo "🎉 Bem-vindo ao Ecomify Setup!"
echo "================================"

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro."
    echo "📥 Download: https://nodejs.org/"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Instalar dependências do projeto principal
echo "📦 Instalando dependências do projeto principal..."
npm install

# Verificar se o diretório mobile existe
if [ -d "mobile" ]; then
    echo "📱 Configurando mobile app..."
    cd mobile
    
    # Instalar dependências do mobile
    npm install
    
    # Voltar para o diretório raiz
    cd ..
    
    echo "✅ Mobile app configurado"
else
    echo "⚠️  Diretório mobile não encontrado"
fi

# Criar arquivos de ambiente se não existirem
echo "🔧 Configurando arquivos de ambiente..."

if [ ! -f ".env.local" ]; then
    echo "📝 Criando .env.local..."
    cp env.example .env.local
    echo "⚠️  IMPORTANTE: Configure suas chaves de API no arquivo .env.local"
fi

if [ -d "mobile" ] && [ ! -f "mobile/.env" ]; then
    echo "📝 Criando mobile/.env..."
    cp mobile/env.example mobile/.env
    echo "⚠️  IMPORTANTE: Configure suas chaves de API no arquivo mobile/.env"
fi

# Verificar se o Git está configurado
if ! git config user.name &> /dev/null; then
    echo "⚠️  Git não está configurado. Configure com:"
    echo "   git config --global user.name 'Seu Nome'"
    echo "   git config --global user.email 'seu@email.com'"
fi

# Verificar se o Expo CLI está instalado (para mobile)
if [ -d "mobile" ]; then
    if ! command -v expo &> /dev/null; then
        echo "📱 Instalando Expo CLI..."
        npm install -g @expo/cli
    fi
    
    if ! command -v eas &> /dev/null; then
        echo "📱 Instalando EAS CLI..."
        npm install -g @expo/eas-cli
    fi
fi

echo ""
echo "🎉 Setup concluído com sucesso!"
echo "================================"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure suas chaves de API nos arquivos .env.local e mobile/.env"
echo "2. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
echo "3. Execute 'cd mobile && npm start' para iniciar o mobile app"
echo ""
echo "📚 Documentação:"
echo "- Guia de Deploy: DEPLOYMENT_GUIDE.md"
echo "- Resumo do Projeto: PROJECT_SUMMARY.md"
echo "- Mobile App: mobile/README.md"
echo ""
echo "🚀 Ecomify está pronto para desenvolvimento!"
