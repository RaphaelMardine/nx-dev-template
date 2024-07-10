'use client';

import { Container, Section } from '@v4company/ui-components';
import { useParams } from 'next/navigation';
import { RefundProvider } from './hooks';
import {
  Blur,
  BreadcrumbMyRefundsView,
  Footer,
  HeaderMyRefundsView,
  Historic,
  ProgressIndicator,
} from './components';

export default function MyLeads() {
  const { id } = useParams();
  return (
    <Container>
      <RefundProvider id={id as string}>
        <BreadcrumbMyRefundsView />
        <Section>
          <HeaderMyRefundsView />
          <ProgressIndicator />
          <Blur />
          <hr />
          <Historic />
          <Footer />
        </Section>
      </RefundProvider>
    </Container>
  );
}
