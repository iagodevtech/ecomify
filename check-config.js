// Script para verificar configurações do projeto
// Execute com: node check-config.js

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO CONFIGURAÇÕES DO ECONIFY\n');

// Verificar se .env.local existe
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ Arquivo .env.local encontrado');
  
  // Ler e verificar variáveis
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  console.log(`📋 ${envVars.length} variáveis encontradas:`);
  
  envVars.forEach(line => {
    const [key] = line.split('=');
    if (key) {
      console.log(`   - ${key}`);
    }
  });
  
  // Verificar variáveis específicas
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
  ];
  
  console.log('\n🔧 Verificando variáveis obrigatórias:');
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`   ✅ ${varName}`);
    } else {
      console.log(`   ❌ ${varName} - FALTANDO`);
    }
  });
  
} else {
  console.log('❌ Arquivo .env.local NÃO encontrado');
  console.log('📝 Crie o arquivo .env.local com suas credenciais');
  console.log('📋 Use o arquivo env.local.example como modelo');
}

// Verificar se node_modules existe
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('\n✅ Dependências instaladas (node_modules)');
} else {
  console.log('\n❌ Dependências NÃO instaladas');
  console.log('📦 Execute: npm install');
}

// Verificar arquivos importantes
const importantFiles = [
  'src/lib/supabase.ts',
  'src/lib/stripe.ts',
  'supabase-schema.sql',
  'fix-rls-policies-corrected.sql',
  'insert-sample-data-fixed.sql'
];

console.log('\n📁 Verificando arquivos importantes:');
importantFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - FALTANDO`);
  }
});

// Verificar se o servidor pode ser iniciado
console.log('\n🚀 PRÓXIMOS PASSOS:');
console.log('1. Configure o arquivo .env.local com suas credenciais');
console.log('2. Execute: npm run dev');
console.log('3. Acesse: http://localhost:3000');
console.log('4. Teste o chat online (canto inferior direito)');
console.log('5. Navegue pelas páginas criadas');

console.log('\n📚 Documentação:');
console.log('- PROXIMOS_PASSOS.md - Guia completo');
console.log('- GUIA_CORRECAO_SUPABASE.md - Configuração Supabase');
console.log('- DEPLOYMENT_GUIDE.md - Deploy em produção');

console.log('\n🎯 Status: Pronto para desenvolvimento!');
