@echo off
chcp 65001 >nul

REM 🚀 Ecomify Setup Script (Windows)
REM Script para configurar o ambiente de desenvolvimento do Ecomify

echo 🎉 Bem-vindo ao Ecomify Setup!
echo ================================

REM Verificar se o Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js 18+ primeiro.
    echo 📥 Download: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Instalar dependências do projeto principal
echo 📦 Instalando dependências do projeto principal...
call npm install

REM Verificar se o diretório mobile existe
if exist "mobile" (
    echo 📱 Configurando mobile app...
    cd mobile
    
    REM Instalar dependências do mobile
    call npm install
    
    REM Voltar para o diretório raiz
    cd ..
    
    echo ✅ Mobile app configurado
) else (
    echo ⚠️  Diretório mobile não encontrado
)

REM Criar arquivos de ambiente se não existirem
echo 🔧 Configurando arquivos de ambiente...

if not exist ".env.local" (
    echo 📝 Criando .env.local...
    copy env.example .env.local >nul
    echo ⚠️  IMPORTANTE: Configure suas chaves de API no arquivo .env.local
)

if exist "mobile" (
    if not exist "mobile\.env" (
        echo 📝 Criando mobile\.env...
        copy mobile\env.example mobile\.env >nul
        echo ⚠️  IMPORTANTE: Configure suas chaves de API no arquivo mobile\.env
    )
)

REM Verificar se o Git está configurado
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Git não está configurado. Configure com:
    echo    git config --global user.name "Seu Nome"
    echo    git config --global user.email "seu@email.com"
)

REM Verificar se o Expo CLI está instalado (para mobile)
if exist "mobile" (
    expo --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo 📱 Instalando Expo CLI...
        call npm install -g @expo/cli
    )
    
    eas --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo 📱 Instalando EAS CLI...
        call npm install -g @expo/eas-cli
    )
)

echo.
echo 🎉 Setup concluído com sucesso!
echo ================================
echo.
echo 📋 Próximos passos:
echo 1. Configure suas chaves de API nos arquivos .env.local e mobile\.env
echo 2. Execute 'npm run dev' para iniciar o servidor de desenvolvimento
echo 3. Execute 'cd mobile ^&^& npm start' para iniciar o mobile app
echo.
echo 📚 Documentação:
echo - Guia de Deploy: DEPLOYMENT_GUIDE.md
echo - Resumo do Projeto: PROJECT_SUMMARY.md
echo - Mobile App: mobile\README.md
echo.
echo 🚀 Ecomify está pronto para desenvolvimento!
echo.
pause
