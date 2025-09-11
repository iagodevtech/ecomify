# Ecomify Mobile App

Aplicativo mobile do Ecomify - Ecommerce Futurístico para produtos digitais e tecnologia.

## 🚀 Funcionalidades

- ✅ Design futurístico com tema cyberpunk
- ✅ Sistema de autenticação completo
- ✅ Carrinho de compras sincronizado
- ✅ Navegação intuitiva com tabs e drawer
- ✅ Tema personalizável (light/dark/cyber)
- ✅ Integração com Supabase
- ✅ React Query para gerenciamento de estado
- ✅ Notificações push (em desenvolvimento)
- ✅ Biometria (em desenvolvimento)

## 🛠️ Tecnologias

- **Framework**: React Native com Expo
- **Navegação**: React Navigation 6
- **Estado**: React Query, Context API
- **Backend**: Supabase
- **UI**: React Native + Expo Vector Icons
- **Animações**: React Native Reanimated
- **Armazenamento**: AsyncStorage

## 📦 Instalação

1. Navegue para o diretório mobile:
```bash
cd mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na pasta mobile
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Execute o projeto:
```bash
npm start
```

5. Use o Expo Go no seu celular para testar

## 📱 Estrutura do Projeto

```
mobile/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── navigation/          # Configuração de navegação
│   ├── providers/           # Context providers
│   ├── screens/             # Telas da aplicação
│   ├── lib/                 # Configurações e utilitários
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Funções utilitárias
├── App.tsx                  # Componente principal
├── app.json                 # Configuração do Expo
└── package.json             # Dependências
```

## 🎨 Design System

- **Cores**: Neon blue, purple, green, pink
- **Tipografia**: System fonts
- **Efeitos**: Gradientes, sombras, bordas arredondadas
- **Animações**: Transições suaves, gestos

## 🔐 Autenticação

- Email/senha
- Google OAuth
- Facebook OAuth
- Apple OAuth
- Recuperação de senha

## 🛒 E-commerce

- Catálogo de produtos
- Carrinho persistente
- Favoritos
- Histórico de pedidos
- Alertas de preço
- Notificações push

## 📊 Navegação

- **Bottom Tabs**: Home, Buscar, Carrinho, Perfil
- **Drawer**: Dashboard, Alertas, Favoritos, Pedidos, Configurações
- **Stack**: Detalhes de produto, Categoria

## 🔄 Sincronização

- Carrinho sincronizado entre web e mobile
- Dados do usuário em tempo real
- Notificações push para alertas de preço

## 📈 Próximos Passos

- [ ] Implementar notificações push
- [ ] Adicionar biometria para login
- [ ] Implementar realidade aumentada
- [ ] Adicionar modo offline
- [ ] Implementar geolocalização
- [ ] Adicionar chat de suporte

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../../LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Iago DevTech**
- GitHub: [@iagodevtech](https://github.com/iagodevtech)
- LinkedIn: [Iago DevTech](https://linkedin.com/in/iagodevtech)
