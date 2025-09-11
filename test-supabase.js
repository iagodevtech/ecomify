// Arquivo de teste para verificar conexão com Supabase
// Execute com: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')

// Substitua pelas suas credenciais
const supabaseUrl = 'SUA_URL_DO_SUPABASE_AQUI'
const supabaseKey = 'SUA_CHAVE_ANONIMA_AQUI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...')
    
    // Teste 1: Verificar se consegue conectar
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message)
      return
    }
    
    console.log('✅ Conexão com Supabase funcionando!')
    console.log('📊 Dados recebidos:', data)
    
    // Teste 2: Verificar tabelas criadas
    const tables = ['categories', 'brands', 'products', 'profiles']
    
    for (const table of tables) {
      const { data: tableData, error: tableError } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (tableError) {
        console.log(`❌ Tabela ${table}: ${tableError.message}`)
      } else {
        console.log(`✅ Tabela ${table}: OK`)
      }
    }
    
  } catch (err) {
    console.error('❌ Erro geral:', err.message)
  }
}

testConnection()
