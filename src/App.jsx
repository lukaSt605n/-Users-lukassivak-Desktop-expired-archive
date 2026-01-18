import styled from '@emotion/styled';
import MosaicGrid from './components/MosaicGrid';
import { seriesSets } from './data/series';

const Nav = styled.nav`
  width: 94%;
  max-width: 1500px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  border-bottom: 1px solid rgba(20, 20, 20, 0.12);
  padding-bottom: 14px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  font-size: 12px;
  letter-spacing: 0.2em;
`;

const HeroWrapper = styled.div`
  width: 94%;
  max-width: 1500px;
  margin: 70px auto 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(20, 20, 20, 0.08);
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: 400;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 560px;
`;

const Section = styled.section`
  width: 94%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 60px 0 120px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 16px;
`;

const SectionText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 700px;
`;

const Footer = styled.footer`
  width: 94%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 0 80px;
  border-top: 1px solid rgba(20, 20, 20, 0.08);
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const FooterText = styled.div`
  color: ${({ theme }) => theme.colors.muted};
`;

function App() {
  const tileSizes = [
    { w: 4, h: 5 },
    { w: 3, h: 4 },
    { w: 5, h: 4 },
    { w: 2, h: 3 },
    { w: 3, h: 5 },
    { w: 4, h: 3 },
    { w: 3, h: 3 },
    { w: 4, h: 5 },
    { w: 2, h: 3 },
    { w: 3, h: 4 },
    { w: 5, h: 3 },
    { w: 3, h: 6 },
    { w: 4, h: 4 },
    { w: 2, h: 4 },
    { w: 3, h: 3 },
  ];

  const items = seriesSets.map((series, index) => ({
    images: series.images,
    ...tileSizes[index % tileSizes.length],
  }));

  return (
    <div id="home">
      <Nav>
        <div>ARCHIVE 35mm</div>
        <NavLinks>
          <a href="#home">Home</a>
          <a href="#archive-notes">Archive Notes</a>
          <a href="#fragments">Fragments</a>
          <a href="#contact">Contact</a>
        </NavLinks>
      </Nav>

      <HeroWrapper>
        <Title>Quiet frames from unreliable film stock.</Title>
        <Subtitle>Fragments of analog memories from unreliable materials.</Subtitle>
      </HeroWrapper>

      <MosaicGrid items={items} />

      <Section id="archive-notes">
        <SectionTitle>Archive Notes</SectionTitle>
        <SectionText>
          A living archive of 35mm film - expired, fresh, and occasionally unpredictable.
        </SectionText>
        <SectionText>
          I work intuitively, but with intention: light first, then structure, then restraint.
        </SectionText>
        <SectionText>
          Exposure is often judged in the moment, then refined through scanning and selection.
        </SectionText>
        <SectionText>Home-scanned.</SectionText>
        <SectionText>
          Imperfections are not “fixed” by default - only removed when they distract from the image.
        </SectionText>
      </Section>

      <Section id="fragments">
        <SectionTitle>Fragments</SectionTitle>
        <SectionText>Studies, experiments, and incomplete sets.</SectionText>
        <SectionText>
          Work that doesn’t belong in the main archive yet - but still matters.
        </SectionText>
      </Section>

      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
        <SectionText>For prints, collaborations, or archive-related inquiries.</SectionText>
        <SectionText>Email only - response time varies.</SectionText>
        <SectionText>sivaklukas@yahoo.com</SectionText>
      </Section>

      <Footer>
        <FooterText>Archive 35mm © 2025</FooterText>
        <FooterText>sivaklukas@yahoo.com</FooterText>
      </Footer>
    </div>
  );
}

export default App;
