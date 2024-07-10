'use client';

import { Container, Section } from '@v4company/ui-components';
import { useParams } from 'next/navigation';
import { LeadProvider } from './hooks';
import {
  AboutCompany,
  AboutStakeholder,
  BreadcrumbMyLeadsView,
  Description,
  Footer,
  HeaderMyLeadsView,
  Historic,
  InfoQualification,
  JustificationRefund,
  ProgressIndicator,
} from './components';

export default function MyLeads() {
  const { id } = useParams();
  return (
    <Container>
      <LeadProvider id={id as string}>
        <BreadcrumbMyLeadsView />
        <Section>
          <HeaderMyLeadsView />
          <ProgressIndicator />
          <div className="flex flex-col gap-6 lg:flex-row">
            <AboutCompany />
            <AboutStakeholder />
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <InfoQualification />
            <Description />
          </div>
          <hr />
          <JustificationRefund />
          <Historic />
          <Footer />
        </Section>
      </LeadProvider>
    </Container>
  );
}
