'use server';

import { Container, Section } from '@v4company/ui-components';
import { BreadcrumbDashboard, IframeDashboard } from './components';

export default async function Dashboard() {
  return (
    <Container>
      <BreadcrumbDashboard />
      <Section>
        <div className="flex flex-col gap-2">
          <h3>Dash Broker</h3>

          <p>
            <b>
              Aqui você pode maximizar suas vendas com insights precisos do seu
              Broker.
            </b>
            <br />
            Monitore seus investimentos, acompanhe a conversão de leads e
            otimize seus resultados com gráficos e análises detalhadas.
          </p>
        </div>
        <IframeDashboard />
      </Section>
    </Container>
  );
}
