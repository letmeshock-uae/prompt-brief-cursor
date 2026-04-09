import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
}

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 px-6 md:px-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="font-heading text-h1 text-foreground">Политика конфиденциальности</h1>
        <p className="mt-2 text-label text-muted">Последнее обновление: апрель 2025</p>

        <div className="mt-10 space-y-8 text-body text-muted">
          <div>
            <h2 className="font-heading text-h3 text-foreground mb-3">1. Общие положения</h2>
            <p>
              Настоящая политика конфиденциальности описывает, каким образом FL Bureau обрабатывает персональные данные пользователей сайта fl-bureau.com.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-h3 text-foreground mb-3">2. Собираемые данные</h2>
            <p>
              Мы собираем только те данные, которые вы добровольно предоставляете через форму обратной связи: имя, email, телефон и содержание сообщения.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-h3 text-foreground mb-3">3. Использование данных</h2>
            <p>
              Предоставленные данные используются исключительно для ответа на ваш запрос. Мы не передаём данные третьим лицам и не используем их в маркетинговых целях без вашего согласия.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-h3 text-foreground mb-3">4. Cookies</h2>
            <p>
              Сайт использует технические cookies, необходимые для корректной работы. Аналитические cookies не подключены.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-h3 text-foreground mb-3">5. Контакты</h2>
            <p>
              По вопросам обработки персональных данных:{' '}
              <a href="mailto:hello@fl-bureau.com" className="text-accent hover:underline">
                hello@fl-bureau.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
