'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Shield, 
  Users, 
  CreditCard, 
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Aceitação dos Termos',
      content: 'Ao acessar e utilizar a plataforma Ecomify, você concorda em cumprir e estar vinculado aos termos e condições estabelecidos neste documento. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.'
    },
    {
      id: 'services',
      title: '2. Descrição dos Serviços',
      content: 'A Ecomify é uma plataforma de e-commerce especializada em produtos de tecnologia, oferecendo uma ampla gama de produtos digitais, computadores, smartphones, acessórios e serviços relacionados. Nossos serviços incluem venda online, suporte técnico e entrega de produtos.'
    },
    {
      id: 'account',
      title: '3. Conta do Usuário',
      content: 'Para utilizar determinados serviços, você deve criar uma conta fornecendo informações precisas e atualizadas. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta. Você deve notificar-nos imediatamente sobre qualquer uso não autorizado.'
    },
    {
      id: 'orders',
      title: '4. Pedidos e Pagamentos',
      content: 'Todos os pedidos estão sujeitos à disponibilidade do produto e à nossa aceitação. Os preços podem ser alterados sem aviso prévio. Aceitamos pagamentos via PIX, cartão de crédito, débito e boleto bancário. O pagamento deve ser processado antes da confirmação do pedido.'
    },
    {
      id: 'shipping',
      title: '5. Entrega e Frete',
      content: 'Os prazos de entrega são estimativas e podem variar conforme a localização e disponibilidade do produto. Oferecemos diferentes modalidades de entrega com custos variados. O frete grátis está disponível para pedidos acima de valores específicos conforme nossa política.'
    },
    {
      id: 'returns',
      title: '6. Devoluções e Trocas',
      content: 'Você tem até 7 dias corridos para solicitar a devolução de produtos não perecíveis, desde que estejam em perfeitas condições. Produtos personalizados ou com defeito de fabricação têm prazos diferenciados. O custo do frete de devolução é por conta do cliente, exceto em casos de defeito.'
    },
    {
      id: 'warranty',
      title: '7. Garantia',
      content: 'Todos os produtos possuem garantia do fabricante conforme especificado. Oferecemos garantia estendida opcional para determinados produtos. A garantia cobre defeitos de fabricação e não inclui danos causados por uso inadequado, acidentes ou desgaste normal.'
    },
    {
      id: 'privacy',
      title: '8. Privacidade e Dados',
      content: 'Respeitamos sua privacidade e protegemos seus dados pessoais conforme nossa Política de Privacidade. Coletamos apenas informações necessárias para fornecer nossos serviços e melhorar sua experiência. Seus dados não são compartilhados com terceiros sem seu consentimento.'
    },
    {
      id: 'intellectual',
      title: '9. Propriedade Intelectual',
      content: 'Todo o conteúdo da plataforma, incluindo textos, imagens, logos, designs e software, é propriedade da Ecomify ou de seus licenciadores. Você não pode reproduzir, distribuir ou modificar qualquer conteúdo sem autorização expressa por escrito.'
    },
    {
      id: 'limitation',
      title: '10. Limitação de Responsabilidade',
      content: 'A Ecomify não se responsabiliza por danos indiretos, lucros cessantes ou danos consequenciais. Nossa responsabilidade está limitada ao valor do produto adquirido. Não nos responsabilizamos por atrasos na entrega causados por terceiros ou eventos de força maior.'
    },
    {
      id: 'modifications',
      title: '11. Modificações dos Termos',
      content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. É sua responsabilidade revisar periodicamente os termos. O uso continuado dos serviços constitui aceitação das modificações.'
    },
    {
      id: 'governing',
      title: '12. Lei Aplicável',
      content: 'Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes de São Paulo, SP. Em caso de conflito entre versões em diferentes idiomas, prevalecerá a versão em português.'
    }
  ]

  return (
    <AppLayout>
      <div className="min-h-screen bg-dark-900 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold font-cyber mb-4">
                  <span className="cyber-text bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    Termos de Uso
                  </span>
                </h1>
                <p className="text-cyber-400 text-xl leading-relaxed">
                  Conheça os termos e condições que regem o uso da nossa plataforma
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <AlertTriangle className="w-6 h-6 text-neon-yellow" />
                  <span className="text-neon-yellow font-bold">Última atualização: 15 de Janeiro de 2024</span>
                </div>
                <p className="text-cyber-300">
                  Estes termos de uso foram atualizados para refletir nossas práticas atuais e 
                  melhorar a experiência do usuário em nossa plataforma.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-800/50 backdrop-blur-sm border border-cyber-500/30 rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      {section.title}
                    </h2>
                    <p className="text-cyber-300 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-20 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Pontos Importantes</h2>
              <p className="text-cyber-400 text-lg max-w-2xl mx-auto">
                Resumo dos principais aspectos dos nossos termos de uso
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Segurança</h3>
                <p className="text-cyber-400">
                  Seus dados e pagamentos são protegidos com tecnologia de ponta
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Garantia</h3>
                <p className="text-cyber-400">
                  Todos os produtos possuem garantia do fabricante
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Suporte</h3>
                <p className="text-cyber-400">
                  Equipe especializada disponível para ajudar você
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-pink to-neon-yellow rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pagamento</h3>
                <p className="text-cyber-400">
                  Múltiplas formas de pagamento seguras e confiáveis
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Dúvidas sobre os Termos?</h2>
              <p className="text-cyber-300 text-lg mb-8 max-w-2xl mx-auto">
                Nossa equipe jurídica está disponível para esclarecer qualquer dúvida 
                sobre nossos termos de uso e políticas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button variant="outline" className="border-cyber-500/30 text-cyber-400 hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Fale Conosco
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
