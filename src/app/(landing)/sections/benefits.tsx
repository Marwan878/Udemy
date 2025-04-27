import { ImageSlider, Section, SectionHeading } from "@/components/general";
import {
  BENEFITS,
  BENEFITS_IMAGES_BASE_URL,
  BENEFITS_IMAGES_RAW_URLS,
} from "@/constants";

export default function Benefits() {
  return (
    <Section className="py-8">
      <SectionHeading primaryText="Learning focused on your goals" />
      <ImageSlider
        imagesBaseUrl={BENEFITS_IMAGES_BASE_URL}
        imagesRawUrls={BENEFITS_IMAGES_RAW_URLS}
        mode="fixed"
      />
    </Section>
  );
}
